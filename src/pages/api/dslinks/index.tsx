import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  PieceDossier,
  PieceDossierEnfant,
} from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { JUSTIFS_DOSSIER } from "src/lib/helpers";
import prisma from "src/lib/prismaClient";
import {
  createPieceDossier,
  deletePieceDossier,
  searchDossierByExternalId,
  updatePieceDossierEnfant,
} from "src/lib/queries";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const dossierExternalId = req.query.externalid;
  const fetching = await getDatasFromDS(dossierExternalId as string);
  if (_.get(fetching, "errors")) {
    res.status(500).json(superjson.stringify(_.get(fetching, "errors")));
  } else {
    const insert = await insertDataFromDs(_.get(fetching, "data"));
    res.status(insert.error ? 500 : 200).json(superjson.stringify(insert));
  }
};

const insertDataFromDs = async (data: unknown) => {
  const dossier = data.dossier;
  try {
    // Build array justifications (dossier)
    const arrayJustifs: JustificatifDossier[] = [];
    _.forEach(JUSTIFS_DOSSIER, (justif: { label: string; value: string }) => {
      if (
        _.get(
          _.find(dossier.champs, {
            label: justif.label,
          }),
          "file"
        ) != null
      ) {
        arrayJustifs.push(justif.value as JustificatifDossier);
      }
    });

    const intDossier = (await searchDossierByExternalId(
      prisma,
      dossier.id as number
    )) as (Dossier & {
      enfants: (Enfant & { piecesDossier: PieceDossierEnfant[] })[];
    })[];

    // add pieces dossier (delete old pieces if needed)
    if (intDossier.length > 0) {
      await deletePieceDossier(prisma, intDossier[0].id);
    }
    _.forEach(arrayJustifs, async (piece: JustificatifDossier) => {
      const createdPiece: Omit<PieceDossier, "id"> = {
        dossierId: intDossier[0].id,
        link: _.get(
          _.find(dossier.champs, (datab: Record<string, unknown>) => {
            return (
              datab.label ===
              _.get(_.find(JUSTIFS_DOSSIER, { value: piece }), "label")
            );
          }),
          "file"
        ).url,
        type: piece,
      };
      await createPieceDossier(prisma, createdPiece);
    });

    // get enfants
    const champEnfant = _.get(
      _.find(dossier.champs, { label: "Enfant" }),
      "champs"
    );

    for (const enfant of intDossier[0].enfants) {
      _.forEach(enfant.piecesDossier, async (pieceDossier: unknown) => {
        pieceDossier.link = _.find(
          champEnfant,
          (champ: Record<string, Record<string, unknown> | null>) => {
            return champ.file?.checksum === pieceDossier.externalId;
          }
        ).file.url;
        await updatePieceDossierEnfant(prisma, pieceDossier);
      });
    }
  } catch (e: unknown) {
    return { error: e };
  }
  return { message: "success" };
};

const getDatasFromDS = async (dossierExternalId: string) => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const dossierId = parseInt(dossierExternalId);
  const query = `query getDossier(
    $dossierId: Int!
  ) {
    dossier(number: $dossierId) {
      id
      number
      archived
      state
      dateDerniereModification
      datePassageEnConstruction
      datePassageEnInstruction
      dateTraitement
      motivation
      motivationAttachment {
        ...FileFragment
      }
      attestation {
        ...FileFragment
      }
      pdf {
        url
      }
      instructeurs {
        email
      }
      champs {
        ...ChampFragment
        ...RootChampFragment
      }
    }
  }
  
  fragment ChampFragment on Champ {
    id
    label
    stringValue
    ... on DateChamp {
      date
    }
    ... on DatetimeChamp {
      datetime
    }
    ... on CheckboxChamp {
      checked: value
    }
    ... on DecimalNumberChamp {
      decimalNumber: value
    }
    ... on IntegerNumberChamp {
      integerNumber: value
    }
    ... on CiviliteChamp {
      civilite: value
    }
    ... on LinkedDropDownListChamp {
      primaryValue
      secondaryValue
    }
    ... on MultipleDropDownListChamp {
      values
    }
    ... on PieceJustificativeChamp {
      file {
        ...FileFragment
      }
    }
    ... on AddressChamp {
      address {
        ...AddressFragment
      }
    }
    ... on CommuneChamp {
      commune {
        name
        code
      }
      departement {
        name
        code
      }
    }
  }
  
  fragment RootChampFragment on Champ {
    ... on RepetitionChamp {
      champs {
        ...ChampFragment
      }
    }
    
    ... on DossierLinkChamp {
      dossier {
        id
        state
        usager {
          email
        }
      }
    }
  }
  
  fragment FileFragment on File {
    filename
    contentType
    checksum
    byteSizeBigInt
    url
  }
  
  fragment AddressFragment on Address {
    label
    type
    streetAddress
    streetNumber
    streetName
    postalCode
    cityName
    cityCode
    departmentName
    departmentCode
    regionName
    regionCode
  }`;

  const fetching = await fetch(
    "https://www.demarches-simplifiees.fr/api/v2/graphql",
    {
      body: JSON.stringify({
        operationName: "getDossier",
        query,
        variables: { dossierId },
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${String(DS_SECRET)}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then((r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r;
  });
  return fetching.json();
};

export default withSentry(handler);
