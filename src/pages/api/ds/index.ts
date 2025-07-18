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
import { getDatasFromDS, getInfosFromDS } from "src/lib/fetching/ds";
import {
  BINDING_DS_STATUS,
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
  deleteEnfant,
  deleteEnfants,
  deletePieceDossier,
  findEnfant,
  findEnfants,
  getUpcomingCommissionsByLimitDate,
  searchDemandeur,
  searchDossierByExternalId,
  searchSocieteProductionBySiret,
  updateConstructDossier,
} from "src/lib/queries";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const refresh_key = req.query.refresh_key;
  if (
    !refresh_key ||
    refresh_key !== process.env.DEMARCHES_SIMPLIFIEES_REFRESH_KEY
  ) {
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
  const status = req.query.status || "en_construction";
  const forceRefresh = req.query.force === "true" ? true : false;
  const forceUpdateIds = req.query.forceIds || [];
  const infos = await getInfosFromDS(status as string);
  const { needUpdate, dossiersToUpdate } = await checkNeedUpdate(
    infos,
    forceRefresh,
    forceUpdateIds
  );
  if (needUpdate || forceRefresh) {
    for (const dosNumber of dossiersToUpdate) {
      try {
        const fetching = await getDatasFromDS(parseInt(dosNumber));
        const insert = await insertDataFromDs(fetching.data.dossier);
      } catch (e: unknown) {
        res.status(500).json(_.get(e, "errors"));
      }
    }
    res.status(200).json({message : "Ok success"});
  } else {
    res
      .status(200)
      .json({ success: "doesn't need update" });
  }
};

const checkNeedUpdate = async (
  data: unknown,
  forceRefresh: boolean,
  forceUpdateIds: string[]
) => {
  let needUpdate = forceUpdateIds.length > 0;
  const dossiersToUpdate = forceUpdateIds;

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < data.data.demarche.dossiers.nodes.length; i++) {
    const dossier = data.data.demarche.dossiers.nodes[i];
    const intDossier = await searchDossierByExternalId(
      prisma,
      dossier.id as number
    );

    if (intDossier.length === 0 || forceRefresh) {
      needUpdate = true;
      dossiersToUpdate.push(dossier.number as string);
    } else {
      const dateInt = new Date(
        intDossier[0].dateDerniereModification
      ).getTime();
      const dateExt = new Date(
        dossier.dateDerniereModification as Date
      ).getTime();
      if (dateInt !== dateExt) {
        dossiersToUpdate.push(dossier.number as string);
        needUpdate = true;
      }
    }
  }

  return { dossiersToUpdate, needUpdate };
};

const insertDataFromDs = async (dossier: unknown) => {
  try {
    // Search Societe Production
    await searchSocieteProductionBySiret(
      prisma,
      dossier.demandeur.siret as string
    )
      .then(async (societe) => {
        if (societe.length > 0) {
          return societe[0];
        } else {
          // create societe if not exists
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
            _.find(dossier.champs, { label: "Mail" }),
            "stringValue"
          ) as string
        );
        if (demandeur !== null) {
          return { demandeur, societe };
        } else {
          // create demandeur if not exists
          const demandeurTmp: Omit<Demandeur, "id"> = {
            email: _.get(
              _.find(dossier.champs, { label: "Mail" }),
              "stringValue"
            ),
            fonction: _.get(
              _.find(dossier.champs, { label: "Fonctions" }),
              "stringValue"
            ),
            nom: _.get(_.find(dossier.champs, { label: "Nom" }), "stringValue"),
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

        // search dossier
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
            intDossier.length > 0 ? intDossier[0].commissionId : commission.id,
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
          dateDepot: dossier.datePassageEnConstruction,
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
          statut: _.get(
            _.find(BINDING_DS_STATUS, { ds: dossier.state }),
            "eds"
          ),
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

        //Get all enfants concerned
        const allEnfants = await findEnfants(prisma, finalDossier.id as number);

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
                (_.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Nombre de cachets";
                  })[i],
                  "stringValue"
                ) as string) !== ""
                  ? (_.get(
                      _.filter(
                        champEnfant,
                        (datab: Record<string, unknown>) => {
                          return datab.label === "Nombre de cachets";
                        }
                      )[i],
                      "stringValue"
                    ) as string)
                  : "0"
              ),
              nombreJours: parseInt(
                (_.get(
                  _.filter(champEnfant, (datab: Record<string, unknown>) => {
                    return datab.label === "Nombre de jours de travail";
                  })[i],
                  "stringValue"
                ) as string) !== ""
                  ? (_.get(
                      _.filter(
                        champEnfant,
                        (datab: Record<string, unknown>) => {
                          return datab.label === "Nombre de jours de travail";
                        }
                      )[i],
                      "stringValue"
                    ) as string)
                  : "0"
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

            //get infos which need saving
            //check if enfant already exists
            const infosEnfant = await findEnfant(
              prisma,
              finalDossier.id as number,
              enfant.nom,
              enfant.prenom
            );
            if (infosEnfant) {
              enfant.cdc = infosEnfant.cdc;
              enfant.adresseEnfant = infosEnfant.adresseEnfant;
              enfant.nomRepresentant1 = infosEnfant.nomRepresentant1;
              enfant.prenomRepresentant1 = infosEnfant.prenomRepresentant1;
              enfant.adresseRepresentant1 = infosEnfant.adresseRepresentant1;
              enfant.nomRepresentant2 = infosEnfant.nomRepresentant2;
              enfant.prenomRepresentant2 = infosEnfant.prenomRepresentant2;
              enfant.adresseRepresentant2 = infosEnfant.adresseRepresentant2;

              // Delete concerned Enfant
              await deleteEnfants(
                prisma,
                finalDossier.id as number,
                enfant.nom,
                enfant.prenom
              );
            }

            // build justificatifs enfant
            const arrayJustifs: JustificatifEnfant[] = [];
            _.forEach(
              JUSTIFS_ENFANT,
              (justif: { label: string; value: string }) => {
                if (
                  _.get(
                    _.filter(champEnfant, (datab: Record<string, unknown>) => {
                      return datab.label === justif.label;
                    })[i],
                    "file"
                  ) != null
                ) {
                  arrayJustifs.push(justif.value as JustificatifEnfant);
                }
              }
            );
            enfant.justificatifs = arrayJustifs;

            // create enfant
            const enfantCreated = await createEnfant(prisma, enfant);

            // get enfants not found
            const enfantFound = _.find(allEnfants, (enfantF: Enfant) => {
              return (
                enfantF.nom === enfantCreated.nom &&
                enfantF.prenom === enfantCreated.prenom
              );
            });
            const indexEnfant = _.indexOf(allEnfants, enfantFound, 0);
            allEnfants.splice(indexEnfant as number, 1);

            // add pieces dossier enfant
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
        //delete not found enfants
        allEnfants.map(async (enfant: Enfant) => {
          await deleteEnfant(prisma, enfant.id);
        });
        console.log(
          "Data fetching Démarches simplifiées : updated dossier ",
          finalDossier.nom
        );
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  } catch (e: unknown) {
    return { error: e };
  }
  return { message: "success" };
};

export default withSentry(handler);
