import type { Dossier, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import { shortUserName } from "src/lib/helpers";

import styles from "./AssignedAgent.module.scss";

interface Props {
  dossier: Dossier & { 
    user?: User | null
    medecin?: User | null
   };
}

const AssignedAgent: React.FC<Props> = ({ dossier }) => {
  const session = useSession();
  console.log('dossier in agent select : ', dossier)
  return (
    <>
      {!dossier[session.data?.dbUser.role !== "MEDECIN" ? 'user' : 'medecin'] && session.data.dbUser.role !== "MEMBRE" && (
        <span className={styles.na}>
          <AssignedAgentSelect dossierId={dossier.id} />
        </span>
      )}
      {dossier[session.data?.dbUser.role !== "MEDECIN" ? 'user' : 'medecin'] && (
        <span className={styles.nomUser}>{shortUserName(dossier[session.data?.dbUser.role !== "MEDECIN" ? 'user' : 'medecin'])}</span>
      )}
    </>
  );
};
export default AssignedAgent;
