import React from "react";
import { shortUserName } from "src/lib/helpers";

import styles from "./AssignedAgent.module.scss";
import type { Projet, User } from ".prisma/client";

interface Props {
  projet: Projet & { user?: User | null };
}

const AssignedAgent: React.FC<Props> = ({ projet }) => {
  return (
    <>
      {!projet.user && <span className={styles.na}>aucun instructeur</span>}
      {projet.user && (
        <span className={styles.nomUser}>{shortUserName(projet.user)}</span>
      )}
    </>
  );
};
export default AssignedAgent;
