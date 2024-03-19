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
import fs from "fs";
import fsp from "fsp";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { getDatasFromDS } from "src/lib/fetching/ds";
import generateZip from "src/lib/generateZip";
import { strNoAccent } from "src/lib/helpers";
import { getDocDS } from "src/lib/queries";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

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
  } else if (req.method == "GET") {
    await downloadZip(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const downloadZip: NextApiHandler = async (req, res) => {
  const zipname = req.query.zipname;
  console.log("zipname : ", zipname);

  const filePath = `/mnt/docs/${zipname}.zip`;
  const stat = await fsp.stat(filePath);

  res.writeHead(200, {
    "Content-Length": stat.size,
    "Content-Name": "test.zip",
    "Content-Type": "application/zip",
  });

  const downloadStream = fs.createReadStream(filePath, {});

  await new Promise(function (resolve) {
    downloadStream.pipe(res);
    downloadStream.on("end", resolve);
  });
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
  for (const [index, champ] of filteredChamps.entries()) {
    const doc =
      champ.file !== null ? await getDocDS(champ.file.url as string) : null;
    const file = {
      doc: doc,
      file: champ.file,
      index: index,
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
  console.log("Create Zip for commission ", parsed.id);

  for (const [index, dossier] of parsed.dossiers.entries()) {
    console.log("dossier : ", dossier.nom);
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
      if (parsed.dossiers[index].enfants[indexEnfant])
        parsed.dossiers[index].enfants[indexEnfant].files = docsEnfants.slice(
          i * 6,
          i * 6 + 6
        );
    }
  }

  const createZip = generateZip(parsed as CommissionData);
  res.send(createZip);
};

export default withSentry(handler);
