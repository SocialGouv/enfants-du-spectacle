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

interface JustificatifProps {
  subject: Dossier | Enfant;
  value: JustificatifDossier | JustificatifEnfant;
  label: string;
  link?: string[] | string;
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
    <AiOutlineCheck color="green" style={{ marginRight: "11px" }} size={20} />
  ) : (
    <RxCross2 color="red" style={{ marginRight: "11px" }} size={20} />
  );
  return (
    <div style={{ marginBottom: "40px" }}>
      {!Array.isArray(url) && icon}
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
            {icon}
            {!urlLink && label}
            {urlLink && (
              <a href={urlLink} target="_blank" rel="noreferrer">
                {label}
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
      dossier.justificatifs.includes(b.value) -
      dossier.justificatifs.includes(a.value)
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
                dossier.source === "FORM_EDS"
                  ? dataLinks.dossier.piecesDossier
                      .filter((piece) => piece.type === value)
                      .map((link) => link.link)
                  : _.find(dataLinks.data.dossier.champs, {
                      label: _.find(JUSTIFS_DOSSIER, { value: value }).label,
                    })?.file?.url
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
  dataLinks: DataLinks;
  dossier: Dossier;
}> = ({ enfant, dataLinks, dossier }) => {
  const justificatifs = [...JUSTIFICATIFS_ENFANTS].sort(
    (a, b) =>
      enfant.justificatifs.includes(b.value) -
      enfant.justificatifs.includes(a.value)
  );
  const champEnfant = _.get(
    _.find(dataLinks.data?.dossier.champs, { label: "Enfant" }),
    "champs"
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
                dossier.source === "FORM_EDS"
                  ? dataLinks.enfants
                      .find((enfantTmp) => {
                        return enfantTmp.id.toString() === enfant.externalId;
                      })
                      ?.piecesDossier.filter((piece) => piece.type === value)
                      .map((link) => link.link)
                  : _.find(
                      champEnfant,
                      (
                        champ: Record<string, Record<string, unknown> | null>
                      ) => {
                        return (
                          champ.file?.checksum ===
                          _.find(enfant.piecesDossier, { type: value })
                            ?.externalId
                        );
                      }
                    )?.file?.url
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export { JustificatifsDossier, JustificatifsEnfants };
