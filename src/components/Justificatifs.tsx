import { Icon } from "@dataesr/react-dsfr";
import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossierEnfant,
} from "@prisma/client";
import _ from "lodash";
import React from "react";
import styles from "src/components/Justificatifs.module.scss";
import { JUSTIFS_DOSSIER } from "src/lib/helpers";

interface JustificatifProps {
  subject: Dossier | Enfant;
  value: JustificatifDossier | JustificatifEnfant;
  label: string;
  link?: string;
}

const Justificatif: React.FC<JustificatifProps> = ({
  subject,
  value,
  label,
  link,
}) => {
  const isPresent = subject.justificatifs.includes(value);

  const url = isPresent && link;
  const icon = isPresent ? (
    <Icon
      name={"ri-checkbox-circle-line"}
      size="2x"
      className={styles.iconSpan}
      color="green"
    />
  ) : (
    <Icon
      name={"ri-close-line"}
      size="2x"
      className={styles.iconSpan}
      color="red"
    />
  );
  return (
    <>
      {icon}
      {!isPresent && label}
      {isPresent && url && (
        <a href={url} target="_blank" rel="noreferrer">
          {label}
        </a>
      )}
    </>
  );
};

interface Props {
  dossier: Dossier & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: Record<string, unknown>;
}

const JUSTIFICATIFS_DOSSIERS: { value: JustificatifDossier; label: string }[] =
  [
    { label: "Synopsis", value: "SYNOPSIS" },
    { label: "Scénario", value: "SCENARIO" },
    { label: "Mesures de sécurité", value: "MESURES_SECURITE" },
    { label: "Plan de travail", value: "PLAN_TRAVAIL" },
    { label: "Infos complémentaires", value: "INFOS_COMPLEMENTAIRES" },
  ];

const JustificatifsDossier: React.FC<Props> = ({ dossier, dataLinks }) => {
  const justificatifs = [...JUSTIFICATIFS_DOSSIERS].sort(
    (a, b) =>
      dossier.justificatifs.includes(b.value) -
      dossier.justificatifs.includes(a.value)
  );
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => (
        <li key={value}>
          <Justificatif
            subject={dossier}
            value={value}
            label={label}
            link={
              _.find(dataLinks.data.dossier.champs, {
                label: _.find(JUSTIFS_DOSSIER, { value: value }).label,
              }).file?.url
            }
          />
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

const JustificatifsEnfants: React.FC<{
  enfant: Enfant & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: Record<string, unknown>;
}> = ({ enfant, dataLinks }) => {
  const justificatifs = [...JUSTIFICATIFS_ENFANTS].sort(
    (a, b) =>
      enfant.justificatifs.includes(b.value) -
      enfant.justificatifs.includes(a.value)
  );
  const champEnfant = _.get(
    _.find(dataLinks.data.dossier.champs, { label: "Enfant" }),
    "champs"
  );
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => (
        <li key={value}>
          <Justificatif
            subject={enfant}
            value={value}
            label={label}
            link={
              _.find(
                champEnfant,
                (champ: Record<string, Record<string, unknown> | null>) => {
                  return (
                    champ.file?.checksum ===
                    _.find(enfant.piecesDossier, { type: value })?.externalId
                  );
                }
              )?.file?.url
            }
          />
        </li>
      ))}
    </ul>
  );
};

export { JustificatifsDossier, JustificatifsEnfants };
