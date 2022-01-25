import { Icon, Select } from "@dataesr/react-dsfr";
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
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const { allUsers, ...swrUsers } = useAllUsers();

  if (swrDossier.isLoading || swrUsers.isLoading) return <IconLoader />;
  if (swrDossier.isError || swrUsers.isError || !allUsers || !dossier)
    return <Icon name="ri-error" />;

  return (
    <Select
      selected={dossier.userId ? String(dossier.userId) : ""}
      options={[{ label: dossier.userId ? "" : "Choisir", value: "" }].concat(
        allUsers.map((u) => ({
          label: shortUserName(u),
          value: String(u.id),
        }))
      )}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const rawUserId = event.target.value;
        const userId = rawUserId ? Number(rawUserId) : null;
        mutate(
          `/api/dossiers/${dossier.id}`,
          { ...dossier, userId },
          false
        ).catch((e) => {
          throw e;
        });
        updateDossier(dossier, { userId }, () => {
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
