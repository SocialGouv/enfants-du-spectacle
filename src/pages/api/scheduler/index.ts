import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import client from "src/lib/prismaClient";
import { frenchDateText } from "src/lib/helpers";

// Interface pour les résultats d'archivage
interface ArchiveResults {
  archivedCommissions: number;
  archivedDossiers: number;
  cutoffDate: string;
}

// Interface pour les résultats de notification
interface NotificationResults {
  notifiedDossiers: number;
  totalNotifications: number;
}

// Interface pour les résultats de détection de conflits
interface ConflictResults {
  newConflictsDetected: number;
  conflictsResolved: number;
  emailsSent: number;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const timestamp = new Date().toISOString();
  console.log(`[SCHEDULER] ${timestamp} - Starting scheduler tasks`);

  let archiveResults: ArchiveResults | null = null;
  let notificationResults: NotificationResults | null = null;
  let conflictResults: ConflictResults | null = null;
  let archiveError: string | null = null;
  let notificationError: string | null = null;
  let conflictError: string | null = null;

  // 1. Processus d'archivage
  try {
    archiveResults = await archiveOldCommissions();
  } catch (error) {
    archiveError = `Error during archival process: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(`[SCHEDULER] ${timestamp} - ${archiveError}`, error);
  }

  // 2. Processus de notification des commentaires
  try {
    notificationResults = await notifyUnseenComments();
  } catch (error) {
    notificationError = `Error during comment notification process: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(`[SCHEDULER] ${timestamp} - ${notificationError}`, error);
  }

