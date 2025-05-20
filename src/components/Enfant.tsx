import "react-datepicker/dist/react-datepicker.css";

import type {
  Dossier,
  Enfant,
  JustificatifEnfant,
  PieceDossierEnfant,
  User,
} from "@prisma/client";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import styles from "src/components/Enfant.module.scss";
import Info from "src/components/Info";
import { EnfantJustificatifs } from "src/components/DossierJustificatifs";
import type { Comments } from "src/lib/fetching/comments";
import { deleteDoc, uploadDoc } from "src/lib/fetching/docs";
import { passEnfant } from "src/lib/fetching/enfants";
import {
  INFOS_REPRESENTANTS,
  REMUNERATIONS,
  TYPE_CONSULTATION_MEDECIN,
} from "src/lib/helpers";
import { updateCommentairesNotifications, updateEnfant } from "src/lib/queries";
import type { DataLinks, Remuneration } from "src/lib/types";

import Accordion from "./Accordion";
import InputComments from "./inputComments";
import ListComments from "./ListComments";
import InputFile from "./uiComponents/InputFile";

interface Props {
  enfant: Enfant;
  dataLinks: DataLinks;
  dossier: Dossier & { 
    docs?: {
      dossier: {
        id: number;
        piecesDossier: any[];
      };
      enfants: Array<{
        id: number;
        piecesDossier: any[];
      }>;
    } 
  };
  comments: Comments[];
  sender: string | null;
  actionComments: (comment: Comments) => void;
  remunerations: Remuneration[];
}

