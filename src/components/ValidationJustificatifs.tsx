import { Select } from "@dataesr/react-dsfr";
import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossier,
  PieceDossierEnfant,
  STATUT_PIECE,
} from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "src/components/Justificatifs.module.scss";
import logoAccepted from "src/images/accepted.svg";
import logoRefused from "src/images/refused.svg";

export interface Piece {
  id: string;
  statut: STATUT_PIECE | null;
}

interface ValidationProps {
  subject: Dossier | Enfant;
  value: JustificatifDossier | JustificatifEnfant;
  label: string;
  link?: string[] | string;
  pieces: Piece[];
  type: "Dossier" | "Enfant";
}

const Validation: React.FC<ValidationProps> = ({ pieces, type }) => {
  const [statePieces, setStatePieces] = React.useState<Piece[]>(pieces);
  return (
    <>
      {statePieces.map((piece) => (
        <div className={styles.validationRow} key={piece.id}>
          {piece.statut && piece.statut !== "EN_ATTENTE" && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              className={`${styles.labelStatus} ${
                piece.statut === "REFUSE" ? styles.refused : styles.accepted
              }`}
              onClick={async () => {
                setStatePieces(
                  [...statePieces].map((state) => {
                    if (state.id === piece.id) {
                      return { ...state, statut: null };
                    } else {
                      return state;
                    }
                  })
                );
                const url = "/api/sync/out/pieces";
                const fetching = await fetch(url, {
                  body: JSON.stringify({
                    id: piece.id,
                    statut: null,
                    type: type,
                  }),
                  method: "PUT",
                }).then(async (r) => {
                  if (!r.ok) {
                    return { error: "Something went wrong" };
                  }
                  return r.json();
                });
                return fetching as PieceDossier;
              }}
            >
              <Image
                src={piece.statut === "REFUSE" ? logoRefused : logoAccepted}
                alt="Enfants du Spectacle"
                width={15}
                height={15}
              />
              <span>{piece.statut}</span>
            </div>
          )}
          {!piece.statut && (
            <Select
              id={`${type}_${piece.id}`}
              selected={""}
              options={[
                { label: "Choisir", value: "" },
                { label: "Valider", value: "VALIDE" },
                { label: "Refuser", value: "REFUSE" },
              ]}
              onChange={async (e: React.FormEvent<HTMLInputElement>) => {
                setStatePieces(
                  [...statePieces].map((state) => {
                    if (state.id === piece.id) {
                      return { ...state, statut: e.target.value };
                    } else {
                      return state;
                    }
                  })
                );
                const url = "/api/sync/out/pieces";
                const fetching = await fetch(url, {
                  body: JSON.stringify({
                    id: piece.id,
                    statut: e.target.value,
                    type: type,
                  }),
                  method: "PUT",
                }).then(async (r) => {
                  if (!r.ok) {
                    return { error: "Something went wrong" };
                  }
                  return r.json();
                });
                return fetching as PieceDossier;
              }}
            />
          )}
        </div>
      ))}
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

const ValidationJustificatifsDossier: React.FC<Props> = ({
  dossier,
  dataLinks,
}) => {
  const justificatifs = [...JUSTIFICATIFS_DOSSIERS].sort(
    (a, b) =>
      dossier.justificatifs.includes(b.value) -
      dossier.justificatifs.includes(a.value)
  );
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => {
        return (
          <li key={value}>
            <Validation
              subject={dossier}
              value={value}
              label={label}
              type={"Dossier"}
              pieces={
                dossier.source === "FORM_EDS"
                  ? dataLinks.dossier?.piecesDossier.filter(
                      (piece: PieceDossier) => piece.type === value
                    )
                  : []
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
];

const ValidationJustificatifsEnfant: React.FC<{
  enfant: Enfant & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: Record<string, unknown>;
  dossier: Dossier;
}> = ({ enfant, dataLinks, dossier }) => {
  const justificatifs = [...JUSTIFICATIFS_ENFANTS].sort(
    (a, b) =>
      enfant.justificatifs.includes(b.value) -
      enfant.justificatifs.includes(a.value)
  );
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => {
        return (
          <li key={value}>
            <Validation
              subject={enfant}
              value={value}
              label={label}
              type={"Enfant"}
              pieces={
                dossier.source === "FORM_EDS"
                  ? dataLinks.enfants
                      ?.find((enfantTmp: Enfant) => {
                        return enfantTmp.id.toString() === enfant.externalId;
                      })
                      .piecesDossier.filter(
                        (piece: PieceDossierEnfant) => piece.type === value
                      )
                  : []
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export { ValidationJustificatifsDossier, ValidationJustificatifsEnfant };
