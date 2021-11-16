import React from "react";
import styles from "src/components/Enfant.module.scss";
import Info from "src/components/Info";
// import { JustificatifsDossier } from "src/components/Justificatifs";
import { frenchDateText, typeEmploiLabel } from "src/lib/helpers";

import type { Enfant } from ".prisma/client";

interface Props {
  enfant: Enfant;
}

const EnfantComponent: React.FC<Props> = ({ enfant }) => {
  return (
    <div className={styles.container} key={enfant.id}>
      <div>
        <div className={styles.name}>
          {enfant.prenom} {enfant.nom}
        </div>
        <div className={styles.container}>
          <div>
            <div>{typeEmploiLabel(enfant.typeEmploi)}</div>
            <div>né·e le {frenchDateText(enfant.dateNaissance)}</div>
          </div>

          <div>
            <Info title="Rémunération">
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
                    Rémunérations additionnelles:{" "}
                    {enfant.remunerationsAdditionnelles}
                  </>
                )}
              </div>
              <div>
                Total: <b>{enfant.remunerationTotale}€</b>
              </div>
            </Info>
          </div>
          <div>
            <Info title="Conditions de travail">
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
          </div>
        </div>

        {/* nomPersonnage
        contexteTravail
        justificatifs */}
      </div>
      <div>{/* JUSTIFS */}</div>
    </div>
  );
};

export default EnfantComponent;
