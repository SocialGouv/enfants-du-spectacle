import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
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

    const timestamp = new Date().toISOString();
    const logMessage = `[SCHEDULER] ${timestamp} - Archived ${totalArchivedDossiers} dossiers from ${totalArchivedCommissions} commissions`;
    
    console.log(logMessage);

    // Retourner le résumé
    res.status(200).json({
      success: true,
      archivedCommissions: totalArchivedCommissions,
      archivedDossiers: totalArchivedDossiers,
      timestamp,
      cutoffDate: twoYearsAgo.toISOString()
    });

  } catch (error) {
    console.error(`[SCHEDULER] ${new Date().toISOString()} - Error during archival process:`, error);
    
    res.status(500).json({
      success: false,
      error: "Internal server error during archival process",
      timestamp: new Date().toISOString()
    });
  }
};

export default withSentry(handler);
