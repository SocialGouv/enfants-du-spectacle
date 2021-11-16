import { Icon } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/Justificatifs.module.scss";

import type { Dossier, JustificatifDossier } from ".prisma/client";

interface JustificatifProps {
  subject: Dossier;
  value: JustificatifDossier;
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

const justificatifs: { value: JustificatifDossier; label: string }[] = [
  { label: "Synopsis", value: "SYNOPSIS" },
  { label: "Scénario", value: "SCENARIO" },
  { label: "Mesures de sécurité", value: "MESURES_SECURITE" },
  { label: "Plan de travail", value: "PLAN_TRAVAIL" },
  { label: "Infos complémentaires", value: "INFOS_COMPLEMENTAIRES" },
];

const JustificatifsDossier: React.FC<Props> = ({ dossier }) => {
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => (
        <li key={value}>
          <Justificatif subject={dossier} value={value} label={label} />
        </li>
      ))}
    </ul>
  );
};

export { JustificatifsDossier };
