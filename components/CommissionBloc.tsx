import { Table, Tag, Title } from "@dataesr/react-dsfr";
import type { ReactElement } from "react";
import React from "react";

import styles from "./CommissionBloc.module.scss";
import type {
  Agent,
  Commission,
  Projet,
  SocieteProduction,
} from ".prisma/client";

type CommissionPayload = Commission & {
  projets: (Projet & {
    agent: Agent | null;
    societeProduction: SocieteProduction;
    _count: {
      enfants: number;
    } | null;
  })[];
};

function shortAgentName(agent: Agent): string {
  return `${agent.prenom} ${agent.nom[0]}.`;
}

export default function CommissionBloc({
  commission,
}: {
  commission: CommissionPayload;
}): ReactElement {
  const projetsCount = commission.projets.length;
  const enfantsCount = commission.projets
    .map((p) => p._count?.enfants ?? 0)
    .reduce((i, b) => i + b, 0);
  return (
    <div className={styles.commission}>
      <div>
        <div className={styles.projetTitle}>
          Commission du{" "}
          <b>
            {commission.date.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </b>{" "}
          du <b>{commission.departement}</b>
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <b>{projetsCount}</b> projets - <b>{enfantsCount}</b> enfants
      </div>
      <table className={styles.projets}>
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
            <tr key={projet.id}>
              <td>
                <Tag className={styles.tagProjet}>En&nbsp;cours</Tag>
              </td>
              <td className={styles.nomProjet} title={projet.nom}>
                {projet.nom}
              </td>
              <td>{projet.societeProduction.nom}</td>
              <td>
                <b>{projet._count?.enfants}</b>&nbsp;enfants
              </td>
              <td>
                <span className={styles.nomAgent}>
                  {projet.agent && shortAgentName(projet.agent)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
