import type { Enfant } from "@prisma/client";
import React from "react";
import styles from "src/components/Enfant.module.scss";
import Foldable from "src/components/Foldable";
import Info from "src/components/Info";
import { JustificatifsEnfants } from "src/components/Justificatifs";
import {
  birthDateToFrenchAge,
  frenchDateText,
  typeEmploiLabel,
} from "src/lib/helpers";

interface Props {
  enfant: Enfant;
}

const EnfantComponent: React.FC<Props> = ({ enfant }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.name}>
          {enfant.nom} {enfant.prenom}
        </div>
        <div
          title={`né·e le ${frenchDateText(enfant.dateNaissance)}`}
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
              {enfant.contexteTravail ? enfant.contexteTravail : <i>n/a</i>}
            </div>
          </Info>

          <Info title="Pièces justificatives" className={styles.info}>
            <JustificatifsEnfants enfant={enfant} />
          </Info>
        </div>
      </Foldable>
    </div>
  );
};

export default EnfantComponent;
