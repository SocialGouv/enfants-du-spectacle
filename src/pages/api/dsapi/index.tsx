import type {
  CategorieDossier,
  Demandeur,
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossier,
  SocieteProduction,
  TypeEmploi,
} from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import {
  getFormatedTypeDossier,
  JUSTIFS_DOSSIER,
  JUSTIFS_ENFANT,
  strNoAccent,
  typeEmploiValue,
} from "src/lib/helpers";
import prisma from "src/lib/prismaClient";
import {
  createDemandeur,
  createDossier,
  createEnfant,
  createPieceDossier,
  createPieceDossierEnfant,
  createSocieteProduction,
  deleteEnfants,
  deletePieceDossier,
  getUpcomingCommissionsByLimitDate,
  searchDemandeur,
  searchDossierByExternalId,
  searchSocieteProductionBySiret,
  updateConstructDossier,
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
  const infos = await getInfosFromDS();
  const neddUpdate = await checkNeedUpdate(infos);
  if (neddUpdate) {
    const fetching = await getDatasFromDS();
    if (_.get(fetching, "errors")) {
      res.status(500).json(superjson.stringify(_.get(fetching, "errors")));
    } else {
      const insert = insertDataFromDs(_.get(fetching, "data"));
      res.status(insert.error ? 500 : 200).json(superjson.stringify(insert));
    }
  } else {
    res
      .status(200)
      .json(superjson.stringify({ success: "doesn't need update" }));
  }
};

const checkNeedUpdate = async (data: unknown) => {
  const needUpdate = new Promise((resolve) => {
    let checker = true;
    data.data.demarche.dossiers.nodes.forEach(async (dossier, index) => {
      //console.log(dossier)
      const intDossier = await searchDossierByExternalId(
        prisma,
        dossier.id as number
      );
      if (intDossier.length === 0) {
        checker = true;
      } else {
        const dateInt = new Date(
          intDossier[0].dateDerniereModification
        ).getTime();
        const dateExt = new Date(
          dossier.dateDerniereModification as Date
        ).getTime();
        if (dateInt !== dateExt) checker = true;
      }
      if (index === data.data.demarche.dossiers.nodes.length - 1)
        resolve(checker);
    });
  });
  return needUpdate;
};

