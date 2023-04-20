import { Icon, Select } from "@dataesr/react-dsfr";
import type { Commission } from "@prisma/client";
import React from "react";
import IconLoader from "src/components/IconLoader";
import { useDossier } from "src/lib/api";
import { getUpcomingCommissionsByDepartement } from "src/lib/fetching/commissions";
import { frenchDateText } from "src/lib/helpers";
import { updateDossier } from "src/lib/queries";
import { useSWRConfig } from "swr";

import styles from "./AssignedAgentSelect.module.scss";

interface Props {
  dossierId: number;
  commission: Commission
}

const AssignCommissionSelect: React.FC<Props> = ({ dossierId, commission }) => {
  const { mutate } = useSWRConfig();
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const [commissions, setCommissions] = React.useState<Commission[]>([]);

  const fetchCommissions = async () => {
    const res = await getUpcomingCommissionsByDepartement(
      dossier?.societeProduction.departement ?? "75"
    );
    setCommissions(res);
  };

  React.useEffect(() => {
    fetchCommissions();
  }, []);

  if (swrDossier.isLoading) return <IconLoader />;
  if (swrDossier.isError || !dossier) return <Icon name="ri-error" />;

  return (
    <Select
      selected={dossier.commission ? dossier.commission.id : ""}
      options={[
        { label: frenchDateText(commission.date), value: String(commission.id) },
      ].concat(commissions.map((u) => ({
        label: frenchDateText(u.date),
        value: String(u.id),
      })))}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const rawCommissionId = event.target.value;
        const commissionId = rawCommissionId ? Number(rawCommissionId) : null;
        console.log("comission to put : ", rawCommissionId);
        mutate(
          `/api/dossiers/${dossier.id}`,
          { ...dossier, commissionId },
          false
        ).catch((e) => {
          throw e;
        });
        updateDossier(dossier, { commissionId }, () => {
          mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
            throw e;
          });
        });
      }}
      className={styles.select}
    />
  );
};
export default AssignCommissionSelect;
