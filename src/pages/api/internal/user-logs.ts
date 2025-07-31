import type { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const prisma = new PrismaClient();

  try {
    const logData = req.body;
    
    // Valider les données requises
    if (!logData.userId || !logData.method || !logData.path || !logData.accessType) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Créer le log en base de données
    const userLog = await prisma.userLogs.create({
      data: {
        userId: logData.userId,
        userEmail: logData.userEmail || null,
        userRole: logData.userRole || null,
        method: logData.method,
        path: logData.path,
        query: logData.query || null,
        userAgent: logData.userAgent || null,
        ipAddress: logData.ipAddress || null,
        accessType: logData.accessType,
        resourceId: logData.resourceId || null,
        modifications: logData.modifications || null,
      }
    });

    res.status(200).json({ success: true, id: userLog.id });
  } catch (error) {
    console.error('[USER-LOGS API] Erreur lors de la création du log:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
