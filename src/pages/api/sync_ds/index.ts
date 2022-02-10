import type { CategorieDossier, Demandeur, Dossier, SocieteProduction } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import _ from "lodash";
import type { NextApiHandler } from "next";
import { typeEmploiValue, getFormatedTypeDossier } from "src/lib/helpers";
import prisma from "src/lib/prismaClient";
import {
  createDemandeur,
  createDossier,
  createEnfant,
  createSocieteProduction,
  deleteEnfants,
  getUpcomingCommissions,
  searchDemandeur,
  searchDossierByExternalId,
  searchSocieteProductionBySiret,
  updateConstructDossier,
} from "src/lib/queries";

const handler: NextApiHandler = async (req, res) => {
  const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
  const ACTION_KEY = req.headers.authorization?.split(" ")[1];

  try {
    if (ACTION_KEY) {
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

      await fetch("https://www.demarches-simplifiees.fr/api/v2/graphql", {
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
      })
        .catch((err) => err)
        .then((r) => r.json())
        .then((data) => {
          /*console.log(
            "data : ",
            JSON.stringify(data.data.demarche.dossiers.nodes)
          );*/
          let modifications = [{}]
          modifications.push({received: JSON.stringify(data.data.demarche.dossiers.nodes)})
          data.data.demarche.dossiers.nodes.map(async (dossier) => {
            // Search Societe Production
            await searchSocieteProductionBySiret(
              prisma,
              dossier.demandeur.siret as string
            )
              .then(async (societe) => {
                if (societe.length > 0) {
                  console.log("found societe production");
                  return societe[0];
                } else {
                  console.log("didnt find societe production");
                  const societeProduction: SocieteProduction = {
                    adresse: dossier.demandeur.address.streetAddress,
                    adresseCodeCommune: dossier.demandeur.address.cityName,
                    adresseCodePostal: dossier.demandeur.address.postalCode,
                    conventionCollectiveCode: "missing",
                    departement: dossier.demandeur.address.postalCode.slice(
                      0,
                      2
                    ),
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
                  //console.log("createdSociete : ", createdSociete);
                  return createdSociete as SocieteProduction;
                }
              })
              .then(async (societe) => {
                //console.log("societe recup", societe);

                // Search demandeur
                let demandeur = (await searchDemandeur(
                  prisma,
                  _.get(
                    _.find(dossier.champs, { label: "Mail " }),
                    "stringValue"
                  ) as string
                )) as Demandeur;
                if (demandeur !== null) {
                  return { demandeur, societe };
                } else {
                  const demandeurTmp: Demandeur = {
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
                  //console.log("createdDemandeur : ", demandeur);
                  return { demandeur, societe };
                }
              })
              .then(async (datas) => {
                const { societe, demandeur } = datas;
                //console.log("data pour create dossier : ", datas);
                //console.log("societe recup pour create dossier : ", societe);
                /*console.log(
                  "demandeur recup pour create dossier : ",
                  demandeur
                );*/

                // search commission
                const commissions = await getUpcomingCommissions(
                  prisma,
                  dossier.demandeur.address.postalCode.slice(0, 2) as string
                );
                const commission = commissions[0];

                // Build array justifications (dossier)
                const arrayJustifs = [];
                if (
                  _.get(
                    _.find(dossier.champs, { label: "Synopsis" }),
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push("SYNOPSIS");
                }
                if (
                  _.get(
                    _.find(dossier.champs, { label: "Scenario" }),
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push("SCENARIO");
                }
                if (
                  _.get(
                    _.find(dossier.champs, {
                      label: "Note précisant les mesures de sécurité",
                    }),
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push("MESURES_SECURITE");
                }
                if (
                  _.get(
                    _.find(dossier.champs, { label: "Plan de travail" }),
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push("PLAN_TRAVAIL");
                }
                if (
                  _.get(
                    _.find(dossier.champs, {
                      label: "Eléments d'information complémentaires ",
                    }),
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push("INFOS_COMPLEMENTAIRES");
                }

                // Create or update dossier
                const newDossier: Dossier = {
                  categorie: getFormatedTypeDossier(_.get(
                    _.find(dossier.champs, { label: "Catégorie" }),
                    "stringValue"
                  )) as CategorieDossier,
                  commissionId: commission.id,
                  dateDebut: new Date(
                    _.get(
                      _.find(dossier.champs, {
                        label: "Date de commencement du projet",
                      }),
                      "date"
                    ) as Date
                  ),
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

                const intDossier = await searchDossierByExternalId(
                  prisma,
                  dossier.id as number
                );
                if (intDossier.length > 0) {
                  const finalDossier = await updateConstructDossier(
                    prisma,
                    newDossier,
                    intDossier[0].id
                  );
                  return finalDossier;
                } else {
                  const finalDossier = (await createDossier(
                    prisma,
                    newDossier
                  )) as Dossier;
                  return finalDossier;
                }
              })
              .then(async (finalDossier: any) => {
                //console.log("dossier created or updated : ", finalDossier);

                // Add Enfants
                await deleteEnfants(prisma, finalDossier.id as number);
                const champEnfant = _.get(
                  _.find(dossier.champs, { label: "Enfant" }),
                  "champs"
                );
                const nbreEnfants = _.filter(champEnfant, (datab) => {
                  return datab.label === "Nom";
                }).length;
                for (let i = 0; i < nbreEnfants; i++) {
                  const enfant: unknown = {
                    contexteTravail: _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Temps et lieu de travail";
                      })[i],
                      "stringValue"
                    ),
                    dateNaissance: new Date(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Né(e) le";
                        })[i],
                        "date"
                      ) as Date
                    ),
                    dossierId: finalDossier.id,
                    montantCachet: _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Montant du cachet";
                      })[i],
                      "decimalNumber"
                    ),
                    nom: strNoAccent(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Nom";
                        })[i],
                        "stringValue"
                      ) as string
                    ),
                    nomPersonnage: _.get(
                      _.filter(champEnfant, (datab) => {
                        return (
                          datab.label ===
                          "Nom du personnage incarné par l'enfant "
                        );
                      })[i],
                      "stringValue"
                    ),
                    nombreCachets: parseInt(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Nombre de cachets";
                        })[i],
                        "stringValue"
                      ) as string
                    ),
                    nombreJours: parseInt(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Nombre de jours de travail";
                        })[i],
                        "stringValue"
                      ) as string
                    ),
                    nombreLignes: parseInt(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Nombre de lignes";
                        })[i],
                        "stringValue"
                      ) != '' ? (_.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Nombre de lignes";
                        })[i],
                        "stringValue"
                      ) as string) : '0'
                    ),
                    periodeTravail: _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Période de travail";
                      })[i],
                      "stringValue"
                    ),
                    prenom: strNoAccent(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Prénom(s)";
                        })[i],
                        "stringValue"
                      ) as string
                    ),
                    remunerationTotale: _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Rémunération totale";
                      })[i],
                      "decimalNumber"
                    ),
                    remunerationsAdditionnelles: _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Rémunérations additionnelles";
                      })[i],
                      "stringValue"
                    ),
                    typeEmploi: typeEmploiValue(
                      _.get(
                        _.filter(champEnfant, (datab) => {
                          return datab.label === "Type d'emploi";
                        })[i],
                        "stringValue"
                      ) as string
                    ),
                  };
                  const arrayJustifs = [];
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Livret de famille";
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("LIVRET_FAMILLE");
                  }
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Autorisation parentale";
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("AUTORISATION_PARENTALE");
                  }
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return (
                          datab.label ===
                          "Situations particulières relatives à l'autorité parentale"
                        );
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("SITUATION8PARTICULIERE");
                  }
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Projet de contrat de travail";
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("CONTRAT");
                  }
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return (
                          datab.label ===
                          "Certificat de scolarité ou/et avis pédagogique"
                        );
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("CERTIFICAT_SCOLARITE");
                  }
                  if (
                    _.get(
                      _.filter(champEnfant, (datab) => {
                        return datab.label === "Avis médical d'aptitude";
                      })[i],
                      "file"
                    ) != null
                  ) {
                    arrayJustifs.push("AVIS_MEDICAL");
                  }
                  enfant.justificatifs = arrayJustifs;
                  const enfantCreated = await createEnfant(prisma, enfant);
                  console.log("enfant created : ", enfantCreated);
                }
                modifications.push({dossier: finalDossier})
                //setModifications(modifications)
              });
          });
          res.status(200).json({ success: "true", modificationsDone: modifications });
        })
    } else {
      console.log("pas ok test");
      res.status(401).json({ success: "not authoraized" });
    }
  } catch (e: unknown) {
    console.log(e)
    res.status(500).json({ success: "false", error:e });
  }
};

export default withSentry(handler);

function strNoAccent(a: string) {
  const b = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ";
  const c = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY";
  let d = "";
  for (let i = 0, j = a.length; i < j; i++) {
    const e = a.substr(i, 1);
    d += b.includes(e) ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
}
