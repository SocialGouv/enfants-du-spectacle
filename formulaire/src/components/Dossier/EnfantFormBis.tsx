import React, { useState } from "react";
import { EnfantData } from "src/fetching/dossiers";
import styles from "./DossierForm.module.scss";
import InputAutocomplete from "../uiComponents/InputAutocomplete";
import { createPieceEnfant, deletePieceEnfant } from "src/fetching/pieceEnfant";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  EnfantWithDosier,
  deleteEnfant,
  updateEnfant,
} from "src/fetching/enfant";
import {
  REMUNERATIONS,
  TYPE_EMPLOI,
  frenchDateText,
  useDebouncedCallback,
} from "src/lib/helpers";
import { Select } from "@dataesr/react-dsfr";
import {
  Enfant,
  JustificatifEnfant,
  NatureCachet,
  Remuneration,
} from "@prisma/client";
import {
  createRemuneration,
  deleteRemunerationById,
  deleteRemunerationsByEnfantId,
} from "src/fetching/remuneration";
import { BiTrash } from "react-icons/bi";
import { ButtonLink } from "src/uiComponents/button";
import InputFile from "../uiComponents/InputFile";
import useStateContext from "src/context/StateContext";
import { uploadDoc } from "src/fetching/docs";
import Link from "next/link";
import InputComments from "../uiComponents/inputComments";
import ListComments from "../ListComments";
import { useSession } from "next-auth/react";
import { getUsersById } from "src/fetching/users";

// Configuration des documents justificatifs
interface DocumentConfig {
  id: JustificatifEnfant;
  label: string;
  text: string;
  additionalInfo?: React.ReactNode;
}

const DOCUMENT_CONFIGS: DocumentConfig[] = [
  {
    id: "LIVRET_FAMILLE",
    label: "Livret de Famille",
    text: "Ce document doit être à jour.",
  },
  {
    id: "AUTORISATION_PARENTALE",
    label: "Autorisation parentale",
    text: "En cas d'absence parentale pendant le temps de travail, les temps de repos et de trajet, le demandeur devra vérifier la moralité de la personne employée pour assurer la surveillance de l'enfant.",
  },
  {
    id: "SITUATION_PARTICULIERE",
    label: "Situation particulière relative à l'autorité parentale",
    text: "Veuillez fournir, le cas échéant, tout document justifiant d'une situation particulière relative à l'exercice de l'autorité parentale (retrait d'autorité parentale, tutelle, etc).",
  },
  {
    id: "CONTRAT",
    label: "Projet de contrat de travail",
    text: "Veuillez fournir un document présentant de manière précise et détaillée, le projet de contrat de travail.",
  },
  {
    id: "CERTIFICAT_SCOLARITE",
    label: "Certificat de scolarité",
    text: "L'avis pédagogique est requis à partir de 4 jours d'absence scolaire.",
    additionalInfo: (
      <div className={styles.smallText}>
        Informations disponibles sur le site de{" "}
        <Link
          href="https://www.ac-paris.fr/scolarite-des-enfants-du-spectacle-123037 "
          target={"_blank"}
        >
          l'Académie de Paris
        </Link>
      </div>
    ),
  },
  {
    id: "AVIS_PEDAGOGIQUE_1ER_DEGRE",
    label: "Avis pédagogique 1er degré",
    text: "",
  },
  {
    id: "AVIS_PEDAGOGIQUE_2ND_DEGRE",
    label: "Avis pédagogie 2nd degré",
    text: "",
  },
  {
    id: "AVIS_DASEN",
    label: "Avis DASEN",
    text: "",
    additionalInfo: (
      <div className={styles.smallText}>
        Pour les avis DASEN, vous pouvez vous référer à cet annuaire :
        <Link href="https://mon-administration.com/dsden/" target={"_blank"}>
          https://mon-administration.com/dsden/
        </Link>
      </div>
    ),
  },
  {
    id: "DECLARATION_HONNEUR",
    label: "Déclaration sur l'honneur de l'enfant âgé de plus de 13 ans",
    text: "Veuillez fournir un document présentant de manière précise et détaillée, la déclaration sur l'honneur de l'enfant âgé de plus de 13 ans.",
  },
];