  // 3. Processus de détection des conflits de dates
  try {
    conflictResults = await detectDateConflicts();
  } catch (error) {
    conflictError = `Error during date conflicts detection process: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(`[SCHEDULER] ${timestamp} - ${conflictError}`, error);
  }

  // 4. Retourner le résumé global
  const hasErrors = archiveError || notificationError || conflictError;
  
  res.status(hasErrors ? 207 : 200).json({
    success: !hasErrors,
    timestamp,
    archive: archiveResults ? {
      success: true,
      ...archiveResults
    } : {
      success: false,
      error: archiveError
    },
    notifications: notificationResults ? {
      success: true,
      ...notificationResults
    } : {
      success: false,
      error: notificationError
    },
    conflicts: conflictResults ? {
      success: true,
      ...conflictResults
    } : {
      success: false,
      error: conflictError
    }
  });
};

/**
 * Archive les commissions et dossiers de plus de 2 ans
 */
async function archiveOldCommissions(): Promise<ArchiveResults> {
  // Calculer la date d'il y a 2 ans
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  console.log(`[SCHEDULER] ${new Date().toISOString()} - Starting archival process for commissions older than ${twoYearsAgo.toISOString()}`);

  // Trouver toutes les commissions dont la date est antérieure à il y a 2 ans
  // et qui ne sont pas déjà archivées (NOT true = null ou false)
  const commissionsToArchive = await client.commission.findMany({
    where: {
      date: { lt: twoYearsAgo },
      NOT: { archived: true }
    },
    include: {
      dossiers: {
        where: {
          NOT: { archived: true }
        }
      }
    }
  });

  let totalArchivedDossiers = 0;
  let totalArchivedCommissions = 0;

  // Traiter chaque commission
  for (const commission of commissionsToArchive) {
    // Archiver tous les dossiers non archivés de cette commission
    if (commission.dossiers.length > 0) {
      const dossierIds = commission.dossiers.map((d: any) => d.id);
      
      await client.dossier.updateMany({
        where: {
          id: { in: dossierIds }
        },
        data: {
          archived: true
        }
      });

      totalArchivedDossiers += commission.dossiers.length;
      
      console.log(`[SCHEDULER] Archived ${commission.dossiers.length} dossiers from commission ${commission.id} (${commission.departement}, ${commission.date.toISOString()})`);
    }

    // Archiver la commission
    await client.commission.update({
      where: { id: commission.id },
      data: { archived: true }
    });

    totalArchivedCommissions++;
  }

  const logMessage = `[SCHEDULER] ${new Date().toISOString()} - Archived ${totalArchivedDossiers} dossiers from ${totalArchivedCommissions} commissions`;
  console.log(logMessage);

  return {
    archivedCommissions: totalArchivedCommissions,
    archivedDossiers: totalArchivedDossiers,
    cutoffDate: twoYearsAgo.toISOString()
  };
}

/**
 * Notifie les utilisateurs des nouveaux commentaires non vus
 */
async function notifyUnseenComments(): Promise<NotificationResults> {
  console.log(`[SCHEDULER] ${new Date().toISOString()} - Starting comment notification process`);

  // Calculer le début et la fin de la journée courante
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // 1. Récupérer tous les commentaires non vus, avec source INSTRUCTEUR et postés aujourd'hui
  const unseenComments = await client.comments.findMany({
    where: {
      AND: [
        {
          OR: [
            { seen: null },
            { seen: false }
          ]
        },
        { source: 'INSTRUCTEUR' },
        {
          date: {
            gte: startOfToday,
            lte: endOfToday
          }
        }
      ]
    },
    include: {
      dossier: {
        select: {
          id: true,
          nom: true,
          creatorId: true,
          collaboratorIds: true
        }
      }
    }
  });

  if (unseenComments.length === 0) {
    console.log(`[SCHEDULER] ${new Date().toISOString()} - No unseen comments found`);
    return {
      notifiedDossiers: 0,
      totalNotifications: 0
    };
  }

  console.log(`[SCHEDULER] ${new Date().toISOString()} - Found ${unseenComments.length} unseen comments`);

  // 2. Grouper les commentaires par dossier
  const commentsByDossier = _.groupBy(unseenComments, 'dossierId');

  let notifiedDossiers = 0;
  let totalNotifications = 0;

  // 3. Traiter chaque dossier
  for (const [dossierId, comments] of Object.entries(commentsByDossier)) {
    try {
      const dossier = comments[0].dossier;
      const commentCount = comments.length;

      // 4. Récupérer les utilisateurs à notifier
      const userIdsToNotify = new Set<number>();
      
      // Ajouter le créateur du dossier
      if (dossier.creatorId) {
        userIdsToNotify.add(dossier.creatorId);
      }
      
      // Ajouter les collaborateurs
      if (dossier.collaboratorIds && dossier.collaboratorIds.length > 0) {
        dossier.collaboratorIds.forEach((id: number) => userIdsToNotify.add(id));
      }

      if (userIdsToNotify.size === 0) {
        console.log(`[SCHEDULER] No users to notify for dossier ${dossierId}`);
        continue;
      }

      // 5. Récupérer les emails des utilisateurs
      const users = await client.user.findMany({
        where: {
          id: { in: Array.from(userIdsToNotify) }
        },
        select: {
          id: true,
          email: true
        }
      });

      const validEmails = users.filter(user => user.email).map(user => user.email!);

      if (validEmails.length === 0) {
        console.log(`[SCHEDULER] No valid emails found for dossier ${dossierId}`);
        continue;
      }

      // 6. Envoyer les notifications
      for (const email of validEmails) {
        try {
          const mailPayload = {
            type: 'new_comments_notification',
            dossier: {
              id: dossier.id,
              nom: dossier.nom
            },
            to: email,
            extraData: {
              commentCount: commentCount
            }
          };

          console.log(`[SCHEDULER] Attempting to send mail to ${email} with payload:`, JSON.stringify(mailPayload));
          console.log(`[SCHEDULER] Using URL: ${process.env.NEXTAUTH_URL}/api/mail/scheduler`);

          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/mail/scheduler`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailPayload)
          });

          const responseText = await response.text();
          console.log(`[SCHEDULER] Mail API response status: ${response.status}, body: ${responseText}`);

          if (response.ok) {
            totalNotifications++;
            console.log(`[SCHEDULER] ✅ Notification sent successfully to ${email} for dossier ${dossier.nom} (${commentCount} comments)`);
          } else {
            console.error(`[SCHEDULER] ❌ Failed to send notification to ${email} for dossier ${dossierId}: ${response.status} - ${responseText}`);
          }
        } catch (emailError) {
          console.error(`[SCHEDULER] ❌ Error sending email to ${email}:`, emailError);
        }
      }
      notifiedDossiers++;

      console.log(`[SCHEDULER] Processed dossier ${dossier.nom}: ${commentCount} comments, ${validEmails.length} notifications sent`);

    } catch (dossierError) {
      console.error(`[SCHEDULER] Error processing dossier ${dossierId}:`, dossierError);
    }
  }

  const logMessage = `[SCHEDULER] ${new Date().toISOString()} - Comment notifications: ${notifiedDossiers} dossiers, ${totalNotifications} emails sent`;
  console.log(logMessage);

  return {
    notifiedDossiers,
    totalNotifications
  };
}

