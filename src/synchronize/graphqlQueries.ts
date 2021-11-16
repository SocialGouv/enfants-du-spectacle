import { gql } from "@urql/core";

const ChampDescriptorFragment = gql`
  fragment ChampDescriptorFragment on ChampDescriptor {
    id
    type
    label
    description
    required
    options
  }
`;

const RevisionFragment = gql`
  fragment RevisionFragment on Revision {
    id
    champDescriptors {
      ...ChampDescriptorFragment
      champDescriptors {
        ...ChampDescriptorFragment
      }
    }
    annotationDescriptors {
      ...ChampDescriptorFragment
      champDescriptors {
        ...ChampDescriptorFragment
      }
    }
  }

  ${ChampDescriptorFragment}
`;

const GeoAreaFragment = gql`
  fragment GeoAreaFragment on GeoArea {
    source
    geometry {
      type
      coordinates
    }
    ... on ParcelleCadastrale {
      codeArr
      codeCom
      codeDep
      feuille
      nomCom
      numero
      section
      surfaceParcelle
      surfaceIntersection
    }
  }
`;

const ChampFragment = gql`
  fragment ChampFragment on Champ {
    id
    label
    stringValue
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
  }
`;

const FileFragment = gql`
  fragment FileFragment on File {
    filename
    contentType
    checksum
    byteSize
    url
  }
`;

const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    email
    body
    createdAt
    attachment {
      ...FileFragment
    }
  }
`;

const AvisFragment = gql`
  fragment AvisFragment on Avis {
    id
    question
    reponse
    dateQuestion
    dateReponse
    claimant {
      email
    }
    expert {
      email
    }
    attachment {
      ...FileFragment
    }
  }

  ${FileFragment}
`;

const AddressFragment = gql`
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
  }
`;

const PersonneMoraleFragment = gql`
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

  ${AddressFragment}
  ${FileFragment}
`;

const RootChampFragment = gql`
  fragment RootChampFragment on Champ {
    ... on RepetitionChamp {
      champs {
        ...ChampFragment
      }
    }
    ... on SiretChamp {
      etablissement {
        ...PersonneMoraleFragment
      }
    }
    ... on CarteChamp {
      geoAreas {
        ...GeoAreaFragment
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

  ${GeoAreaFragment}
  ${ChampFragment}
  ${PersonneMoraleFragment}
`;

const DossierFragment = gql`
  fragment DossierFragment on Dossier {
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
    groupeInstructeur {
      id
      number
      label
    }
    # revision {
    #   ...RevisionFragment
    # }
    champs {
      ...ChampFragment
      ...RootChampFragment
    }
    annotations {
      ...ChampFragment
      ...RootChampFragment
    }
    avis {
      ...AvisFragment
    }
    messages {
      ...MessageFragment
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
  }

  ${FileFragment}
  ${RevisionFragment}
  ${ChampFragment}
  ${RootChampFragment}
  ${PersonneMoraleFragment}
  ${MessageFragment}
  ${AvisFragment}
`;

const DEMARCHE_QUERY = gql`
  query getDemarche(
    $demarcheNumber: Int!
    $state: DossierState
    $after: String
  ) {
    demarche(number: $demarcheNumber) {
      id
      number
      title
      publishedRevision {
        ...RevisionFragment
      }
      # groupeInstructeurs {
      #   id
      #   number
      #   label
      #   instructeurs {
      #     id
      #     email
      #   }
      # }
      dossiers(state: $state, after: $after) {
        nodes {
          ...DossierFragment
        }
      }
    }
  }

  ${RevisionFragment}
  ${DossierFragment}
`;

// query getGroupeInstructeur($groupeInstructeurNumber: Int!, $state: DossierState, $after: String) {
//   groupeInstructeur(number: $groupeInstructeurNumber) {
//     id
//     number
//     label
//     instructeurs {
//       id
//       email
//     }
//     dossiers(state: $state, after: $after) {
//       nodes {
//         ...DossierFragment
//       }
//     }
//   }
// }

// query getDossier($dossierNumber: Int!) {
//   dossier(number: $dossierNumber) {
//     ...DossierFragment
//   }
// }

export { DEMARCHE_QUERY };
