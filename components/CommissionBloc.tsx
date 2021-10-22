import { Table } from "@dataesr/react-dsfr";
import type { ReactElement } from "react";
import React from "react";

import styles from "./CommissionBloc.module.css";
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
      <div>
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
              <td>En cours</td>
              <td>{projet.nom}</td>
              <td>{projet.societeProduction.nom}</td>
              <td>
                <b>{projet._count?.enfants} enfants</b>
              </td>
              <td>{projet.agent?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
