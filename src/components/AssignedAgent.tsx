import type { Dossier, User } from "@prisma/client";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import { shortUserName } from "src/lib/helpers";

import styles from "./AssignedAgent.module.scss";

interface Props {
  dossier: Dossier & { user?: User | null };
}

const AssignedAgent: React.FC<Props> = ({ dossier }) => {
  return (
    <>
      {!dossier.user && (
        <span className={styles.na}>
          <AssignedAgentSelect dossierId={dossier.id} />
        </span>
      )}
      {dossier.user && (
        <span className={styles.nomUser}>{shortUserName(dossier.user)}</span>
      )}
    </>
  );
};
export default AssignedAgent;