const insertDataFromDs = (data: unknown) => {
  try {
    data.demarche.dossiers.nodes.map(async (dossier) => {
      // Search Societe Production
      await searchSocieteProductionBySiret(
        prisma,
        dossier.demandeur.siret as string
      )
        .then(async (societe) => {
          if (societe.length > 0) {
            return societe[0];
          } else {
            const societeProduction: Omit<SocieteProduction, "id"> = {
              adresse: dossier.demandeur.address.streetAddress,
              adresseCodeCommune: dossier.demandeur.address.cityName,
              adresseCodePostal: dossier.demandeur.address.postalCode,
              conventionCollectiveCode: _.get(
                _.find(dossier.champs, {
                  label: "Convention collective applicable",
                }),
                "stringValue"
              ).slice(-4),
              departement: dossier.demandeur.address.postalCode.slice(0, 2),
              formeJuridique: dossier.demandeur.entreprise.formeJuridique,
              naf: dossier.demandeur.naf,
              nom:
                dossier.demandeur.entreprise.nomCommercial != ""
                  ? dossier.demandeur.entreprise.nomCommercial
                  : dossier.demandeur.entreprise.raisonSociale,
              raisonSociale: dossier.demandeur.entreprise.raisonSociale,
              siren: dossier.demandeur.entreprise.siren,
              siret: dossier.demandeur.siret,
            };
            const createdSociete = await createSocieteProduction(
              prisma,
              societeProduction
            );
            return createdSociete as SocieteProduction;
          }
        })
        .then(async (societe) => {
          // Search demandeur
          let demandeur = await searchDemandeur(
            prisma,
            _.get(
              _.find(dossier.champs, { label: "Mail " }),
              "stringValue"
            ) as string
          );
          if (demandeur !== null) {
            return { demandeur, societe };
          } else {
            const demandeurTmp: Omit<Demandeur, "id"> = {
              email: _.get(
                _.find(dossier.champs, { label: "Mail " }),
                "stringValue"
              ),
              fonction: _.get(
                _.find(dossier.champs, { label: "Fonctions" }),
                "stringValue"
              ),
              nom: _.get(
                _.find(dossier.champs, { label: "Nom" }),
                "stringValue"
              ),
              phone: _.get(
                _.find(dossier.champs, { label: "Téléphone " }),
                "stringValue"
              ),
              prenom: _.get(
                _.find(dossier.champs, { label: "Prénom" }),
                "stringValue"
              ),
              societeProductionId: societe.id,
            };
            demandeur = (await createDemandeur(
              prisma,
              demandeurTmp
            )) as Demandeur;
            return { demandeur, societe };
          }
        })
        .then(async (datas) => {
          const { societe, demandeur } = datas;

          // search commission
          const commissions = await getUpcomingCommissionsByLimitDate(
            prisma,
            dossier.demandeur.address.postalCode.slice(0, 2) as string
          );
          const commission = commissions[0];

          // Build array justifications (dossier)
          const arrayJustifs: JustificatifDossier[] = [];
          _.forEach(
            JUSTIFS_DOSSIER,
            (justif: { label: string; value: string }) => {
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
            }
          );

          const intDossier = await searchDossierByExternalId(
            prisma,
            dossier.id as number
          );

          // Create or update dossier
          const newDossier: Omit<Dossier, "id" | "numeroDS" | "userId"> = {
            categorie: getFormatedTypeDossier(
              _.get(
                _.find(dossier.champs, { label: "Catégorie" }),
                "stringValue"
              ) as string
            ) as CategorieDossier,
            commissionId:
              intDossier.length > 0
                ? intDossier[0].commissionId
                : commission.id,
            conventionCollectiveCode: _.get(
              _.find(dossier.champs, {
                label: "Convention collective applicable",
              }),
              "stringValue"
            ).slice(-4),
            dateDebut: new Date(
              _.get(
                _.find(dossier.champs, {
                  label: "Date de commencement du projet",
                }),
                "date"
              ) as Date
            ),
            dateDerniereModification: dossier.dateDerniereModification,
            dateFin: new Date(
              _.get(
                _.find(dossier.champs, {
                  label: "Date de fin du projet",
                }),
                "date"
              ) as Date
            ),
            demandeurId: demandeur.id,
            externalId: dossier.id,
            justificatifs: arrayJustifs,
            nom: _.get(
              _.find(dossier.champs, { label: "Titre du projet" }),
              "stringValue"
            ),
            number: dossier.number,
            presentation: _.get(
              _.find(dossier.champs, {
                label: "Présentation globale du projet",
              }),
              "stringValue"
            ),
            scenesSensibles: _.get(
              _.find(dossier.champs, {
                label: "Projet contenant certains types de scènes",
              }),
              "stringValue"
            ),
            societeProductionId: societe.id,
            statut:
              dossier.state === "en_construction"
                ? "CONSTRUCTION"
                : "INSTRUCTION",
          };

          const finalDossier =
            intDossier.length > 0
              ? ((await updateConstructDossier(
                  prisma,
                  newDossier,
                  intDossier[0].id
                )) as Dossier)
              : ((await createDossier(prisma, newDossier)) as Dossier);

          // add pieces dossier (delete old pieces if needed)
          if (intDossier.length > 0) {
            await deletePieceDossier(prisma, intDossier[0].id);
          }
          _.forEach(arrayJustifs, async (piece: JustificatifDossier) => {
            const createdPiece: Omit<PieceDossier, "id"> = {
              dossierId: finalDossier.id,
              externalId: _.get(
                _.find(dossier.champs, (datab: Record<string, unknown>) => {
                  return (
                    datab.label ===
                    _.get(_.find(JUSTIFS_DOSSIER, { value: piece }), "label")
                  );
                }),
                "file"
              ).checksum,
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

          return finalDossier;
        })
        .then(async (finalDossier: Record<string, unknown>) => {
          // Delete all concerned Enfants
          await deleteEnfants(prisma, finalDossier.id as number);
          const champEnfant = _.get(
            _.find(dossier.champs, { label: "Enfant" }),
            "champs"
          );
          // Get nombre Enfants
          const nbreEnfants = _.filter(
            champEnfant,
            (datab: Record<string, unknown>) => {
              return datab.label === "Nom";
            }
          ).length;
          // Add all concerned Enfants
          for (let i = 0; i < nbreEnfants; i++) {
            if (
              _.get(
                _.filter(champEnfant, (datab: Record<string, unknown>) => {
                  return datab.label === "Type d'emploi";
                })[i],
                "stringValue"
              )
            ) {
              const enfant: Enfant = {
                contexteTravail: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Temps et lieu de travail";
                  })[i],
                  "stringValue"
                ),
                dateNaissance: new Date(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Né(e) le";
                    })[i],
                    "date"
                  ) as Date
                ),
                dossierId: finalDossier.id as number,
                montantCachet: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Montant du cachet";
                  })[i],
                  "decimalNumber"
                ),
                nom: strNoAccent(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Nom";
                    })[i],
                    "stringValue"
                  ) as string
                ),
                nomPersonnage: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return (
                      datab.label === "Nom du personnage incarné par l'enfant "
                    );
                  })[i],
                  "stringValue"
                ),
                nombreCachets: parseInt(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Nombre de cachets";
                    })[i],
                    "stringValue"
                  ) as string
                ),
                nombreJours: parseInt(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Nombre de jours de travail";
                    })[i],
                    "stringValue"
                  ) as string
                ),
                nombreLignes: parseInt(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Nombre de lignes";
                    })[i],
                    "stringValue"
                  ) != ""
                    ? (_.get(
                        _.filter(
                          champEnfant,
                          (datab: Record<string, unknown>) => {
                            return datab.label === "Nombre de lignes";
                          }
                        )[i],
                        "stringValue"
                      ) as string)
                    : "0"
                ),
                periodeTravail: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Période de travail";
                  })[i],
                  "stringValue"
                ),
                prenom: strNoAccent(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Prénom(s)";
                    })[i],
                    "stringValue"
                  ) as string
                ),
                remunerationTotale: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Rémunération totale";
                  })[i],
                  "decimalNumber"
                ),
                remunerationsAdditionnelles: _.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Rémunérations additionnelles";
                  })[i],
                  "stringValue"
                ),
                typeEmploi: typeEmploiValue(
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === "Type d'emploi";
                    })[i],
                    "stringValue"
                  ) as TypeEmploi
                ),
              };
              // build justificatifs enfant
              const arrayJustifs: JustificatifEnfant[] = [];
              _.forEach(
                JUSTIFS_ENFANT,
                (justif: { label: string; value: string }) => {
                  if (
                    _.get(
                      _.filter(
                        champEnfant,
                        (datab: Record<string, unknown>) => {
                          return datab.label === justif.label;
                        }
                      )[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push(justif.value as JustificatifEnfant);
                  }
                }
              );
              enfant.justificatifs = arrayJustifs;

              // add pieces dossier enfant
              const enfantCreated = await createEnfant(prisma, enfant);
              _.forEach(arrayJustifs, async (piece: JustificatifEnfant) => {
                const createdPiece = {
                  dossierId: finalDossier.id,
                  enfantId: enfantCreated.id,
                  externalId: _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return (
                        datab.label ===
                        _.get(_.find(JUSTIFS_ENFANT, { value: piece }), "label")
                      );
                    })[i],
                    "file"
                  ).checksum,
                  link: _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return (
                        datab.label ===
                        _.get(_.find(JUSTIFS_ENFANT, { value: piece }), "label")
                      );
                    })[i],
                    "file"
                  ).url,
                  type: piece,
                };
                await createPieceDossierEnfant(prisma, createdPiece);
              });
            }
          }
        });
    });
  } catch (e: unknown) {
    return { error: e };
  }
  return { message: "success" };
};

