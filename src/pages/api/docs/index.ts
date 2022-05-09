import type {
  Commentaire,
  Commission,
  Demandeur,
  Dossier,
  Enfant,
  PieceDossier,
  SocieteProduction,
  User,
} from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import generateZip from "src/lib/generateZip";
import { strNoAccent } from "src/lib/helpers";
import { getDatasFromDS, getDocDS } from "src/lib/queries";

type DossierData = Dossier & {
  user: User | null;
  commission: Commission;
  societeProduction: SocieteProduction;
  enfants: Enfant[];
  piecesDossier: PieceDossier[];
  commentaires: Commentaire[];
  demandeur: Demandeur;
  _count?: {
    enfants: number;
  } | null;
};

type CommissionData = Commission & { dossiers: DossierData[] };

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "POST") {
    await uploadDoc(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getDocsDossier = async (champs: unknown, enfant: boolean) => {
  const files: unknown[] = [];
  const filteredChamps = _.filter(champs, (champ: unknown) => {
    if (enfant) {
      return (champ.file as unknown) || champ.file === null;
    } else {
      return champ.file !== undefined && champ.file !== null;
    }
  });
  for (const champ of filteredChamps) {
    const doc =
      champ.file !== null ? await getDocDS(champ.file.url as string) : null;
    const file = {
      doc: doc,
      file: champ.file,
      label: champ.label,
    };
    files.push(file);
  }
  return files;
};

const uploadDoc: NextApiHandler = async (req, res) => {
  const parsed = JSON.parse(req.body as string);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  for (const [index, dossier] of parsed.dossiers.entries()) {
    const tmpLinks = await getDatasFromDS((dossier.number as number) || 0);

    parsed.dossiers[index].files = await getDocsDossier(
      tmpLinks.data.dossier.champs,
      false
    );

    const champEnfant = _.get(
      _.find(tmpLinks.data.dossier.champs, { label: "Enfant" }),
      "champs"
    );
    const nbreEnfants = _.filter(
      champEnfant,
      (datab: Record<string, unknown>) => {
        return datab.label === "Nom";
      }
    ).length;

    const docsEnfants = await getDocsDossier(champEnfant, true);

    for (let i = 0; i < nbreEnfants; i++) {
      const name = _.get(
        _.filter(champEnfant, (datab: Record<string, unknown>) => {
          return datab.label === "Nom";
        })[i],
        "stringValue"
      ) as string;
      const firstname = _.get(
        _.filter(champEnfant, (datab: Record<string, unknown>) => {
          return datab.label === "Prénom(s)";
        })[i],
        "stringValue"
      ) as string;
      const indexEnfant = parsed.dossiers[index].enfants.findIndex((enfant) => {
        return (
          enfant.nom === strNoAccent(name) &&
          enfant.prenom === strNoAccent(firstname)
        );
      });
      parsed.dossiers[index].enfants[indexEnfant].files = docsEnfants.slice(
        i,
        i + 6
      );
    }
  }

  const zip = await generateZip(parsed as CommissionData);
  res.send(zip);
};

export default withSentry(handler);
