import { Icon } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/Justificatifs.module.scss";

import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
} from ".prisma/client";

interface JustificatifProps {
  subject: Dossier | Enfant;
  value: JustificatifDossier | JustificatifEnfant;
  label: string;
}

const Justificatif: React.FC<JustificatifProps> = ({
  subject,
  value,
  label,
}) => {
  const isPresent = subject.justificatifs.includes(value);
  const iconName = isPresent
    ? "ri-checkbox-circle-fill"
    : "ri-checkbox-blank-circle-line";
  return (
    <>
      <Icon name={iconName} size="1x" className={styles.span} /> {label}
    </>
  );
};

interface Props {
  dossier: Dossier;
}

const JUSTIFICATIFS_DOSSIERS: { value: JustificatifDossier; label: string }[] =
  [
    { label: "Synopsis", value: "SYNOPSIS" },
    { label: "Scénario", value: "SCENARIO" },
    { label: "Mesures de sécurité", value: "MESURES_SECURITE" },
    { label: "Plan de travail", value: "PLAN_TRAVAIL" },
    { label: "Infos complémentaires", value: "INFOS_COMPLEMENTAIRES" },
  ];

const JustificatifsDossier: React.FC<Props> = ({ dossier }) => {
  return (
    <ul className={styles.justificatifs}>
      {JUSTIFICATIFS_DOSSIERS.map(({ label, value }) => (
        <li key={value}>
          <Justificatif subject={dossier} value={value} label={label} />
        </li>
      ))}
    </ul>
  );
};

const JUSTIFICATIFS_ENFANTS: { value: JustificatifEnfant; label: string }[] = [
  { label: "Livret de famille", value: "LIVRET_FAMILLE" },
  { label: "Autorisation parentale", value: "AUTORISATION_PARENTALE" },
  { label: "Situations particulières", value: "SITUATION_PARTICULIERE" },
  { label: "Contrat de travail", value: "CONTRAT" },
  { label: "Certificat de scolarité", value: "CERTIFICAT_SCOLARITE" },
  { label: "Avis médical", value: "AVIS_MEDICAL" },
];

const JustificatifsEnfants: React.FC<{ enfant: Enfant }> = ({ enfant }) => {
  return (
    <ul className={styles.justificatifs}>
      {JUSTIFICATIFS_ENFANTS.map(({ label, value }) => (
        <li key={value}>
          <Justificatif subject={enfant} value={value} label={label} />
        </li>
      ))}
    </ul>
  );
};

export { JustificatifsDossier, JustificatifsEnfants };
