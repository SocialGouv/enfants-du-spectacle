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
  const session = useSession()
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const { allUsers, ...swrUsers } = useAllUsers(session.data?.dbUser.role !== "MEDECIN" ? "INSTRUCTEUR" : "MEDECIN");

  if (swrDossier.isLoading || swrUsers.isLoading) return <IconLoader />;
  if (swrDossier.isError || swrUsers.isError || !allUsers || !dossier)
    return <Icon name="ri-error" />;

  return (
    <Select
      selected={dossier[session.data?.dbUser.role !== "MEDECIN" ? 'userId' : 'medecinId'] ? String(dossier[session.data?.dbUser.role !== "MEDECIN" ? 'userId' : 'medecinId']) : ""}
      options={[{ label: "Choisir", value: "" }].concat(
        allUsers.map((u) => ({
          label: shortUserName(u),
          value: String(u.id),
        }))
      )}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const rawUserId = event.target.value;
        const userId = rawUserId ? Number(rawUserId) : null;
        const medecinId = rawUserId ? Number(rawUserId) : null;
        mutate(
          `/api/dossiers/${dossier.id}`,
          session.data?.dbUser.role !== "MEDECIN" ? { ...dossier, userId } : { ...dossier, medecinId },
          false
        ).catch((e) => {
          throw e;
        });
        updateDossier(dossier, session.data?.dbUser.role !== "MEDECIN" ? { userId } : { medecinId }, () => {
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
