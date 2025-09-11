import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';

// Cache temporaire pour associer email -> nonce (en production, utiliser Redis)
const emailNonceStore = new Map<string, string>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Générer un nonce unique
    const nonce = randomUUID();
    
    // Stocker temporairement le nonce avec l'email
    emailNonceStore.set(email, nonce);
    
    // Nettoyer après 1 heure
    setTimeout(() => {
      emailNonceStore.delete(email);
    }, 60 * 60 * 1000);
    
    // Créer le cookie sécurisé avec le nonce (expires dans 1 heure)
    const oneHour = 60 * 60; // 1 heure en secondes
    
    res.setHeader('Set-Cookie', [
      `auth-nonce=${nonce}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Strict; Max-Age=${oneHour}; Path=/`
    ]);

    // Retourner le nonce pour que le frontend puisse déclencher NextAuth
    res.status(200).json({ nonce, success: true });
  } catch (error) {
    console.error('Erreur dans prepare-login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export { emailNonceStore };
