export const getDatasFromDS = async (dossierId: number) => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
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
        demandeur {
          ... on PersonnePhysique {
            civilite
            nom
            prenom
            dateDeNaissance
          }
          ...PersonneMoraleFragment
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
  
    fragment PersonneMoraleFragment on PersonneMorale {
      siret
      siegeSocial
      naf
      libelleNaf
      address {
        ...AddressFragment
      }
      entreprise {
        siren
        capitalSocial
        numeroTvaIntracommunautaire
        formeJuridique
        formeJuridiqueCode
        nomCommercial
        raisonSociale
        siretSiegeSocial
        codeEffectifEntreprise
        dateCreation
        nom
        prenom
        attestationFiscaleAttachment {
          ...FileFragment
        }
        attestationSocialeAttachment {
          ...FileFragment
        }
      }
      association {
        rna
        titre
        objet
        dateCreation
        dateDeclaration
        datePublication
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

export const getInfosFromDS = async (status: string) => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const demarcheNumber = parseInt(process.env.DEMARCHE_NUMBER ?? "");
  const state = status;
  const query = `query getDemarche(
      $demarcheNumber: Int!
      $state: DossierState
      $order: Order
      $after: String
      ) {
      demarche(number: $demarcheNumber) {
          id
          number
          title
          dossiers(state: $state, order: $order, after: $after) {
          nodes {
              ...DossierFragment
          }
          }
      }
      }
      
      query getDossier($dossierNumber: Int!) {
      dossier(number: $dossierNumber) {
          ...DossierFragment
          demarche {
          ...DemarcheDescriptorFragment
          }
      }
      }
      
      query getDeletedDossiers($demarcheNumber: Int!, $order: Order, $after: String) {
      demarche(number: $demarcheNumber) {
          deletedDossiers(order: $order, after: $after) {
          nodes {
              ...DeletedDossierFragment
          }
          }
      }
      }
      
      fragment DossierFragment on Dossier {
      id
      number
      archived
      state
      dateDerniereModification
      datePassageEnConstruction
      }
      
      fragment DemarcheDescriptorFragment on DemarcheDescriptor {
      id
      number
      title
      description
      state
      declarative
      dateCreation
      datePublication
      dateDerniereModification
      dateDepublication
      dateFermeture
      }
      
      fragment DeletedDossierFragment on DeletedDossier {
      id
      number
      dateSupression
      state
      reason
      }`;

  const fetching = await fetch(
    "https://www.demarches-simplifiees.fr/api/v2/graphql",
    {
      body: JSON.stringify({
        operationName: "getDemarche",
        query,
        variables: { demarcheNumber, state },
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