const EnfantComponent: React.FC<Props> = ({
  enfant,
  dataLinks,
  dossier,
  comments,
  actionComments,
  remunerations,
  sender,
}) => {
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);
  const session = useSession();
  const [localDataLinks, setLocalDataLinks] =
    React.useState<DataLinks>(dataLinks);
  
  // Debug logs to help diagnose file visibility issues
  useEffect(() => {
    console.log("Current enfant:", enfant);
    console.log("Current enfant externalId:", enfant.externalId);
    console.log("localDataLinks:", localDataLinks);
    
    const matchingEnfant = localDataLinks?.enfants?.find(
      (enf) => enf.id === (enfant.externalId ? parseInt(enfant.externalId) : enfant.id)
    );
    console.log("Matching enfant found:", matchingEnfant);
    
    if (matchingEnfant) {
      console.log("Matching enfant piecesDossier:", matchingEnfant.piecesDossier);
      
      const filteredPieces = matchingEnfant.piecesDossier.filter((piece) =>
        ["AVIS_MEDICAL", "BON_PRISE_EN_CHARGE", "AUTORISATION_PRISE_EN_CHARGE"].includes(piece.type)
      );
      console.log("Filtered pieces:", filteredPieces);
    }
  }, [enfant, localDataLinks]);

  const nombreDeLignes = remunerations.find(
    (remuneration) => remuneration.nombreLignes
  )?.nombreLignes;

  const RemunerationsDetails: React.FC<{
    remuneration: Remuneration;
    matchingLabel: string | undefined;
  }> = ({ remuneration, matchingLabel }): JSX.Element => {
    const montant = remuneration.montant ?? 0;
    const nombre = remuneration.nombre ?? 0;
    const total = montant * nombre;
    const formattedTotal = Number.isInteger(total)
      ? total.toString()
      : total.toFixed(2);

    return (
      <div>
        <span
          className={
            matchingLabel === "Forfait" ? styles.remunerationTitle : ""
          }
        >
          {matchingLabel}:{" "}
        </span>
        <span style={{ fontWeight: "bold" }}>{formattedTotal}€</span>{" "}
        {`(${nombre} ${nombre > 1 ? "cachets" : "cachet"} de ${montant}€) ${
          remuneration.comment ? `- ${remuneration.comment}` : ""
        }`}
        {remuneration.totalDadr && (
          <ul style={{ padding: 0 }}>
            <li>
              Montant total DADR:{" "}
              <span style={{ fontWeight: "bold" }}>
                {remuneration.totalDadr}€
              </span>
            </li>
          </ul>
        )}
      </div>
    );
  };

  const RemunerationsList: React.FC = () => {
    const remunerationForfait = remunerations.find(
      (rem) => rem.typeRemuneration === "forfait"
    );

    const hasAdditionalRemunerations: boolean = remunerations.some(
      (remuneration) =>
        REMUNERATIONS.some((category) => {
          const additionalRemunerations =
            category["Rémunérations additionnelles"];
          return additionalRemunerations?.some(
            (item) => item.value === remuneration.natureCachet
          );
        })
    );
    const hasGuaranteeRemunerations: boolean = remunerations.some(
      (remuneration) =>
        REMUNERATIONS.some((category) => {
          const guaranteeRemunerations = category["Rémunérations garanties"];
          return guaranteeRemunerations?.some(
            (item) => item.value === remuneration.natureCachet
          );
        })
    );
    return (
      <div className={styles.remunerationBloc}>
        {remunerationForfait && (
          <div style={{ paddingBottom: "20px" }}>
            <RemunerationsDetails
              remuneration={remunerationForfait}
              matchingLabel={"Forfait"}
            />
          </div>
        )}
        <div style={{ paddingBottom: "20px" }}>
          <div className={styles.remunerationTitle}>
            Rémunérations garanties
          </div>
          {hasGuaranteeRemunerations ? (
            <div>
              {remunerations.map((remuneration) => {
                const matchingLabelGuarantee = REMUNERATIONS.flatMap(
                  (category) => category["Rémunérations garanties"]
                ).find(
                  (item) => item?.value === remuneration.natureCachet
                )?.label;
                return (
                  <div key={remuneration.id}>
                    {matchingLabelGuarantee && (
                      <ul>
                        {remuneration.typeRemuneration === "cachet" && (
                          <li>
                            <RemunerationsDetails
                              remuneration={remuneration}
                              matchingLabel={
                                remuneration.autreNatureCachet
                                  ? remuneration.autreNatureCachet
                                  : matchingLabelGuarantee
                              }
                            />
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Pas de rémunérations garanties</div>
          )}
        </div>
        <div className={styles.remunerationTitle}>
          Rémunérations additionnelles
        </div>
        {hasAdditionalRemunerations ? (
          <div>
            {remunerations.map((remuneration) => {
              const matchingLabelMore = REMUNERATIONS.flatMap(
                (category) => category["Rémunérations additionnelles"]
              ).find(
                (item) => item?.value === remuneration.natureCachet
              )?.label;
              return (
                <div key={remuneration.id}>
                  {matchingLabelMore && (
                    <ul>
                      {remuneration.typeRemuneration === "cachet" && (
                        <li>
                          <RemunerationsDetails
                            remuneration={remuneration}
                            matchingLabel={
                              remuneration.autreNatureCachet
                                ? remuneration.autreNatureCachet
                                : matchingLabelMore
                            }
                          />
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>Pas de rémunérations additionnelles</div>
        )}
      </div>
    );
  };

  const totalRemunerations = () => {
    const total = remunerations.reduce((acc, obj) => {
      const montant = obj.montant ? obj.montant : 0;
      const nombre = obj.nombre ? obj.nombre : 1;
      const totalDadr = obj.totalDadr
        ? parseFloat(obj.totalDadr.toString())
        : 0;

      const calculatedValue = montant * nombre + totalDadr;
      return acc + calculatedValue;
    }, 0);
    return total.toFixed(2);
  };

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.currentTarget.value !== "" ? e.currentTarget.value : null,
    });
  };

  const handleDate = (wichDate: string, date: Date): void => {
    setFormData({
      ...formData,
      [wichDate]: date,
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();
    data.append(e.target.name, e.target.files[0]);
    const upload = await uploadDoc(
      data,
      dossier.id,
      enfant.id,
      TYPE_CONSULTATION_MEDECIN.find(
        (type) => type.value === formData.typeConsultationMedecin
      )?.typeJustif
    );

    setFormData({
      ...formData,
      ["justificatifs"]: [
        ...formData.justificatifs,
        TYPE_CONSULTATION_MEDECIN.find(
          (type) => type.value === formData.typeConsultationMedecin
        )?.typeJustif!,
      ],
    });
  };

  const handleDelete = async (id: number) => {
    console.log('id : ', id)
    if (id) {
      await deleteDoc(id);
      window.location.reload()
      /*setLocalDataLinks((prevData) => {
        const updatedData = prevData.enfants.map((enfant) => {
          const piecesFiltered = enfant.piecesDossier.filter(
            (piece: PieceDossierEnfant) => piece.id !== parseInt(id)
          );
          enfant.piecesDossier = piecesFiltered;
          return enfant;
        });
        return { ...prevData, enfants: updatedData };
      });*/
    }
  };

  useEffect(() => {
    if (mountedRef) {
      lauchUpdate(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (mountedRef) {
      passEnfant(formData);
    }
  }, [formData.dateConsultation]);

  useEffect(() => {
    setMountedRef(true);
  });

  // State to store enfant-specific comments
  const [enfantComments, setEnfantComments] = React.useState<Comments[]>([]);

  // Fetch comments specific to this enfant
  const fetchEnfantComments = async () => {
    try {
      if (dossier?.id) {
        const response = await fetch(`/api/dossier-comments/${dossier.id}?enfantId=${enfant.id}`);
        if (!response.ok) {
          throw new Error(`Error fetching enfant comments: ${response.status}`);
        }
        const commentsData = await response.json();
        console.log("Fetched enfant comments:", commentsData);
        setEnfantComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching enfant comments:", error);
      setEnfantComments([]);
    }
  };

  // Process new comments from the input component
  const processEnfantComment = (comment: Comments) => {
    setEnfantComments([comment, ...enfantComments]);
  };

  // Mark comments as seen
  const updateComments = () => {
    const commentsChildrenIds: string[] = enfantComments
      .filter(
        (comment) =>
          comment.enfantId === enfant.id &&
          comment.source === "SOCIETE_PROD"
      )
      .map((com) => JSON.stringify(com.id));
    if (commentsChildrenIds.length)
      updateCommentairesNotifications(commentsChildrenIds);
  };

  // Fetch enfant comments when component mounts
  React.useEffect(() => {
    fetchEnfantComments();
  }, [dossier?.id, enfant?.id]);

  const lauchUpdate = useCallback(
    _.debounce((enfantToUpdate: Enfant) => {
      updateEnfant(enfantToUpdate);
    }, 1000),
    []
  );

  return (
    <div>
      <Accordion
        title="Afficher plus d'informations"
        className="accordionSmallText"
      >
        <div className={styles.wrapperFoldable}>
          <Info title="Rémunération" className={styles.info}>
            {remunerations.length > 0 ? (
              <div>
                <RemunerationsList />
                Total: <b>{totalRemunerations()}€</b>
              </div>
            ) : (
              <div>Pas de rémunérations</div>
            )}
          </Info>
          <Info title="Conditions de travail" className={styles.info}>
            <div>
              Nombre de jours travaillés :{" "}
              <b>{enfant.nombreJours ? enfant.nombreJours : <i>n/a</i>}</b>
            </div>
            <div>
              Nombre de lignes :{" "}
              <b>{nombreDeLignes ? nombreDeLignes : <i>n/a</i>}</b>
            </div>
            <div>
              Période :{" "}
              {enfant.periodeTravail ? enfant.periodeTravail : <i>n/a</i>}
            </div>
            <div>
              Temps et lieu de travail :{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: enfant.contexteTravail
                    ? enfant.contexteTravail.replace(/\n/g, "<br />")
                    : "n/a",
                }}
              />
            </div>
            <div>
              {enfant.checkTravailNuit && (
                <>
                  Travail de nuit :{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: enfant.textTravailNuit
                        ? enfant.textTravailNuit.replace(/\n/g, "<br />")
                        : "n/a",
                    }}
                  />
                </>
              )}
            </div>
          </Info>

          <Info title="Pièces justificatives & Validation" className={styles.info}>
            {dossier.source === "FORM_EDS" && (
              <EnfantJustificatifs
                enfant={enfant}
                dossier={dossier}
                showValidation={(session.data?.dbUser.role === "INSTRUCTEUR" ||
                  session.data?.dbUser.role === "ADMIN")}
              />
            )}
          </Info>
        </div>
      </Accordion>
      <Accordion
        title={"Commentaires"}
        className="accordionSmallText"
        type="commentChildren"
        updateComments={updateComments}
      >
        {dossier.source === "FORM_EDS" && (
          <>
            <InputComments
              dossierId={dossier.id}
              enfantId={enfant.id}
              sender={sender}
              parentId={null}
              action={processEnfantComment}
            />
            <ListComments
              comments={enfantComments}
            />
          </>
        )}
      </Accordion>

      <Accordion
        title="Afficher les informations des représentants légaux"
        className="accordionSmallText"
      >
        <div className={styles.adressesGrid}>
          <form
            className={styles.Form}
            onSubmit={(e) => {
              e.currentTarget.value = "";
            }}
          >
            {INFOS_REPRESENTANTS.map((col) => (
              <Info title={col.col} className={styles.info} key={col.col}>
                {col.rows.map((row) => (
                  <div className={styles.inputAdresse} key={row.value}>
                    <label htmlFor={row.value} className="mb-2 italic">
                      {row.label}
                    </label>
                    <input
                      onChange={(e) => {
                        handleForm(e);
                      }}
                      disabled={true}
                      type="text"
                      id={row.value}
                      name={row.value}
                      className="inputText"
                      value={formData[row.value] ? formData[row.value] : ""}
                    />
                  </div>
                ))}
              </Info>
            ))}
          </form>
        </div>
      </Accordion>

      {(session.data?.dbUser as User).role === "MEDECIN" && (
        <Accordion
          title={"Avis médical "}
          className="accordionSmallText"
          type="commentChildren"
        >
          <div className={styles.avisMedicalGrid}>
            <Info title="Type de consultation">
              {TYPE_CONSULTATION_MEDECIN.map((typeConsult) => (
                <label className={styles.radioMedecine} key={typeConsult.value}>
                  <input
                    type="radio"
                    value="Male"
                    id="typeConsultationMedecin"
                    checked={
                      formData.typeConsultationMedecin === typeConsult.value
                    }
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        ["typeConsultationMedecin"]: typeConsult.value,
                      });
                    }}
                  />
                  <span>{typeConsult.label}</span>
                </label>
              ))}
            </Info>

            {formData.typeConsultationMedecin !== null && (
              <Info
                title={
                  TYPE_CONSULTATION_MEDECIN.find(
                    (type) => type.value === formData.typeConsultationMedecin
                  )?.labelCol2.toUpperCase() ?? ""
                }
              >
                {formData.typeConsultationMedecin === "PHYSIQUE" && (
                  <>
                    <label htmlFor="dateLimiteDepot" className="mb-2 italic">
                      Date du rdv
                    </label>
                    <div className={styles.datePickerWrapper}>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={formData.dateConsultation}
                        className="inputText"
                        onChange={(date: Date) => {
                          handleDate("dateConsultation", date);
                        }}
                      />
                    </div>
                  </>
                )}
                {formData.typeConsultationMedecin !== "PHYSIQUE" && (
                  <>
                    <InputFile
                      id={`${
                        TYPE_CONSULTATION_MEDECIN.find(
                          (type) =>
                            type.value === formData.typeConsultationMedecin
                        )?.typeJustif as JustificatifEnfant
                      }`}
                      docs={(() => {
                        const matchingEnfant = dossier.docs?.enfants
                          .find(e => e.id === (enfant.externalId ? parseInt(enfant.externalId) : enfant.id));
                        
                        console.log("Matching enfant for docs (1):", matchingEnfant);
                        
                        if (!matchingEnfant) return [];
                        
                        const filteredDocs = matchingEnfant.piecesDossier
                          .filter(piece => [
                            "AVIS_MEDICAL", 
                            "BON_PRISE_EN_CHARGE", 
                            "AUTORISATION_PRISE_EN_CHARGE"
                          ].includes(piece.type))
                          .map(piece => ({
                            id: String(piece.id),
                            nom: piece.nom || piece.type.replace(/_/g, ' ').toLowerCase(),
                            type: piece.type,
                            statut: piece.statut,
                            link: piece.link
                          }));
                          
                        console.log("Filtered docs (1):", filteredDocs);
                        return filteredDocs;
                      })()}
                      allowChanges={false}
                      label={`${
                        TYPE_CONSULTATION_MEDECIN.find(
                          (type) =>
                            type.value === formData.typeConsultationMedecin
                        )?.labelCol2
                      }`}
                      handleFile={handleFile}
                      handleDelete={handleDelete}
                      text={``}
                    />
                  </>
                )}
              </Info>
            )}

            {formData.typeConsultationMedecin === "PHYSIQUE" &&
              formData.dateConsultation && (
                <Info title="AVIS MÉDICAL">
                  <InputFile
                    id={"AVIS_MEDICAL"}
                    docs={(() => {
                        const matchingEnfant = dossier.docs?.enfants
                          .find(e => e.id === (enfant.externalId ? parseInt(enfant.externalId) : enfant.id));
                        
                        console.log("Matching enfant for docs (2):", matchingEnfant);
                        
                        if (!matchingEnfant) return [];
                        
                        const filteredDocs = matchingEnfant.piecesDossier
                          .filter(piece => [
                            "AVIS_MEDICAL", 
                            "BON_PRISE_EN_CHARGE", 
                            "AUTORISATION_PRISE_EN_CHARGE"
                          ].includes(piece.type))
                          .map(piece => ({
                            id: String(piece.id),
                            nom: piece.nom || piece.type.replace(/_/g, ' ').toLowerCase(),
                            type: piece.type,
                            statut: piece.statut,
                            link: piece.link
                          }));
                          
                        console.log("Filtered docs (2):", filteredDocs);
                        return filteredDocs;
                      })()}
                    allowChanges={true}
                    label={`Avis médical`}
                    handleFile={handleFile}
                    handleDelete={handleDelete}
                    text={``}
                  />
                </Info>
              )}
          </div>
        </Accordion>
      )}
    </div>
  );
};

export default EnfantComponent;
