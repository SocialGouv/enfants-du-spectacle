import { Icon } from "@dataesr/react-dsfr";
import Link from "next/link";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import ChangeStatutDossierButton from "src/components/ChangeStatutDossierButton";
import styles from "src/components/DossierActionBar.module.scss";
import IconLoader from "src/components/IconLoader";
import { useDossier } from "src/lib/api";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import { factory as statutDossierFSMFactory } from "src/lib/statutDossierStateMachine";

interface ItemProps {
  label: string;
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

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <ChangeStatutDossierButton dossier={dossier} />
      <Item label="Département">
        {frenchDepartementName(dossier.commission.departement)}
      </Item>
      <Item label="Commission">{frenchDateText(dossier.commission.date)}</Item>
      <Item label="Suivi par">
        <AssignedAgentSelect dossierId={dossierId} />
      </Item>
      <Item label="Commentaires">
        <Link href={`/dossiers/commentaires/${dossier.id}`}>
          Notes instructeur
        </Link>
      </Item>
    </div>
  );
};

export default DossierActionBar;
