import type { User, Dossier } from "@prisma/client";
import { Icon, Select } from "@dataesr/react-dsfr";
import { useSession } from "next-auth/react";
import React from "react";
import IconLoader from "src/components/IconLoader";
import { useAllUsers } from "src/lib/api";
import { shortUserName } from "src/lib/helpers";
import { updateDossier } from "src/lib/queries";
import { useSWRConfig } from "swr";

import styles from "./AssignedAgentSelect.module.scss";

interface Props {
  dossier: Dossier & {
    instructeur?: User | null;
    medecin?: User | null;
  };
}

const AssignedAgentSelect: React.FC<Props> = ({ dossier }) => {
  const { mutate } = useSWRConfig();
  const session = useSession();
  const role = session.data?.dbUser?.role;
  const { allUsers, ...swrUsers } = useAllUsers(
    role !== "MEDECIN" ? "INSTRUCTEUR,ADMIN" : "MEDECIN"
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

        // Trouver l'utilisateur sélectionné pour la mise à jour optimiste
        const selectedUser = rawUserId
          ? allUsers.find((u: User) => u.id === Number(rawUserId))
          : null;

        // Mise à jour optimiste du cache des commissions - clé spécifique
        const commissionCacheKey = `/api/commissions?datePeriod=upcoming&departements=all&withChild=true`;

        mutate(
          commissionCacheKey,
          (data: any) => {
            console.log(
              "🔄 Mise à jour cache commissions avec clé:",
              commissionCacheKey,
              {
                data: !!data,
                isArray: Array.isArray(data),
              }
            );

            if (!data || !Array.isArray(data)) {
              console.log("❌ Pas de données ou pas un tableau");
              return data;
            }

            const updatedData = data.map((commission: any) => ({
              ...commission,
              dossiers: commission.dossiers.map((d: any) => {
                if (d.id === dossier.id) {
                  console.log("✅ Mise à jour dossier trouvé:", {
                    dossierId: d.id,
                    selectedUser: selectedUser?.nom,
                  });
                  return {
                    ...d,
                    ...updatedFields,
                    instructeur:
                      role !== "MEDECIN" ? selectedUser : d.instructeur,
                    medecin: role === "MEDECIN" ? selectedUser : d.medecin,
                  };
                }
                return d;
              }),
            }));

            console.log("✅ Cache commissions mis à jour");
            return updatedData;
          },
          false
        ).catch((e) => {
          console.error("Erreur mise à jour cache commissions:", e);
        });

        // Mise à jour pour les autres clés de cache possibles (départements spécifiques)
        mutate(
          (key: any) =>
            typeof key === "string" &&
            key.startsWith("/api/commissions?datePeriod=upcoming"),
          (data: any) => {
            if (!data || !Array.isArray(data)) return data;

            return data.map((commission: any) => ({
              ...commission,
              dossiers: commission.dossiers.map((d: any) =>
                d.id === dossier.id
                  ? {
                      ...d,
                      ...updatedFields,
                      instructeur:
                        role !== "MEDECIN" ? selectedUser : d.instructeur,
                      medecin: role === "MEDECIN" ? selectedUser : d.medecin,
                    }
                  : d
              ),
            }));
          },
          false
        ).catch((e) => {
          console.error(
            "Erreur mise à jour cache commissions (autres clés):",
            e
          );
        });

        // Mise à jour optimiste du cache du dossier individuel (pour la page /dossiers/[id])
        mutate(
          `/api/dossiers/${dossier.id}`,
          (currentData: any) => {
            if (!currentData) return currentData;
            return {
              ...currentData,
              ...updatedFields,
              instructeur:
                role !== "MEDECIN" ? selectedUser : currentData.instructeur,
              medecin: role === "MEDECIN" ? selectedUser : currentData.medecin,
            };
          },
          false
        ).catch((e) => {
          console.error("Erreur mise à jour cache dossier:", e);
        });

        // Mise à jour en base de données en arrière-plan
        updateDossier(dossier, updatedFields, () => {
          // Revalidation silencieuse en cas de succès
          mutate(
            (key: any) =>
              typeof key === "string" && key.startsWith("/api/commissions")
          ).catch((e) => {
            console.error("Erreur lors de la revalidation commissions:", e);
          });

          // Revalidation du cache du dossier individuel
          mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
            console.error("Erreur lors de la revalidation dossier:", e);
          });
        });
      }}
      className={styles.select}
    />
  );
};
export default AssignedAgentSelect;
