import type { Dossier, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import { shortUserName } from "src/lib/helpers";

import styles from "./AssignedAgent.module.scss";

interface Props {
  dossier: Dossier & {
    instructeur?: User | null;
    medecin?: User | null;
  };
}

const AssignedAgent: React.FC<Props> = ({ dossier }) => {
  const session = useSession();
  const role = session.data?.dbUser?.role;
  const agentType = role !== "MEDECIN" ? "instructeur" : "medecin";
  const agent = dossier[agentType];

  return (
    <>
      {!agent && role !== "MEMBRE" && (
        <span className={styles.na}>
          <AssignedAgentSelect dossier={dossier} />
        </span>
      )}
      {agent && (
        <span className={styles.nomUser}>{shortUserName(agent as User)}</span>
      )}
    </>
  );
};
export default AssignedAgent;
