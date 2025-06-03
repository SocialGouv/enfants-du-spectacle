import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import client from "src/lib/prismaClient";

// Type pour les sections PDF
type SectionPdf = "TEXTES_LEGAUX" | "CONSIDERANTS" | "ARTICLE_2" | "ARTICLE_3" | "ARTICLE_4" | "SIGNATURE" | "RECOURS";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (!session || session.dbUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Accès non autorisé" });
    }

    if (req.method === "GET") {
      const { departement } = req.query;

      if (!departement || typeof departement !== "string") {
        return res.status(400).json({ error: "Département requis" });
      }

      const contenus = await (client as any).contenuPdf.findMany({
        where: { departement },
        include: {
          utilisateurModifier: {
            select: {
              prenom: true,
              nom: true,
              email: true,
            },
          },
        },
        orderBy: { section: "asc" },
      });

      return res.status(200).json(contenus);
    }

    if (req.method === "POST") {
      const { departement, section, titre, contenu } = req.body;

      if (!departement || !section || !titre || !contenu) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const contenuPdf = await (client as any).contenuPdf.upsert({
        where: {
          departement_section: {
            departement,
            section: section as SectionPdf,
          },
        },
        update: {
          titre,
          contenu,
          utilisateurModifierId: session.dbUser.id,
        },
        create: {
          departement,
          section: section as SectionPdf,
          titre,
          contenu,
          utilisateurModifierId: session.dbUser.id,
        },
        include: {
          utilisateurModifier: {
            select: {
              prenom: true,
              nom: true,
              email: true,
            },
          },
        },
      });

      return res.status(200).json(contenuPdf);
    }

    return res.status(405).json({ error: "Méthode non autorisée" });
  } catch (error) {
    console.error("Erreur API contenus-pdf:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
