import React, { useState } from "react";
import styles from "./DossierForm.module.scss";
import { Select } from "@dataesr/react-dsfr";
import { Enfant, JustificatifEnfant } from "@prisma/client";
import {
  TYPE_EMPLOI,
  frenchDateText,
  useDebouncedCallback,
} from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { EnfantWithDosier, updateEnfant } from "src/fetching/enfant";
import _ from "lodash";
import fr from "date-fns/locale/fr";
import moment from "moment";
import InputFile from "../uiComponents/InputFile";
import { EnfantData } from "src/fetching/dossiers";
import { createPieceEnfant, deletePieceEnfant } from "src/fetching/pieceEnfant";
import InputAutocomplete from "../uiComponents/InputAutocomplete";
import { uploadDoc } from "src/fetching/docs";
import Link from "next/link";
import useStateContext from "src/context/StateContext";
import { ButtonLink } from "src/uiComponents/button";
import { deleteEnfant } from "src/fetching/enfant";
import InputComments from "../uiComponents/inputComments";
import ListComments from "../ListComments";
import { RiInformationFill } from "react-icons/ri";

interface Props {
  enfant: EnfantData;
  allowChanges: Boolean;
  refresh: (enfant: Enfant) => void;
}

const EnfantForm: React.FC<Props> = ({ enfant, allowChanges, refresh }) => {
  const [enfantTmp, setEnfant] = React.useState<EnfantData>(enfant);
  const [dataPassed, setDataPassed] =
    React.useState<Record<"nom" | "prenom", string>>();
  const [initialRender, setInitialRender] = React.useState<Boolean>(true);
  const [initialDataPassed, setInitialDataPassed] =
    React.useState<Boolean>(true);
  const contextDossier = { ...useStateContext() };
  const [showDialogue, setShowDialogue] = React.useState<Boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFormEnfant = (e: React.FormEvent<HTMLInputElement>): void => {
    setEnfant({
      ...enfantTmp,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const handleAutocomplete = (str: string, field: "nom" | "prenom"): void => {
    setDataPassed({ [field]: str } as Record<"nom" | "prenom", string>);
  };

  React.useEffect(() => {
    if (!initialDataPassed) {
      setEnfant({
        ...enfantTmp,
        [dataPassed?.nom ? "nom" : "prenom"]: dataPassed?.nom
          ? dataPassed?.nom
          : dataPassed?.prenom,
      });
    } else {
      setInitialDataPassed(false);
    }
  }, [dataPassed]);

  const handleSelect = (enfant: EnfantWithDosier) => {
    console.log("enfant to handle : ", enfant);
    setEnfant({
      ...enfantTmp,
      nom: enfant.nom,
      prenom: enfant.prenom,
      dateNaissance: enfant.dateNaissance,
      nomRepresentant1: enfant.nomRepresentant1,
      nomRepresentant2: enfant.nomRepresentant2,
      prenomRepresentant1: enfant.prenomRepresentant1,
      prenomRepresentant2: enfant.prenomRepresentant2,
      adresseRepresentant1: enfant.adresseRepresentant1,
      adresseRepresentant2: enfant.adresseRepresentant2,
      mailRepresentant1: enfant.mailRepresentant1,
      mailRepresentant2: enfant.mailRepresentant2,
      telRepresentant1: enfant.telRepresentant1,
      telRepresentant2: enfant.telRepresentant2,
      piecesDossier: enfant.piecesDossier.filter((piece) => {
        return (
          piece.type === "LIVRET_FAMILLE" ||
          piece.type === "CERTIFICAT_SCOLARITE"
        );
      }),
    });
    enfant.piecesDossier.map(async (pieceDossier) => {
      console.log();
      if (
        pieceDossier.type === "LIVRET_FAMILLE" ||
        pieceDossier.type === "CERTIFICAT_SCOLARITE"
      ) {
        pieceDossier.enfantId = enfantTmp.id;
        delete pieceDossier.id;
        await createPieceEnfant(pieceDossier);
      }
    });
  };

  const handleDateEnfant = (wichDate: string, date: Date): void => {
    setEnfant({
      ...enfantTmp,
      [wichDate]: date,
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.select();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();
    data.append(e.target.name, e.target.files[0]);
    let upload = await uploadDoc(data, enfantTmp.dossierId);
    let res = await createPieceEnfant({
      nom: e.target.files[0].name,
      enfantId: enfantTmp.id,
      type: e.target.id as JustificatifEnfant,
      externalId: "",
      link: upload.filePath,
      statut: null,
      dossierId: contextDossier.dossier.id,
    });
    setEnfant({
      ...enfantTmp,
      piecesDossier: enfantTmp.piecesDossier
        ? [...enfantTmp.piecesDossier, res.pieceDossier]
        : [res.pieceDossier],
    });
    contextDossier.processInput("docs", "enfants", [
      {
        id: enfantTmp.id,
        piecesDossier: [
          ...(contextDossier.docs.enfants.find((enf) => enf.id === enfantTmp.id)
            ?.piecesDossier ?? []),
          res.tokenizedLink,
        ],
      },
      ...contextDossier.docs.enfants.filter(
        (docEnfant) => docEnfant.id !== enfantTmp.id
      ),
    ]);
    console.log("test : ", contextDossier.docs);
  };

  const handleDelete = async (id: string) => {
    let res = await deletePieceEnfant(parseInt(id));
    setEnfant({
      ...enfantTmp,
      piecesDossier: enfantTmp.piecesDossier.filter((doc) => {
        return doc.id !== parseInt(id);
      }),
    });
  };

  const handleDeleteChild = async () => {
    await deleteEnfant(enfant.id);
  };

  const saveEnfant = useDebouncedCallback(() => {
    updateEnfant(enfantTmp);
    refresh(enfantTmp);
  }, 1000);

  React.useEffect(() => {
    let total = 0;
    if (enfantTmp.nombreCachets && enfantTmp.montantCachet)
      total = enfantTmp.montantCachet * enfantTmp.nombreCachets;
    if (enfantTmp.remunerationsAdditionnelles)
      total += parseFloat(enfantTmp.remunerationsAdditionnelles);
    setEnfant({
      ...enfantTmp,
      remunerationTotale: total,
    });
  }, [
    enfantTmp.montantCachet,
    enfantTmp.nombreCachets,
    enfantTmp.remunerationsAdditionnelles,
  ]);

  React.useEffect(() => {
    console.log(
      "test enfant : ",
      enfantTmp.typeConsultation !== "THALIE" ||
        (enfantTmp.typeConsultation === "THALIE" &&
          (enfantTmp.piecesDossier.filter((doc) => {
            return doc.type === "AUTORISATION_PRISE_EN_CHARGE";
          }).length > 0 ||
            enfantTmp.piecesDossier.filter((doc) => {
              return doc.type === "BON_PRISE_EN_CHARGE";
            }).length > 0))
    );
    if (initialRender) {
      setInitialRender(false);
    } else {
      saveEnfant();
    }
  }, [enfantTmp]);

  React.useEffect(() => {
    registerLocale("fr", fr);
    setDefaultLocale("fr");
  });

  return (
    <div className={styles.enfantForm}>
      <div className={styles.byThreeForm}>
        <div className={styles.blocForm}>
          <InputAutocomplete
            label={"Prénom(s) *"}
            field={"prenom"}
            enfant={enfantTmp}
            passData={handleAutocomplete}
            passEnfant={handleSelect}
          ></InputAutocomplete>
        </div>

        <div className={styles.blocForm}>
          <InputAutocomplete
            label={"Nom *"}
            field={"nom"}
            enfant={enfantTmp}
            passData={handleAutocomplete}
            passEnfant={handleSelect}
          ></InputAutocomplete>
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="date" className="mb-2 italic">
            Né(e) le *
          </label>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={
                enfantTmp?.dateNaissance
                  ? moment(enfantTmp?.dateNaissance).toDate()
                  : enfantTmp?.dateNaissance
              }
              className="inputText"
              showMonthDropdown
              showYearDropdown
              disabled={!allowChanges}
              dropdownMode="select"
              onChange={(date: Date) => {
                handleDateEnfant("dateNaissance", date);
              }}
            />
          </div>
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="typeEmploi" className="mb-2 italic">
            Type d&apos;emploi *
          </label>
          <div className="selectDpt">
            <Select
              id="typeEmploi"
              selected={enfantTmp?.typeEmploi ? enfantTmp.typeEmploi : ""}
              options={[
                { label: enfantTmp?.typeEmploi ? "" : "Choisir", value: "" },
              ].concat(
                TYPE_EMPLOI.map((u) => ({
                  label: u,
                  value: u,
                }))
              )}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleFormEnfant(event);
              }}
            />
          </div>
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="nomPersonnage" className="mb-2 italic">
            Nom du personnage incarné
          </label>
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.nomPersonnage || ""}
            disabled={!allowChanges}
            type="text"
            id="nomPersonnage"
            name="nomPersonnage"
            className="inputText"
          />
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="nombreJours" className="mb-2 italic">
            Nombre de jours de travail *
          </label>
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.nombreJours || 0}
            disabled={!allowChanges}
            type="number"
            min="0"
            id="nombreJours"
            name="nombreJours"
            className="inputText"
            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              handleFocus(e)
            }
          />
        </div>
      </div>

      <h5 className={styles.h5Spacer}>Périodes de travail liées à l'enfant</h5>

      <div className={styles.blocForm}>
        <label htmlFor="periodeTravail" className="mb-2 italic">
          Période de travail *
        </label>
        <p className={styles.smallText}>
          Veuillez indiquer la période (maximale de trois mois) aucours de
          laquelle l&apos;enfant va intervenir (exemple: l&apos;enfant
          travaillera à l&apos;intérieur d&apos;une période comprise entre le 15
          mars 2022 et le 15 juin 2022)
        </p>
        <input
          onChange={handleFormEnfant}
          value={enfantTmp?.periodeTravail || ""}
          disabled={!allowChanges}
          type="text"
          id="periodeTravail"
          name="periodeTravail"
          className="inputText"
        />
      </div>

      <div className={styles.blocForm}>
        <label htmlFor="contexteTravail" className="mb-2 italic">
          Temps et lieu de travail *
        </label>
        <p className={styles.smallText}>
          Veuillez indiquer de façon prévisionnelle, la durée quotidienne de
          travail, les temps de pause, les dates et horaires de travail, le(s)
          lieu(x) de travail. Veuillez, en outre, le cas échéant, indiquer les
          emplois précédemment occupés par l&apos;enfant.
        </p>

        <div className="Form--field">
          <textarea
            onChange={handleFormEnfant}
            disabled={!allowChanges}
            type="textarea"
            id="contexteTravail"
            value={enfantTmp?.contexteTravail || ""}
            className={styles.areaText}
          />
        </div>
      </div>

      <div className={styles.blocForm}>
        <label className={styles.radioMedecine}>
          <input
            type="checkbox"
            checked={enfantTmp.checkTravailNuit}
            onChange={() => {
              setEnfant({
                ...enfantTmp,
                checkTravailNuit: !enfantTmp.checkTravailNuit,
              });
            }}
          />
          Travail de nuit
        </label>

        {enfantTmp.checkTravailNuit && (
          <>
            <p className={styles.smallText}>
              Veuillez préciser les modalités du travail de nuit
            </p>

            <div className="Form--field">
              <textarea
                onChange={handleFormEnfant}
                disabled={!allowChanges}
                type="textarea"
                id="textTravailNuit"
                value={enfantTmp?.textTravailNuit || ""}
                className={styles.areaText}
              />
            </div>
          </>
        )}
      </div>

      <h5 className={styles.h5Spacer}>Rémunérations</h5>

      <div className={styles.byThreeForm}>
        <div className={styles.blocForm}>
          <label htmlFor="montantCachet" className="mb-2 italic">
            Montant du cachet *
          </label>
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.montantCachet}
            disabled={!allowChanges}
            type="number"
            min="0"
            step="0.01"
            lang="en-US"
            id="montantCachet"
            name="montantCachet"
            className="inputText"
            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              handleFocus(e)
            }
          />
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="nombreCachets" className="mb-2 italic">
            Nombre de cachets *
          </label>
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.nombreCachets || 0}
            disabled={!allowChanges}
            type="number"
            min="0"
            id="nombreCachets"
            name="nombreCachets"
            className="inputText"
            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              handleFocus(e)
            }
          />
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="nombreLignes" className="mb-2 italic">
            Nombre de lignes{" "}
            <RiInformationFill
              cursor={"pointer"}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
          </label>
          {showTooltip && (
            <div className={styles.tooltip}>Pour le doublage uniquement</div>
          )}
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.nombreLignes || 0}
            disabled={!allowChanges}
            type="number"
            min="0"
            id="nombreLignes"
            name="nombreLignes"
            className="inputText"
            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              handleFocus(e)
            }
          />
        </div>
      </div>

      <div className={styles.blocForm}>
        <label htmlFor="remunerationsAdditionnelles" className="mb-2 italic">
          Rémunérations additionnelles
        </label>
        <p className={styles.smallText}>
          Veuillez indiquer le montant total des rémunérations additionnelles,
          cachet de sécurité, de répétition ou de post synchro confondus.
        </p>
        <input
          onChange={handleFormEnfant}
          value={enfantTmp?.remunerationsAdditionnelles || ""}
          disabled={!allowChanges}
          type="number"
          min="0"
          id="remunerationsAdditionnelles"
          name="remunerationsAdditionnelles"
          className="inputText"
        />
      </div>

      <div className={styles.halfForm}>
        <div className={styles.blocForm}>
          <label htmlFor="remunerationTotale" className="mb-2 italic">
            Rémunération totale *
          </label>
          <input
            onChange={handleFormEnfant}
            value={enfantTmp?.remunerationTotale}
            disabled={!allowChanges}
            type="number"
            min="0"
            id="remunerationTotale"
            name="remunerationTotale"
            className="inputText"
            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              handleFocus(e)
            }
          />
        </div>
      </div>

      <h5 className={styles.h5Spacer}>{"Avis médical d'aptitude"}</h5>

      <div className={styles.blocForm}>
        <label htmlFor="remunerationTotale" className="mb-2 italic">
          {"L'enfant doit consulter :"}
        </label>
        <br />
        <br />
        <label className={styles.radioMedecine}>
          <input
            type="radio"
            value="Male"
            checked={enfantTmp.typeConsultation === "THALIE"}
            onChange={() => {
              setEnfant({ ...enfantTmp, typeConsultation: "THALIE" });
            }}
          />
          Un médecin de Thalie Santé
          <p className={styles.smallText}>
            {
              "L'avis du médecin sera visible sur la plateforme. Vous n'aurez pas besoin de l'ajouter en pièce justificative."
            }
          </p>
          <div className={styles.margedInfos}>
            {enfantTmp.dateConsultation && (
              <div>
                Date de rendez-vous :{" "}
                {frenchDateText(enfantTmp.dateConsultation)}
              </div>
            )}
            {[
              { label: "Avis médical", value: "AVIS_MEDICAL" },
              { label: "Bon de prise en charge", value: "BON_PRISE_EN_CHARGE" },
              {
                label: "Autorisation de prise en charge",
                value: "AUTORISATION_PRISE_EN_CHARGE",
              },
            ].map((justif) => (
              <>
                {enfantTmp.typeConsultation === "THALIE" &&
                  enfantTmp.piecesDossier.filter((doc) => {
                    return doc.type === justif.value;
                  }).length > 0 && (
                    <>
                      <div className={styles.docPushed}>
                        <InputFile
                          id={justif.value as JustificatifEnfant}
                          docs={enfantTmp.piecesDossier || []}
                          docsTokenized={contextDossier.docs.enfants.find(
                            (enfant) => enfant.id === enfantTmp.id
                          )}
                          allowChanges={true}
                          label={justif.label}
                          handleFile={handleFile}
                          handleDelete={handleDelete}
                          text={``}
                        />
                      </div>
                      <br />
                    </>
                  )}
              </>
            ))}
          </div>
        </label>
        <label className={styles.radioMedecine}>
          <input
            type="radio"
            value="Male"
            checked={enfantTmp.typeConsultation === "GENERALISTE"}
            onChange={() => {
              setEnfant({ ...enfantTmp, typeConsultation: "GENERALISTE" });
            }}
          />
          Un médecin généraliste
          <p className={styles.smallText}>
            {
              "Après avoir reçu l'avis médical d'aptitude, vous devrez l'ajoouter en pièce justificative."
            }
          </p>
        </label>
      </div>

      {enfantTmp.typeConsultation === "THALIE" && (
        <>
          <h5 className={styles.h5Spacer}>
            {"Informations de contact liées à l'enfant"}
          </h5>

          <div className={styles.byTwoForm}>
            <div className={styles.blocForm}>
              <label htmlFor="nomRepresentant1" className="mb-2 italic">
                Nom du représentant légal 1
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.nomRepresentant1 || ""}
                disabled={!allowChanges}
                type="text"
                id="nomRepresentant1"
                name="nomRepresentant1"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="nomRepresentant2" className="mb-2 italic">
                Nom du représentant légal 2
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.nomRepresentant2 || ""}
                disabled={!allowChanges}
                type="text"
                id="nomRepresentant2"
                name="nomRepresentant2"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="prenomRepresentant1" className="mb-2 italic">
                Prénom du représentant légal 1
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.prenomRepresentant1 || ""}
                disabled={!allowChanges}
                type="text"
                id="prenomRepresentant1"
                name="prenomRepresentant1"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="nomRepresentant2" className="mb-2 italic">
                Prénom du représentant légal 2
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.prenomRepresentant2 || ""}
                disabled={!allowChanges}
                type="text"
                id="prenomRepresentant2"
                name="prenomRepresentant2"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="adresseRepresentant1" className="mb-2 italic">
                Adresse du représentant légal 1
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.adresseRepresentant1 || ""}
                disabled={!allowChanges}
                type="text"
                id="adresseRepresentant1"
                name="adresseRepresentant1"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="adresseRepresentant2" className="mb-2 italic">
                Adresse du représentant légal 2
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.adresseRepresentant2 || ""}
                disabled={!allowChanges}
                type="text"
                id="adresseRepresentant2"
                name="adresseRepresentant2"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="mailRepresentant1" className="mb-2 italic">
                Email du représentant légal 1
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.mailRepresentant1 || ""}
                disabled={!allowChanges}
                type="text"
                id="mailRepresentant1"
                name="mailRepresentant1"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="mailRepresentant2" className="mb-2 italic">
                Email du représentant légal 2
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.mailRepresentant2 || ""}
                disabled={!allowChanges}
                type="text"
                id="mailRepresentant2"
                name="mailRepresentant2"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="telRepresentant1" className="mb-2 italic">
                Téléphone du représentant légal 1
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.telRepresentant1 || ""}
                disabled={!allowChanges}
                type="text"
                id="telRepresentant1"
                name="telRepresentant1"
                className="inputText"
              />
            </div>

            <div className={styles.blocForm}>
              <label htmlFor="telRepresentant2" className="mb-2 italic">
                Téléphone du représentant légal 2
              </label>
              <input
                onChange={handleFormEnfant}
                value={enfantTmp?.telRepresentant2 || ""}
                disabled={!allowChanges}
                type="text"
                id="telRepresentant2"
                name="telRepresentant2"
                className="inputText"
              />
            </div>
          </div>
          <br />
          <br />
        </>
      )}

      <h5 className={styles.h5Spacer}>
        {"Pièces justificatives liées à l'enfant"}
      </h5>

      <div className={styles.blocForm}>
        <InputFile
          id={"LIVRET_FAMILLE"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Livret de Famille`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`Ce document doit être à jour.`}
        />
      </div>

      <div className={styles.blocForm}>
        <InputFile
          id={"AUTORISATION_PARENTALE"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Autorisation parentale`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`En cas d'absence parentale pendant le temps de travail, les temps de repos et de trajet, le demandeur devra vérifier la moralité de la personne employée pour assurer la surveillance de l'enfant.`}
        />
      </div>

      <div className={styles.blocForm}>
        <InputFile
          id={"SITUATION_PARTICULIERE"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Situation particulière relative à l'autorité parentale`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`Veuillez fournir, le cas échéant, tout document justifiant d'une situation particulière relative à l'exercice de l'autorité parentale (retrait d'autorité parentale, tutelle, etc).`}
        />
      </div>

      <div className={styles.blocForm}>
        <InputFile
          id={"CONTRAT"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Projet de contrat de travail`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`Veuillez fournir un document présentant de manière précise et détaillée, le projet de contrat de travail.`}
        />
      </div>

      <div className={styles.blocForm}>
        <InputFile
          id={"CERTIFICAT_SCOLARITE"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Certificat de scolarité ou avis pédagogique`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`L'avis pédagogique est requis à partir de 4 jours d'absence scolaire.`}
        />
        <div className={styles.smallText}>
          Informations disponibles sur le site de{" "}
          <Link
            href="https://www.ac-paris.fr/scolarite-des-enfants-du-spectacle-123037 "
            target={"_blank"}
          >
            {`l'Académie de Paris`}
          </Link>
        </div>
      </div>
      {enfantTmp.typeConsultation !== "THALIE" ||
      (enfantTmp.typeConsultation === "THALIE" &&
        (enfantTmp.piecesDossier.filter((doc) => {
          return doc.type === "AUTORISATION_PRISE_EN_CHARGE";
        }).length > 0 ||
          enfantTmp.piecesDossier.filter((doc) => {
            return doc.type === "BON_PRISE_EN_CHARGE";
          }).length > 0)) ? (
        <div className={styles.blocForm}>
          <InputFile
            id={"AVIS_MEDICAL"}
            docs={enfantTmp.piecesDossier || []}
            docsTokenized={contextDossier.docs.enfants.find(
              (enfant) => enfant.id === enfantTmp.id
            )}
            allowChanges={!allowChanges}
            label={`Avis médical d'aptitude`}
            handleFile={handleFile}
            handleDelete={handleDelete}
            text={`Un avis d'un médecin du travail de Thalie Santé (à minima, veuillez fournir un document justifiant d'une prise de rendez-vous). Pour les figurants et les silhouettes, un avis d'un médecin généraliste (enfant à partir de 3 ans) ou d'un pédiatre (enfant de moins de 3 ans) est accepté.`}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.blocForm}>
        <InputFile
          id={"DECLARATION_HONNEUR"}
          docs={enfantTmp.piecesDossier || []}
          docsTokenized={contextDossier.docs.enfants.find(
            (enfant) => enfant.id === enfantTmp.id
          )}
          allowChanges={!allowChanges}
          label={`Déclaration sur l’honneur de l’enfant âgé de plus de 13 ans`}
          handleFile={handleFile}
          handleDelete={handleDelete}
          text={`Veuillez fournir un document présentant de manière précise et détaillée, la déclaration sur l’honneur de l’enfant âgé de plus de 13 ans.`}
        />
      </div>
      <InputComments
        title={"Commentaires liés à l'enfant"}
        dossierId={contextDossier.dossier.id}
        enfantId={enfantTmp.id}
        parentId={null}
      ></InputComments>
      <ListComments
        comments={contextDossier.comments.filter((comment) => {
          return comment.enfantId === enfantTmp.id;
        })}
      ></ListComments>
      <div
        style={{
          display: "flex",
          width: "100",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div className={styles.buttonDeleteBar}>
          <ButtonLink
            red
            onClick={() => {
              setShowDialogue(true);
            }}
          >
            Supprimer cet enfant
          </ButtonLink>
        </div>
        {showDialogue && (
          <div className={styles.confirmDialogueWrapper}>
            <div className={styles.confirmDialogue}>
              <div>Voulez-vous supprimer cet enfant ? </div>
              <div className={styles.btnList}>
                <ButtonLink
                  red
                  onClick={() => {
                    setShowDialogue(false);
                    handleDeleteChild();
                    contextDossier.processEntity("enfants", [
                      ...contextDossier.enfants.filter(
                        (enf) => enf.id !== enfantTmp.id
                      ),
                    ]);
                  }}
                >
                  Oui
                </ButtonLink>
                <ButtonLink
                  onClick={() => {
                    setShowDialogue(false);
                  }}
                >
                  Non
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnfantForm;
