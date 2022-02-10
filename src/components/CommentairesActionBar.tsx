import { Icon } from "@dataesr/react-dsfr";
//import Link from "next/link";
import React from "react";
import styles from "src/components/CommentairesActionBar.module.scss";
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

const CommentairesActionBar: React.FC<Props> = ({ dossierId }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Item label="Département">
        {frenchDepartementName(dossier.commission.departement)}
      </Item>
      <Item label="Commission">{frenchDateText(dossier.commission.date)}</Item>
      <Item label="Dossier">{dossier.nom}</Item>
    </div>
  );
};

export default CommentairesActionBar;
