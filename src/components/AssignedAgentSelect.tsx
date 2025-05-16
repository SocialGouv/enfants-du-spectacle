import type { User } from "@prisma/client";
import { Icon, Select } from "@dataesr/react-dsfr";
import { useSession } from "next-auth/react";
import React from "react";
import IconLoader from "src/components/IconLoader";
import { useAllUsers, useDossier } from "src/lib/api";
import { shortUserName } from "src/lib/helpers";
import { updateDossier } from "src/lib/queries";
import { useSWRConfig } from "swr";

import styles from "./AssignedAgentSelect.module.scss";

interface Props {
  dossierId: number;
}

const AssignedAgentSelect: React.FC<Props> = ({ dossierId }) => {
  const { mutate } = useSWRConfig();
  const session = useSession();
  const role = session.data?.dbUser?.role;
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const { allUsers, ...swrUsers } = useAllUsers(role !== "MEDECIN" ? "INSTRUCTEUR" : "MEDECIN");

  if (swrDossier.isLoading || swrUsers.isLoading) return <IconLoader />;
  if (swrDossier.isError || swrUsers.isError || !allUsers || !dossier)
    return <Icon name="ri-error" />;

  return (
    <Select
      selected={dossier[role !== "MEDECIN" ? 'instructeurId' : 'medecinId'] ? String(dossier[role !== "MEDECIN" ? 'instructeurId' : 'medecinId']) : ""}
      options={[{ label: "Choisir", value: "" }].concat(
        allUsers.map((u: User) => ({
          label: shortUserName(u),
          value: String(u.id),
        }))
      )}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const rawUserId = event.target.value;
        const instructeurId = rawUserId ? Number(rawUserId) : null;
        const medecinId = rawUserId ? Number(rawUserId) : null;
        
        const updatedFields = role !== "MEDECIN" 
          ? { instructeurId } 
          : { medecinId };
          
        mutate(
          `/api/dossiers/${dossier.id}`,
          { ...dossier, ...updatedFields },
          false
        ).catch((e) => {
          throw e;
        });
        
        updateDossier(dossier, updatedFields, () => {
          mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
            throw e;
          });
        });
      }}
      className={styles.select}
    />
  );
};
export default AssignedAgentSelect;
