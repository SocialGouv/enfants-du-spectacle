import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossierEnfant,
} from "@prisma/client";
import _ from "lodash";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import styles from "src/components/Justificatifs.module.scss";
import { JUSTIFS_DOSSIER } from "src/lib/helpers";
import type { DataLinks } from "src/lib/types";

// Create separate interfaces for dossier and enfant justificatifs
interface BaseJustificatifProps {
  label: string;
  link?: Array<string | null> | string | undefined;
}

interface JustificatifDossierProps extends BaseJustificatifProps {
  subject: Dossier;
  value: JustificatifDossier;
}

interface JustificatifEnfantProps extends BaseJustificatifProps {
  subject: Enfant;
  value: JustificatifEnfant;
}

type JustificatifProps = JustificatifDossierProps | JustificatifEnfantProps;

const Justificatif: React.FC<JustificatifProps> = ({
  subject,
  value,
  label,
  link,
}) => {
  // Use string comparison to avoid type issues
  const isPresent = subject.justificatifs.some(item => String(item) === String(value));

  const url = isPresent && link;
  
  // Use simple emoji characters instead of React icons to avoid type issues
  const iconElement = (
    <span 
      style={{ 
        marginRight: "11px", 
        color: isPresent ? "green" : "red",
        fontSize: "18px",
        fontWeight: "bold" 
      }}
    >
      {isPresent ? "✓" : "✗"}
    </span>
  );
  
  return (
    <div style={{ marginBottom: "35px" }}>
      {!Array.isArray(url) && iconElement}
      {!Array.isArray(url) && !isPresent && label}
      {isPresent && !Array.isArray(url) && (
        <a href={url ? url : "/"} target="_blank" rel="noreferrer">
          {label}
        </a>
      )}
      {isPresent &&
        Array.isArray(url) &&
        url.map((urlLink, key) => (
          <div key={key} className={styles.blocLink}>
            {iconElement}
            {!urlLink && label}
            {urlLink && (
              <a href={urlLink} target="_blank" rel="noreferrer">
                {label.length > 50 ? label.slice(0, 50) + "..." : label}
              </a>
            )}
          </div>
        ))}
    </div>
  );
};

interface Props {
  dossier: Dossier & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: DataLinks;
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
      (dossier.justificatifs.includes(b.value) ? 1 : 0) -
      (dossier.justificatifs.includes(a.value) ? 1 : 0)
  );
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => {
        return (
          <li key={value} style={{ marginBottom: "16px" }}>
            <Justificatif
              subject={dossier}
              value={value}
              label={label}
  link={
    dossier.source === "FORM_EDS" && dataLinks?.dossier
      ? dataLinks.dossier.piecesDossier
          .filter((piece) => piece.type === value)
          .map((link) => link.link)
      : undefined
  }
            />
          </li>
        );
      })}
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
  {
    label: "Déclaration sur l’honneur de l’enfant âgé de plus de 13 ans",
    value: "DECLARATION_HONNEUR",
  },
];

const JustificatifsEnfants: React.FC<{
  enfant: Enfant & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: DataLinks | null;
  dossier: Dossier;
}> = ({ enfant, dataLinks, dossier }) => {
  const justificatifs = [...JUSTIFICATIFS_ENFANTS].sort(
    (a, b) =>
      (enfant.justificatifs.includes(b.value) ? 1 : 0) -
      (enfant.justificatifs.includes(a.value) ? 1 : 0)
  );
  
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => {
        return (
          <li key={value} style={{ marginBottom: "16px" }}>
            <Justificatif
              subject={enfant}
              value={value}
              label={label}
              link={
                dossier.source === "FORM_EDS" && dataLinks
                  ? dataLinks.enfants
                      .find((enfantTmp) => {
                        return enfantTmp.id.toString() === enfant.externalId;
                      })
                      ?.piecesDossier.filter((piece) => piece.type === value)
                      .map((link) => link.link)
                  : undefined
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export { JustificatifsDossier, JustificatifsEnfants };
