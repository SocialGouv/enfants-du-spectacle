import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
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
  res.status(fetching.errors ? 500 : 200).json(superjson.stringify(fetching));
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
