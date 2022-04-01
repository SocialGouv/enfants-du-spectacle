import Link from "next/link";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import StatutDossierTag from "src/components/StatutDossierTag";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import type { CommissionData, DossierDataLight } from "src/lib/queries";

import styles from "./Commission.module.scss";

interface DossierProps {
  dossier: DossierDataLight;
}

const Dossier: React.FC<DossierProps> = ({ dossier }) => {
  return (
    <div className={`${styles.dossierGrid} itemGrid`}>
      <div>
        <StatutDossierTag dossier={dossier} />
      </div>
      <div className={styles.nomDossier} title={dossier.nom}>
        <Link href={`/dossiers/${dossier.id}`}>{dossier.nom}</Link>
      </div>
      <div>{dossier.societeProduction.nom}</div>
      <div>
        <b>{dossier._count?.enfants}</b>&nbsp;enfants
      </div>
      <div>
        <AssignedAgent dossier={dossier} />
      </div>
      <div>
        <CategorieDossierTag dossier={dossier} onlyGrandeCategorie={true} />
      </div>
    </div>
  );
};

interface Props {
  commission: CommissionData;
}

const Commission: React.FC<Props> = ({ commission }) => {
  const dossiersCount = commission.dossiers.length;
  const enfantsCount = commission.dossiers
    .map((p) => p._count?.enfants ?? 0)
    .reduce((i, b) => i + b, 0);
  return (
    <div className="card">
      <div className={styles.commissionHeader}>
        <div className={styles.dossierTitle}>
          Commission du <b>{frenchDateText(commission.date)}</b> -{" "}
          {frenchDepartementName(commission.departement)}
        </div>
        <button className="postButton">Télécharger ordre du jour</button>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <b>{dossiersCount}</b> dossiers - <b>{enfantsCount}</b> enfants
      </div>

      <div className={`${styles.dossierGrid} itemGrid headGrid`}>
        <div />
        <div>Dossier</div>
        <div>Société</div>
        <div>Enfants</div>
        <div>Suivi par</div>
        <div>Catégorie</div>
      </div>
      <div>
        {commission.dossiers.map((dossier) => (
          <Dossier key={dossier.id} dossier={dossier} />
        ))}
      </div>
    </div>
  );
};
export default Commission;
