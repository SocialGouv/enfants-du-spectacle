import { Icon } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import ChangeStatutDossierButton from "src/components/ChangeStatutDossierButton";
import styles from "src/components/DossierActionBar.module.scss";
import IconLoader from "src/components/IconLoader";
import { useDossier } from "src/lib/api";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import { factory as statutDossierFSMFactory } from "src/lib/statutDossierStateMachine";

import AssignCommissionSelect from "./AssignCommissionSelect";

interface ItemProps {
  label: string;
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ label, children }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemLabel}>{label}</div>
      <div className={styles.itemContent}>{children}</div>
    </div>
  );
};

interface Props {
  dossierId: number;
}

const DossierActionBar: React.FC<Props> = ({ dossierId }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);
  const { data: session } = useSession();

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <ChangeStatutDossierButton
        dossier={dossier}
        demandeur={dossier.demandeur}
      />
      <Item label="Département">
        {dossier.commission
          ? frenchDepartementName(dossier.commission.departement)
          : "N/A"}
      </Item>
      {session?.dbUser.role !== "ADMIN" && (
        <Item label="Commission">
          {dossier.commission ? frenchDateText(dossier.commission.date) : "N/A"}
        </Item>
      )}
      {session?.dbUser.role === "ADMIN" && (
        <Item label="Commission">
          <AssignCommissionSelect
            dossierId={dossierId}
            commission={dossier.commission}
          />
        </Item>
      )}
      <Item label="Suivi par">
        <AssignedAgentSelect dossier={dossier} />
      </Item>
      <Item label="Commentaires">
        <Link href={`/dossiers/commentaires/${dossier.id}`}>
          Notes instructeur
        </Link>
      </Item>
      <Item label="CdC">
        <Link href={`/dossiers/cdc/${dossier.id}`}>Part</Link>
      </Item>
    </div>
  );
};

export default DossierActionBar;
