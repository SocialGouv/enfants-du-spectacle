import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import client from "src/lib/prismaClient";

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

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const timestamp = new Date().toISOString();
  console.log(`[SCHEDULER] ${timestamp} - Starting scheduler tasks`);

  let archiveResults: ArchiveResults | null = null;
  let notificationResults: NotificationResults | null = null;
  let archiveError: string | null = null;
  let notificationError: string | null = null;

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

  // 3. Retourner le résumé global
  const hasErrors = archiveError || notificationError;
  
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

export default withSentry(handler);
