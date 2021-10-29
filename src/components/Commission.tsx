import Link from "next/link";
import React from "react";
import StatutProjetTag from "src/components/StatutProjetTag";
import { frenchDateText, shortUserName } from "src/lib/helpers";
import type { CommissionData, ProjetData } from "src/lib/queries";

import styles from "./Commission.module.scss";

interface ProjetProps {
  projet: ProjetData;
}

const ProjetRow: React.FC<ProjetProps> = ({ projet }) => {
  return (
    <tr key={projet.id}>
      <td>
        <StatutProjetTag projet={projet} />
      </td>
      <td className={styles.nomProjet} title={projet.nom}>
        <Link href={`/dossiers/${projet.id}`}>{projet.nom}</Link>
      </td>
      <td>{projet.societeProduction.nom}</td>
      <td>
        <b>{projet._count?.enfants}</b>&nbsp;enfants
      </td>
      <td>
        <span className={styles.nomUser}>
          {projet.user && shortUserName(projet.user)}
        </span>
      </td>
    </tr>
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
          Commission du <b>{frenchDateText(commission.date)}</b> du{" "}
          <b>{commission.departement}</b>
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <b>{projetsCount}</b> projets - <b>{enfantsCount}</b> enfants
      </div>
      <table className={`${styles.projets} cardTable`}>
        <thead>
          <tr>
            <th />
            <th>Projet</th>
            <th>Société</th>
            <th>Enfants</th>
            <th>suivi par</th>
          </tr>
        </thead>
        <tbody>
          {commission.projets.map((projet) => (
            <ProjetRow key={projet.id} projet={projet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Commission;
