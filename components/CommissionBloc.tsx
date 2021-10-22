import React from "react";

import styles from "./CommissionBloc.module.css";
import type { Commission } from ".prisma/client";

export default function CommissionBloc({
  commission,
}: {
  commission: Commission;
}): React.ReactElement {
  return (
    <div className={styles.commission}>
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
  );
}
