import "react-datepicker/dist/react-datepicker.css";

import type {
  Dossier,
  Enfant,
  JustificatifEnfant,
  TypeConsultationMedecin,
  User,
} from "@prisma/client";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import styles from "src/components/Enfant.module.scss";
import Info from "src/components/Info";
import { JustificatifsEnfants } from "src/components/Justificatifs";
import type { Comments } from "src/lib/fetching/comments";
import { uploadDoc } from "src/lib/fetching/docs";
import { passEnfant } from "src/lib/fetching/enfants";
import {
  INFOS_REPRESENTANTS,
  REMUNERATIONS,
  TYPE_CONSULTATION_MEDECIN,
} from "src/lib/helpers";
import { updateCommentairesNotifications, updateEnfant } from "src/lib/queries";
import type { Remuneration } from "src/lib/types";

import Accordion from "./Accordion";
import InputComments from "./inputComments";
import ListComments from "./ListComments";
import InputFile from "./uiComponents/InputFile";
import { ValidationJustificatifsEnfant } from "./ValidationJustificatifs";

interface Props {
  enfant: Enfant;
  dataLinks: Record<string, unknown>;
  dossier: Dossier;
  comments: Comments[];
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
}) => {
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);
  const session = useSession();

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
    return (
      <div className={styles.remunerationBloc}>
        <div style={{ paddingBottom: "20px" }}>
          {remunerationForfait && (
            <div>
              <RemunerationsDetails
                remuneration={remunerationForfait}
                matchingLabel={"Forfait"}
              />
            </div>
          )}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <div className={styles.remunerationTitle}>
            Rémunérations garanties
          </div>
          {remunerations.map((remuneration) => {
            const matchingLabelGuarantee = REMUNERATIONS.flatMap(
              (category) => category["Rémunérations garanties"]
            ).find((item) => item?.value === remuneration.natureCachet)?.label;
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
      dossier.externalId ?? "",
      formData.externalId ?? "",
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

  const handleDelete = async (id: string) => {};

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

  const updateComments = () => {
    const commentsChildrenIds: string[] = comments
      .filter(
        (comment) =>
          comment.enfantId === parseInt(enfant.externalId!) &&
          comment.source === "SOCIETE_PROD"
      )
      .map((com) => JSON.stringify(com.id));
    if (commentsChildrenIds.length)
      updateCommentairesNotifications(commentsChildrenIds);
  };

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
              <b>{enfant.nombreLignes ? enfant.nombreLignes : <i>n/a</i>}</b>
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

          <Info title="Pièces justificatives" className={styles.info}>
            <JustificatifsEnfants
              enfant={enfant}
              dataLinks={dataLinks}
              dossier={dossier}
            />
          </Info>
          {(session.data?.dbUser.role === "INSTRUCTEUR" ||
            session.data?.dbUser.role === "ADMIN") && (
            <Info title="Validation" className={styles.info}>
              <ValidationJustificatifsEnfant
                enfant={enfant}
                dossier={dossier}
                dataLinks={dataLinks}
              />
            </Info>
          )}
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
              dossierId={parseInt(dossier.externalId!)}
              enfantId={parseInt(enfant.externalId!)}
              parentId={null}
              action={actionComments}
            />
            <ListComments
              comments={comments.filter((comment) => {
                return comment.enfantId === parseInt(enfant.externalId!);
              })}
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
                      disabled={
                        (session.data?.dbUser as User).role === "MEDECIN"
                      }
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
                      id={`${TYPE_CONSULTATION_MEDECIN.find(
                        (type) =>
                          type.value === formData.typeConsultationMedecin
                      )?.typeJustif!}`}
                      docs={formData.piecesDossier || []}
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
                    docs={formData.piecesDossier || []}
                    allowChanges={false}
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
