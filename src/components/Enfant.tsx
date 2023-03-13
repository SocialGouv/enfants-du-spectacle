import type { Dossier, Enfant } from "@prisma/client";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import styles from "src/components/Enfant.module.scss";
import Info from "src/components/Info";
import { JustificatifsEnfants } from "src/components/Justificatifs";
import type { Comments } from "src/lib/fetching/comments";
import { updateCommentairesNotifications, updateEnfant } from "src/lib/queries";

import Accordion from "./Accordion";
import InputComments from "./inputComments";
import ListComments from "./ListComments";
import { ValidationJustificatifsEnfant } from "./ValidationJustificatifs";

interface Props {
  enfant: Enfant;
  dataLinks: Record<string, unknown>;
  dossier: Dossier;
  comments: Comments[];
  actionComments: (comment: Comments) => void;
}

const EnfantComponent: React.FC<Props> = ({
  enfant,
  dataLinks,
  dossier,
  comments,
  actionComments,
}) => {
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.currentTarget.value !== "" ? e.currentTarget.value : null,
    });
  };

  useEffect(() => {
    if (mountedRef) {
      lauchUpdate(formData);
    }
  }, [formData]);

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
            Rémunération:
            <ul>
              <li>
                Cachets: total{" "}
                <span style={{ fontWeight: "bold" }}>
                  {enfant.nombreCachets * enfant.montantCachet}€
                </span>{" "}
                ({" "}
                <span style={{ fontWeight: "bold" }}>
                  {enfant.nombreCachets}
                </span>{" "}
                cachets x{" "}
                <span style={{ fontWeight: "bold" }}>
                  {enfant.montantCachet}€
                </span>
                {")"}
              </li>
            </ul>
            <div>
              {enfant.typeEmploi == "DOUBLAGE" && (
                <span>
                  nombre de lignes : <b>{enfant.nombreLignes}</b>
                </span>
              )}
            </div>
            <div>
              {!enfant.remunerationsAdditionnelles && (
                <i>Pas de rémunération additionnelle</i>
              )}
              {enfant.remunerationsAdditionnelles && (
                <>
                  Rémunérations additionnelles:{" "}
                  {enfant.remunerationsAdditionnelles}
                </>
              )}
            </div>
            <div>
              Total: <b>{enfant.remunerationTotale}€</b>
            </div>
          </Info>
          <Info title="Conditions de travail" className={styles.info}>
            <div>
              <b>{enfant.nombreJours}</b> jours travaillés
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
          </Info>

          <Info title="Pièces justificatives" className={styles.info}>
            <JustificatifsEnfants
              enfant={enfant}
              dataLinks={dataLinks}
              dossier={dossier}
            />
          </Info>
          <Info title="Validation" className={styles.info}>
            <ValidationJustificatifsEnfant
              enfant={enfant}
              dossier={dossier}
              dataLinks={dataLinks}
            />
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
            <ListComments
              comments={comments.filter((comment) => {
                return comment.enfantId === parseInt(enfant.externalId!);
              })}
            />
            <InputComments
              dossierId={parseInt(dossier.externalId!)}
              enfantId={parseInt(enfant.externalId!)}
              parentId={null}
              action={actionComments}
            />
          </>
        )}
      </Accordion>
      <Accordion title="Afficher les adresses" className="accordionSmallText">
        <div className={styles.adressesGrid}>
          <form
            className={styles.Form}
            onSubmit={(e) => {
              e.currentTarget.value = "";
            }}
          >
            <Info title="Enfant" className={styles.info}>
              <div className={styles.inputAdresse}>
                <label htmlFor="adresseEnfant" className="mb-2 italic">
                  Adresse
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="adresseEnfant"
                  name="adresseEnfant"
                  className="inputText"
                  value={formData.adresseEnfant ? formData.adresseEnfant : ""}
                />
              </div>
            </Info>
            <Info title="Représentant légal 1" className={styles.info}>
              <div className={styles.inputAdresse}>
                <label htmlFor="nomRepresentant1" className="mb-2 italic">
                  Nom
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="nomRepresentant1"
                  name="nomRepresentant1"
                  className="inputText"
                  value={
                    formData.nomRepresentant1 ? formData.nomRepresentant1 : ""
                  }
                />
              </div>
              <div className={styles.inputAdresse}>
                <label htmlFor="prenomRepresentant1" className="mb-2 italic">
                  Prénom
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="prenomRepresentant1"
                  name="prenomRepresentant1"
                  className="inputText"
                  value={
                    formData.prenomRepresentant1
                      ? formData.prenomRepresentant1
                      : ""
                  }
                />
              </div>
              <div className={styles.inputAdresse}>
                <label htmlFor="adresseRepresentant1" className="mb-2 italic">
                  Adresse
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="adresseRepresentant1"
                  name="adresseRepresentant1"
                  className="inputText"
                  value={
                    formData.adresseRepresentant1
                      ? formData.adresseRepresentant1
                      : ""
                  }
                />
              </div>
            </Info>
            <Info title="Représentant légal 2" className={styles.info}>
              <div className={styles.inputAdresse}>
                <label htmlFor="nomRepresentant2" className="mb-2 italic">
                  Nom
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="nomRepresentant2"
                  name="nomRepresentant2"
                  className="inputText"
                  value={
                    formData.nomRepresentant2 ? formData.nomRepresentant2 : ""
                  }
                />
              </div>
              <div className={styles.inputAdresse}>
                <label htmlFor="prenomRepresentant2" className="mb-2 italic">
                  Prénom
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="prenomRepresentant2"
                  name="prenomRepresentant2"
                  className="inputText"
                  value={
                    formData.prenomRepresentant2
                      ? formData.prenomRepresentant2
                      : ""
                  }
                />
              </div>
              <div className={styles.inputAdresse}>
                <label htmlFor="adresseRepresentant2" className="mb-2 italic">
                  Adresse
                </label>
                <input
                  onChange={(e) => {
                    handleForm(e);
                  }}
                  type="text"
                  id="adresseRepresentant2"
                  name="adresseRepresentant2"
                  className="inputText"
                  value={
                    formData.adresseRepresentant2
                      ? formData.adresseRepresentant2
                      : ""
                  }
                />
              </div>
            </Info>
          </form>
        </div>
      </Accordion>
    </div>
  );
};

export default EnfantComponent;
