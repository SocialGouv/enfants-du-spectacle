import type { User, Dossier } from "@prisma/client";
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
  dossier?: Dossier & {
    instructeur?: User | null;
    medecin?: User | null;
  };
  dossierId?: number;
}

const AssignedAgentSelect: React.FC<Props> = ({
  dossier: propDossier,
  dossierId,
}) => {
  // Si on a un dossierId, on utilise useDossier pour la réactivité (page /dossiers)
  // Sinon on utilise les props (page /dossiers/[id])
  const {
    dossier: swrDossier,
    isLoading: swrLoading,
    isError: swrError,
  } = useDossier(dossierId || null);
  const dossier = propDossier || swrDossier;
  const { mutate } = useSWRConfig();
  const session = useSession();
  const role = session.data?.dbUser?.role;
  const { allUsers, ...swrUsers } = useAllUsers(
    role !== "MEDECIN" ? "INSTRUCTEUR" : "MEDECIN"
  );

  if (swrUsers.isLoading) return <IconLoader />;
  if (swrUsers.isError || !allUsers || !dossier)
    return <Icon name="ri-error" />;

  return (
    <Select
      selected={
        dossier[role !== "MEDECIN" ? "instructeurId" : "medecinId"]
          ? String(dossier[role !== "MEDECIN" ? "instructeurId" : "medecinId"])
          : ""
      }
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

        const updatedFields =
          role !== "MEDECIN" ? { instructeurId } : { medecinId };

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

          // Forcer la revalidation complète des commissions
          mutate(
            (key: any) =>
              typeof key === "string" && key.startsWith("/api/commissions")
          ).catch((e) => {
            throw e;
          });
        });
      }}
      className={styles.select}
    />
  );
};
export default AssignedAgentSelect;