const getDatasFromDS = async () => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const demarcheNumber = 49723;
  const state = "en_construction";
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
      publishedRevision {
        ...RevisionFragment
      }
      groupeInstructeurs {
        id
        number
        label
        instructeurs {
          id
          email
        }
      }
      dossiers(state: $state, order: $order, after: $after) {
        nodes {
          ...DossierFragment
        }
      }
    }
  }
  
  query getGroupeInstructeur(
    $groupeInstructeurNumber: Int!
    $state: DossierState
    $order: Order
    $after: String
  ) {
    groupeInstructeur(number: $groupeInstructeurNumber) {
      id
      number
      label
      instructeurs {
        id
        email
      }
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
    revision {
      ...RevisionFragment
    }
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
  }
  
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
  
  fragment ChampDescriptorFragment on ChampDescriptor {
    id
    type
    label
    description
    required
    options
  }
  
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
  
  fragment MessageFragment on Message {
    id
    email
    body
    createdAt
    attachment {
      ...FileFragment
    }
  }
  
  fragment GeoAreaFragment on GeoArea {
    id
    source
    description
    geometry {
      type
      coordinates
    }
    ... on ParcelleCadastrale {
      commune
      numero
      section
      prefixe
      surface
    }
  }
  
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

const getInfosFromDS = async () => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const demarcheNumber = 49723;
  const state = "en_construction";
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

export default withSentry(handler);