// Composant pour rendre un document
interface DocumentInputProps {
  config: DocumentConfig;
  enfantTmp: EnfantData;
  contextDossier: any;
  allowChanges: boolean;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: string) => void;
}

const DocumentInput: React.FC<DocumentInputProps> = ({
  config,
  enfantTmp,
  contextDossier,
  allowChanges,
  handleFile,
  handleDelete,
}) => (
  <div className={styles.blocForm}>
    <InputFile
      id={config.id}
      docs={enfantTmp.piecesDossier || []}
      docsTokenized={contextDossier.docs.enfants.find(
        (enf: any) => enf.id === enfantTmp.id
      )}
      allowChanges={!allowChanges}
      label={config.label}
      handleFile={handleFile}
      handleDelete={handleDelete}
      text={config.text}
    />
    {config.additionalInfo}
  </div>
);

interface Props {
  enfant: EnfantData;
  allowChanges: Boolean;
  refresh: (enfant: EnfantData) => void;
  listDelete: (enfant: EnfantData) => void;
}

const EnfantFormBis: React.FC<Props> = ({
  enfant,
  allowChanges,
  refresh,
  listDelete,
}) => {
  const [enfantTmp, setEnfant] = useState<EnfantData>(enfant);
  const { data: session } = useSession();
  const [dataPassed, setDataPassed] =
    React.useState<Record<"nom" | "prenom", string>>();
  const [initialDataPassed, setInitialDataPassed] =
    React.useState<Boolean>(true);
  const [showDialogue, setShowDialogue] = React.useState<Boolean>(false);
  const [defaultTypeRemuneration, setDefaultTypeRemuneration] = React.useState<
    string | null
  >(null);
  const [remunerationList, setRemunerationList] = useState<Remuneration[]>([]);
  const [totalRemuneration, setTotalRemuneration] = useState<
    number | undefined
  >(0);
  const contextDossier = { ...useStateContext() };

  const [senderComment, setSenderComment] = React.useState<string>("");

  const fetchUser = async () => {
    if (session) {
      const users = await getUsersById([session.dbUser.id]);
      const responseUser = users[0] || {};
      if (responseUser && responseUser.email) {
        setSenderComment(responseUser.email);
      }
    }
  };

  const handleSelect = (enfant: EnfantWithDosier) => {
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

  const handleDateEnfant = (wichDate: string, date: Date): void => {
    setEnfant({
      ...enfantTmp,
      [wichDate]: date,
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.select();
  };

  const handleFormEnfant = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    setEnfant({
      ...enfantTmp,
      [target.id]: target.value,
    });
  };

  React.useEffect(() => {
    saveEnfant();
  }, [enfantTmp]);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const saveEnfant = useDebouncedCallback(() => {
    updateEnfant(enfantTmp);
    refresh(enfantTmp);
  }, 1000);

  React.useEffect(() => {
    setEnfant(enfant);
    setRemunerationList(enfant.remuneration ?? []);
  }, [enfant]);

  const handleDeleteChild = async () => {
    listDelete(enfant);
    await deleteEnfant(enfant.id);
    setShowDialogue(false);
  };

  React.useEffect(() => {
    if (enfant.remuneration && enfant.remuneration.length) {
      const hasForfait = enfant.remuneration.some(
        (remuneration) => remuneration.typeRemuneration === "forfait"
      );
      if (hasForfait) {
        setDefaultTypeRemuneration("forfait");
      } else {
        setDefaultTypeRemuneration("cachet");
      }

      // Mettre l'objet "forfait" en première position du tableau
      const sortedRemunerations = [...enfant.remuneration].sort((a, b) => {
        if (a.typeRemuneration === "forfait") return -1;
        if (b.typeRemuneration === "forfait") return 1;
        return 0;
      });

      setRemunerationList(sortedRemunerations);
    }
  }, []);

  const handleRemunerationChange = (
    index: number,
    field: keyof Remuneration,
    value: string | number | null
  ) => {
    const updatedRemunerations = [...remunerationList];
    (updatedRemunerations[index] as any)[field] = value;
    setRemunerationList(updatedRemunerations);
    setEnfant({ ...enfantTmp, remuneration: updatedRemunerations });
  };

  const addCachet = async (value?: string) => {
    const newRemuneration = {
      typeRemuneration: value === "forfait" ? "forfait" : "cachet",
      natureCachet: null,
      autreNatureCachet: null,
      montant: null,
      nombre: null,
      nombreLignes: null,
      totalDadr: null,
      comment: null,
      enfantId: enfantTmp.id,
    } as Remuneration;

    const resRemuneration = await createRemuneration(newRemuneration);

    setEnfant((enfant) => ({
      ...enfant,
      remuneration: [...enfant.remuneration, resRemuneration],
    }));

    setRemunerationList((prevRemunerationList) => [
      ...prevRemunerationList,
      resRemuneration,
    ]);
  };
  const handleDeleteRemuneration = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setDefaultTypeRemuneration(selectedValue);
    deleteAllRemunerations(selectedValue);
  };

  const deleteAllRemunerations = async (value: string) => {
    setEnfant({
      ...enfantTmp,
      remuneration: [],
    });
    setRemunerationList([]);

    await deleteRemunerationsByEnfantId(enfant.id);
    if (value === "forfait" || value === "cachet") await addCachet(value);
  };

  const deleteRemuneration = async (index: number, remunerationId: number) => {
    await deleteRemunerationById(remunerationId);

    setRemunerationList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });

    setEnfant((prevEnfant) => {
      const updatedRemuneration = prevEnfant.remuneration.filter(
        (remuneration) => remuneration.id !== remunerationId
      );

      return {
        ...prevEnfant,
        remuneration: updatedRemuneration,
      };
    });

    if (remunerationList.length === 0) setDefaultTypeRemuneration(null);
  };

  const selectTypeRemunerationValue = (): string => {
    if (remunerationList.length > 0) {
      if (
        remunerationList.some(
          (remuneration) => remuneration.typeRemuneration === "forfait"
        )
      ) {
        return "forfait";
      } else {
        return "cachet";
      }
    } else return "";
  };

  const handleTotalRemuneration = () => {
    const total = remunerationList.reduce((acc, obj) => {
      const montant = obj.montant ? obj.montant : 0;
      const nombre = obj.nombre ? obj.nombre : 1;
      const totalDadr = obj.totalDadr
        ? parseFloat(obj.totalDadr.toString())
        : 0;

      const calculatedValue = montant * nombre + totalDadr;
      return acc + calculatedValue;
    }, 0);
    setTotalRemuneration(total);
  };

  React.useEffect(() => {
    handleTotalRemuneration();
  }, [remunerationList]);

  interface Option {
    label: string;
    value: string;
    disabled?: boolean;
  }

  const defaultValue: Option = {
    label: "Sélectionner",
    value: "",
  };

  const options: Option[] = [
    defaultValue,
    {
      label: "Rémunérations garanties",
      value: "",
      disabled: true,
    },
    ...(REMUNERATIONS.find(
      (group) => Object.keys(group)[0] === "Rémunérations garanties"
    )?.["Rémunérations garanties"] ?? []),
    {
      label: "Rémunérations additionnelles",
      value: "",
      disabled: true,
    },
    ...(REMUNERATIONS.find(
      (group) => Object.keys(group)[0] === "Rémunérations additionnelles"
    )?.["Rémunérations additionnelles"] ?? []),
  ];

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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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
        createdAt: new Date(),
        updatedAt: new Date()
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
            ...(contextDossier.docs.enfants.find(
              (enf) => enf.id === enfantTmp.id
            )?.piecesDossier ?? []),
            res.tokenizedLink,
          ],
        },
        ...contextDossier.docs.enfants.filter(
          (docEnfant) => docEnfant.id !== enfantTmp.id
        ),
      ]);
    }
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
            checked={enfantTmp.checkTravailNuit ?? false}
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
              Préciser le nombre de nuits de travail et les horaires associés.
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
      <div
        className={styles.blocForm}
        style={{
          marginBottom: "20px",
          maxWidth: "18rem",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            maxWidth: "15rem",
          }}
          className={`${styles.inputItem}`}
        >
          <label htmlFor="typeRemuneration" className={styles.inputLabel}>
            Type de rémunérations *
          </label>
          <Select
            id="typeRemuneration"
            selected={selectTypeRemunerationValue()}
            options={[
              defaultValue,
              { label: "Cachet", value: "cachet" },
              { label: "Forfait", value: "forfait" },
            ]}
            onChange={handleDeleteRemuneration}
          />
        </div>
      </div>
      {remunerationList.length > 0 && (
        <div
          className={styles.byThreeForm}
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          {remunerationList.map((rem, index) => (
            <div className={styles.blocForm} key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "flex-start",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                {rem.typeRemuneration === "cachet" && (
                  <div>
                    <label htmlFor="natureCachet" className="mb-2 italic">
                      Nature du cachet *
                    </label>
                    <Select
                      id="natureCachet"
                      selected={
                        remunerationList[index].natureCachet ??
                        defaultValue.value
                      }
                      options={options}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        const updatedRemunerations = [...remunerationList];
                        const natureCachetValue = (e.target as HTMLInputElement)
                          .value;
                        const natureCachet: NatureCachet | null =
                          natureCachetValue !== ""
                            ? (natureCachetValue as NatureCachet)
                            : null;
                        updatedRemunerations[index] = {
                          ...updatedRemunerations[index],
                          nombreLignes: null,
                          totalDadr: null,
                          autreNatureCachet: null,
                          comment: null,
                          natureCachet: natureCachet,
                        };
                        setRemunerationList(updatedRemunerations);
                        setEnfant({
                          ...enfantTmp,
                          remuneration: updatedRemunerations,
                        });
                      }}
                    />
                  </div>
                )}
                {rem.typeRemuneration !== null && (
                  <>
                    {(rem.natureCachet === "AUTRE_GARANTIE" ||
                      rem.natureCachet === "AUTRE_ADDITIONNELLE") && (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <label
                            htmlFor="autreNatureCachet"
                            className="mb-2 italic"
                          >
                            Nom du cachet *
                          </label>
                          <input
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                              handleRemunerationChange(
                                index,
                                "autreNatureCachet",
                                e.currentTarget.value
                              )
                            }
                            value={
                              remunerationList[index]?.autreNatureCachet ?? ""
                            }
                            disabled={!allowChanges}
                            type="text"
                            lang="en-US"
                            id="autreNatureCachet"
                            name="autreNatureCachet"
                            className="inputText"
                            onFocus={(
                              e: React.FocusEvent<HTMLInputElement, Element>
                            ) => handleFocus(e)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="commentaireCachet"
                            className="mb-2 italic"
                          >
                            Commentaire
                          </label>
                          <input
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                              handleRemunerationChange(
                                index,
                                "comment",
                                e.currentTarget.value
                              )
                            }
                            value={remunerationList[index]?.comment ?? ""}
                            disabled={!allowChanges}
                            type="text"
                            lang="en-US"
                            id="commentaireCachet"
                            name="commentaireCachet"
                            className="inputText"
                            onFocus={(
                              e: React.FocusEvent<HTMLInputElement, Element>
                            ) => handleFocus(e)}
                          />
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "flex-start",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <label htmlFor="montant" className="mb-2 italic">
                          Montant du{" "}
                          {rem.typeRemuneration === "cachet"
                            ? "cachet"
                            : "forfait"}{" "}
                          *
                        </label>
                        <input
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            handleRemunerationChange(
                              index,
                              "montant",
                              parseFloat(e.currentTarget.value)
                            )
                          }
                          value={remunerationList[index]?.montant ?? ""}
                          disabled={!allowChanges}
                          type="number"
                          min="0"
                          step="0.01"
                          lang="en-US"
                          id="montant"
                          name="montant"
                          className="inputText"
                          onFocus={(
                            e: React.FocusEvent<HTMLInputElement, Element>
                          ) => handleFocus(e)}
                        />
                      </div>
                      <div>
                        <label htmlFor="nombre" className="mb-2 italic">
                          Nombre de{" "}
                          {rem.typeRemuneration === "cachet"
                            ? "cachet"
                            : "forfait"}{" "}
                          *
                        </label>
                        <input
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            handleRemunerationChange(
                              index,
                              "nombre",
                              parseInt(e.currentTarget.value)
                            )
                          }
                          value={remunerationList[index]?.nombre ?? ""}
                          disabled={!allowChanges}
                          type="number"
                          min="0"
                          id="nombre"
                          name="nombre"
                          className="inputText"
                          onFocus={(
                            e: React.FocusEvent<HTMLInputElement, Element>
                          ) => handleFocus(e)}
                        />
                      </div>
                    </div>
                  </>
                )}
                {rem.natureCachet === "CACHET_DOUBLAGE" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <label htmlFor="nombreLignes" className="mb-2 italic">
                        Nombre de lignes *
                      </label>
                      <input
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                          handleRemunerationChange(
                            index,
                            "nombreLignes",
                            parseInt(e.currentTarget.value)
                          )
                        }
                        value={remunerationList[index]?.nombreLignes ?? ""}
                        disabled={!allowChanges}
                        type="number"
                        min="0"
                        step="0.01"
                        lang="en-US"
                        id="nombreLignes"
                        name="nombreLignes"
                        className="inputText"
                        onFocus={(
                          e: React.FocusEvent<HTMLInputElement, Element>
                        ) => handleFocus(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor="totalDadr" className="mb-2 italic">
                        Montant total DADR *
                      </label>
                      <input
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                          handleRemunerationChange(
                            index,
                            "totalDadr",
                            parseFloat(e.currentTarget.value)
                          )
                        }
                        value={remunerationList[index]?.totalDadr ?? ""}
                        disabled={!allowChanges}
                        type="number"
                        min="0"
                        step="0.01"
                        lang="en-US"
                        id="totalDadr"
                        name="totalDadr"
                        className="inputText"
                        onFocus={(
                          e: React.FocusEvent<HTMLInputElement, Element>
                        ) => handleFocus(e)}
                      />
                    </div>
                  </div>
                )}
                <BiTrash
                  className={styles.closeBtn}
                  size={18}
                  onClick={() => deleteRemuneration(index, rem.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {remunerationList.length ? (
        <div>
          <div className={styles.addCachetBtn}>
            <ButtonLink light={true} onClick={addCachet}>
              Ajouter un cachet{" "}
              {defaultTypeRemuneration === "forfait" ? "isolé" : ""}
            </ButtonLink>
          </div>
          <div className={styles.halfForm}>
            <div className={styles.addCachetBtn}>
              <label htmlFor="remunerationTotale" className="mb-2 italic">
                Rémunération totale (€)
              </label>
              <input
                value={totalRemuneration}
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
        </div>
      ) : (
        ""
      )}

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
            L’avis médical sera visible sur la plateforme, Thalie Santé le
            chargera directement sur la plateforme pour vous le transmettre.
            <br /> Dans le cas où l’enfant est en région, ils vous transmettrons
            via la plateforme un bon de prise en charge, vous trouverez le
            centre à solliciter avec votre bon de prise en charge à ce lien{" "}
            <a
              href="https://thalie-sante.org/nos-centres-partenaires-en-region"
              target="blank"
            >
              https://thalie-sante.org/nos-centres-partenaires-en-region
            </a>
            . <br />
            Dans le cas où vous disposez d’une dérogation pour un 2nd rôle, ils
            vous transmettront un bon de prise en charge par un médecin traitant
            via la plateforme.
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
              "Après avoir reçu l'avis médical d'aptitude, vous devrez l'ajouter en pièce justificative."
            }
          </p>
        </label>
      </div>

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

      <h5 className={styles.h5Spacer}>
        {"Pièces justificatives liées à l'enfant"}
      </h5>
      {DOCUMENT_CONFIGS.map((config) => (
        <DocumentInput
          key={config.id}
          config={config}
          enfantTmp={enfantTmp}
          contextDossier={contextDossier}
          allowChanges={allowChanges}
          handleFile={handleFile}
          handleDelete={handleDelete}
        />
      ))}
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
        sender={senderComment}
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
            disabled={
              contextDossier.dossier.statut !== "BROUILLON" &&
              contextDossier.dossier.statut !== "CONSTRUCTION"
            }
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

export default EnfantFormBis;
