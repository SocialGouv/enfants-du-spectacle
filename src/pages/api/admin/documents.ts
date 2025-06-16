// Ce fichier proxy est déprécié. Les appels se font désormais directement vers l'API du formulaire.
// Voir src/pages/admin/documents.tsx pour la nouvelle implémentation.

import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  return res.status(410).json({ 
    error: "Cette API proxy est déprécié. Utilisez directement l'API du formulaire." 
  });
};

export default handler;
