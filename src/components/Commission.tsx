import Link from "next/link";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import StatutProjetTag from "src/components/StatutProjetTag";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import type { CommissionData, ProjetDataLight } from "src/lib/queries";

import styles from "./Commission.module.scss";

interface ProjetProps {
  projet: ProjetDataLight;
}

const Projet: React.FC<ProjetProps> = ({ projet }) => {
  return (
    <div className={`${styles.projetGrid} itemGrid`}>
      <div>
        <StatutProjetTag projet={projet} />
      </div>
      <div className={styles.nomProjet} title={projet.nom}>
        <Link href={`/dossiers/${projet.id}`}>{projet.nom}</Link>
      </div>
      <div>{projet.societeProduction.nom}</div>
      <div>
        <b>{projet._count?.enfants}</b>&nbsp;enfants
      </div>
      <div>
        <AssignedAgent projet={projet} />
      </div>
    </div>
  );
};

interface Props {
  commission: CommissionData;
}

const Commission: React.FC<Props> = ({ commission }) => {
  const projetsCount = commission.projets.length;
  const enfantsCount = commission.projets
    .map((p) => p._count?.enfants ?? 0)
    .reduce((i, b) => i + b, 0);
  return (
    <div className="card">
      <div>
        <div className={styles.projetTitle}>
          Commission du <b>{frenchDateText(commission.date)}</b> -{" "}
          {frenchDepartementName(commission.departement)}
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <b>{projetsCount}</b> dossiers - <b>{enfantsCount}</b> enfants
      </div>

      <div className={`${styles.projetGrid} itemGrid headGrid`}>
        <div />
        <div>Dossier</div>
        <div>Société</div>
        <div>Enfants</div>
        <div>suivi par</div>
      </div>
      <div>
        {commission.projets.map((projet) => (
          <Projet key={projet.id} projet={projet} />
        ))}
      </div>
    </div>
  );
};
export default Commission;
