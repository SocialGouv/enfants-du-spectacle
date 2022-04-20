import type { Enfant } from "@prisma/client";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import styles from "src/components/Enfant.module.scss";
import Foldable from "src/components/Foldable";
import Info from "src/components/Info";
import { JustificatifsEnfants } from "src/components/Justificatifs";
import {
  birthDateToFrenchAge,
  frenchDateText,
  typeEmploiLabel,
} from "src/lib/helpers";
import { updateEnfant } from "src/lib/queries";

interface Props {
  enfant: Enfant;
  dataLinks: Record<string, unknown>;
}

const EnfantComponent: React.FC<Props> = ({ enfant, dataLinks }) => {
  const [formData, setFormData] = React.useState<Enfant>({
    ...enfant,
  });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.currentTarget.value !== "" ? e.currentTarget.value : null,
    });
  };

  useEffect(() => {
    lauchUpdate(formData);
  }, [formData]);

  const lauchUpdate = useCallback(
    _.debounce((enfantToUpdate: Enfant) => {
      updateEnfant(enfantToUpdate);
    }, 1000),
    []
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.name}>
          {enfant.nom} {enfant.prenom}
        </div>
        <div
          title={`${frenchDateText(enfant.dateNaissance)}`}
          className="hoverableTitle"
        >
          {birthDateToFrenchAge(enfant.dateNaissance)}
        </div>
        <div>{typeEmploiLabel(enfant.typeEmploi)}</div>
        <div>
          Personnage :{" "}
          {enfant.nomPersonnage ? enfant.nomPersonnage : <i>n/a</i>}
        </div>
      </div>

      <Foldable hidden={true}>
        <div className={styles.wrapperFoldable}>
          <Info title="Rémunération" className={styles.info}>
            <div>
              <b>{enfant.nombreCachets}</b> cachets de{" "}
              <b>{enfant.montantCachet}€</b>
            </div>
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
            <JustificatifsEnfants enfant={enfant} dataLinks={dataLinks} />
          </Info>
        </div>
      </Foldable>
      <br />
      <Foldable hidden={true} text="Renseigner les adresses...">
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
      </Foldable>
    </div>
  );
};

export default EnfantComponent;
