import type { Enfant } from "@prisma/client";
import React from "react";
import styles from "src/components/Enfant.module.scss";
import Info from "src/components/Info";
import { JustificatifsEnfants } from "src/components/Justificatifs";
import { frenchDateText, typeEmploiLabel } from "src/lib/helpers";

interface Props {
  enfant: Enfant;
}

const EnfantComponent: React.FC<Props> = ({ enfant }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.name}>
          {enfant.prenom} {enfant.nom}
        </div>
        <div>
          <div>né·e le {frenchDateText(enfant.dateNaissance)}</div>
          <div>{typeEmploiLabel(enfant.typeEmploi)}</div>
          <div>
            Personnage :{" "}
            {enfant.nomPersonnage ? enfant.nomPersonnage : <i>n/a</i>}
          </div>
        </div>
      </div>

      <Info title="Rémunération" className={styles.info}>
        <div>
          <b>{enfant.nombreCachets}</b> cachets de{" "}
          <b>{enfant.montantCachet}€</b>
        </div>
        <div>
          {!enfant.remunerationsAdditionnelles && (
            <i>Pas de rémunération additionnelle</i>
          )}
          {enfant.remunerationsAdditionnelles && (
            <>
              Rémunérations additionnelles: {enfant.remunerationsAdditionnelles}
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
          Période : {enfant.periodeTravail ? enfant.periodeTravail : <i>n/a</i>}
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
  );
};

export default EnfantComponent;
