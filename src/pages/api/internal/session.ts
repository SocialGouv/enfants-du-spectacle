import type { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const prisma = new PrismaClient();

  try {
    const { sessionToken } = req.body;
    
    if (!sessionToken) {
      res.status(400).json({ error: 'Session token required' });
      return;
    }

    // Récupérer la session depuis la base de données
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: true
      }
    });
    
    if (!session || !session.user || session.expires < new Date()) {
      res.status(404).json({ error: 'Session not found or expired' });
      return;
    }
    
    res.status(200).json({
      user: {
        userId: session.user.id,
        email: session.user.email || undefined,
        role: session.user.role || undefined
      }
    });
  } catch (error) {
    console.error('[SESSION API] Erreur lors de la récupération de la session:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