/**
 * Détecte et gère les conflits de dates pour les enfants
 */
async function detectDateConflicts(): Promise<ConflictResults> {
  console.log(`[SCHEDULER] ${new Date().toISOString()} - Starting date conflicts detection process`);

  let newConflictsDetected = 0;
  let conflictsResolved = 0;
  let emailsSent = 0;

  // 1. Nettoyer d'abord les conflits existants qui pourraient être résolus
  const existingConflicts = await client.enfant.findMany({
    where: {
      hasDateConflict: true
    },
    include: {
      dossier: {
        include: {
          commission: true,
          creator: {
            select: {
              id: true,
              email: true
            }
          }
        }
      }
    }
  });

  console.log(`[SCHEDULER] Found ${existingConflicts.length} existing conflicts to verify`);

  // Vérifier si les conflits existants sont toujours valides
  for (const enfant of existingConflicts) {
    if (!enfant.nameId || !enfant.dossier.commission || !enfant.dossier.dateDebut || !enfant.dossier.dateFin) {
      continue;
    }

    const now = new Date();
    if (enfant.dossier.commission.date <= now || enfant.dossier.commission.archived) {
      // Commission passée ou archivée, plus de conflit
      await client.enfant.update({
        where: { id: enfant.id },
        data: {
          hasDateConflict: false,
          dateConflictDetectedAt: null
        }
      });
      conflictsResolved++;
      continue;
    }

    // Vérifier s'il y a encore un conflit réel
    const otherEnfants = await client.enfant.findMany({
      where: {
        nameId: enfant.nameId,
        id: { not: enfant.id },
        dossier: {
          commission: {
            date: { gt: now },
            NOT: { archived: true }
          },
          dateDebut: { not: null },
          dateFin: { not: null }
        }
      },
      include: {
        dossier: true
      }
    });

    let stillInConflict = false;
    for (const otherEnfant of otherEnfants) {
      if (datesOverlap(
        enfant.dossier.dateDebut!,
        enfant.dossier.dateFin!,
        otherEnfant.dossier.dateDebut!,
        otherEnfant.dossier.dateFin!
      )) {
        stillInConflict = true;
        break;
      }
    }

    if (!stillInConflict) {
      await client.enfant.update({
        where: { id: enfant.id },
        data: {
          hasDateConflict: false,
          dateConflictDetectedAt: null
        }
      });
      conflictsResolved++;
    }
  }

  // 2. Récupérer toutes les commissions futures avec leurs dossiers et enfants
  const futureCommissions = await client.commission.findMany({
    where: {
      date: { gt: new Date() },
      NOT: { archived: true }
    },
    include: {
      dossiers: {
        where: {
          dateDebut: { not: null },
          dateFin: { not: null },
          NOT: { archived: true }
        },
        include: {
          enfants: {
            where: {
              nameId: { not: null }
            }
          },
          creator: {
            select: {
              id: true,
              email: true
            }
          }
        }
      }
    }
  });

  // 3. Récupérer tous les enfants des commissions futures
  const allEnfants: any[] = [];
  for (const commission of futureCommissions) {
    for (const dossier of commission.dossiers) {
      for (const enfant of dossier.enfants) {
        allEnfants.push({
          ...enfant,
          dossier: dossier,
          commission: commission
        });
      }
    }
  }

  console.log(`[SCHEDULER] Found ${allEnfants.length} children in future commissions`);

  // 4. Grouper par nameId
  const enfantsByNameId = _.groupBy(allEnfants, 'nameId');

  // 5. Détecter les conflits
  for (const [nameId, enfants] of Object.entries(enfantsByNameId)) {
    if (!nameId || enfants.length < 2) continue;

    // Comparer chaque paire d'enfants avec le même nameId
    for (let i = 0; i < enfants.length; i++) {
      for (let j = i + 1; j < enfants.length; j++) {
        const enfant1 = enfants[i];
        const enfant2 = enfants[j];

        // Si même dossier, pas de conflit
        if (enfant1.dossierId === enfant2.dossierId) continue;

        // Vérifier si les dates se chevauchent
        if (datesOverlap(
          enfant1.dossier.dateDebut,
          enfant1.dossier.dateFin,
          enfant2.dossier.dateDebut,
          enfant2.dossier.dateFin
        )) {
          console.log(`[SCHEDULER] Conflict detected for child ${nameId} between dossiers ${enfant1.dossier.nom} and ${enfant2.dossier.nom}`);

          // Traiter les deux enfants en conflit
          for (const enfant of [enfant1, enfant2]) {
            // Vérifier si ce conflit n'est pas déjà marqué
            if (!enfant.hasDateConflict) {
              await client.enfant.update({
                where: { id: enfant.id },
                data: {
                  hasDateConflict: true,
                  dateConflictDetectedAt: new Date()
                }
              });

              newConflictsDetected++;

              // Envoyer email au créateur du dossier
              if (enfant.dossier.creator?.email) {
                try {
                  const otherEnfant = enfant === enfant1 ? enfant2 : enfant1;
                  const conflictStart = new Date(Math.max(
                    enfant.dossier.dateDebut.getTime(),
                    otherEnfant.dossier.dateDebut.getTime()
                  ));
                  const conflictEnd = new Date(Math.min(
                    enfant.dossier.dateFin.getTime(),
                    otherEnfant.dossier.dateFin.getTime()
                  ));

                  const mailPayload = {
                    type: 'date_conflict_alert',
                    dossier: {
                      id: enfant.dossier.id,
                      nom: enfant.dossier.nom
                    },
                    to: enfant.dossier.creator.email,
                    extraData: {
                      enfantName: `${enfant.prenom || ''} ${enfant.nom || ''}`.trim(),
                      enfantBirth: enfant.dateNaissance ? frenchDateText(enfant.dateNaissance) : '',
                      otherDossierName: otherEnfant.dossier.nom,
                      conflictStart: frenchDateText(conflictStart),
                      conflictEnd: frenchDateText(conflictEnd)
                    }
                  };

                  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/mail/scheduler`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mailPayload)
                  });

                  if (response.ok) {
                    emailsSent++;
                    console.log(`[SCHEDULER] ✅ Conflict alert sent to ${enfant.dossier.creator.email} for child ${nameId}`);
                  } else {
                    console.error(`[SCHEDULER] ❌ Failed to send conflict alert for child ${nameId}: ${response.status}`);
                  }
                } catch (emailError) {
                  console.error(`[SCHEDULER] ❌ Error sending conflict alert for child ${nameId}:`, emailError);
                }
              }
            }
          }
        }
      }
    }
  }

  const logMessage = `[SCHEDULER] ${new Date().toISOString()} - Date conflicts: ${newConflictsDetected} new conflicts, ${conflictsResolved} resolved, ${emailsSent} emails sent`;
  console.log(logMessage);

  return {
    newConflictsDetected,
    conflictsResolved,
    emailsSent
  };
}

/**
 * Vérifie si deux périodes de dates se chevauchent
 */
function datesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 <= end2 && start2 <= end1;
}

export default withSentry(handler);
