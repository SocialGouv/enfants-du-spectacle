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

// Create separate interfaces for dossier and enfant validation
interface ValidationDossierProps {
  label: string;
  link?: string[] | string;
  pieces: Piece[];
  subject: Dossier;
  value: JustificatifDossier;
  type: "Dossier";
}

interface ValidationEnfantProps {
  label: string;
  link?: string[] | string;
  pieces: Piece[];
  subject: Enfant;
  value: JustificatifEnfant;
  type: "Enfant";
}

// Create separate components for dossier and enfant validation
const ValidationDossier: React.FC<ValidationDossierProps> = ({ pieces, type }) => {
  const [statePieces, setStatePieces] = React.useState<Piece[]>(pieces);
  return (
    <div style={{ marginBottom: "35px" }}>
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
              <img 
                src={piece.statut === "REFUSE" ? logoRefused.src : logoAccepted.src}
                alt="Enfants du Spectacle"
                width={15}
                height={15}
                style={{ display: 'inline-block' }}
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
              onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                const valueSelected = e.target.value as STATUT_PIECE;
                setStatePieces(
                  [...statePieces].map((state) => {
                    if (state.id === piece.id) {
                      return { ...state, statut: valueSelected };
                    } else {
                      return state;
                    }
                  })
                );
                const url = "/api/sync/out/pieces";
                const fetching = await fetch(url, {
                  body: JSON.stringify({
                    id: piece.id,
                    statut: valueSelected as STATUT_PIECE,
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
    </div>
  );
};

// Create the equivalent component for enfant
const ValidationEnfant: React.FC<ValidationEnfantProps> = ({ pieces, type }) => {
  const [statePieces, setStatePieces] = React.useState<Piece[]>(pieces);
  return (
    <div style={{ marginBottom: "35px" }}>
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
              <img 
                src={piece.statut === "REFUSE" ? logoRefused.src : logoAccepted.src}
                alt="Enfants du Spectacle"
                width={15}
                height={15}
                style={{ display: 'inline-block' }}
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
              onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                const valueSelected = e.target.value as STATUT_PIECE;
                setStatePieces(
                  [...statePieces].map((state) => {
                    if (state.id === piece.id) {
                      return { ...state, statut: valueSelected };
                    } else {
                      return state;
                    }
                  })
                );
                const url = "/api/sync/out/pieces";
                const fetching = await fetch(url, {
                  body: JSON.stringify({
                    id: piece.id,
                    statut: valueSelected as STATUT_PIECE,
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
    </div>
  );
};

interface Props {
  dossier: Dossier & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: Record<string, unknown> | null;
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
      (dossier.justificatifs.includes(b.value) ? 1 : 0) -
      (dossier.justificatifs.includes(a.value) ? 1 : 0)
  );
  
  return (
    <ul className={styles.justificatifs}>
      {justificatifs.map(({ label, value }) => {
        // Get pieces from appropriate source based on dossier source
        let pieces: Piece[] = [];
        
        // If it's from FORM_EDS and dataLinks exists, try to get pieces from dataLinks
        if (dossier.source === "FORM_EDS" && dataLinks) {
          
          // Safely check and access dataLinks properties with type safety
          if (dataLinks && 
              typeof dataLinks === 'object' && 
              'dossier' in dataLinks && 
              dataLinks.dossier && 
              typeof dataLinks.dossier === 'object' &&
              'piecesDossier' in dataLinks.dossier && 
              Array.isArray(dataLinks.dossier.piecesDossier)) {
            
            const dataLinkPieces = dataLinks.dossier.piecesDossier
              .filter((piece: any) => {
                // Use string comparison to avoid type issues
                return String(piece.type) === String(value);
              })
              .map((piece: any) => ({
                id: String(piece.id),
                statut: piece.statut
              }));
            
            if (dataLinkPieces.length > 0) {
              pieces = dataLinkPieces;
            }
          }
        }
        
        // If no pieces found in dataLinks or not FORM_EDS, try dossier.piecesDossier
        if (pieces.length === 0 && dossier.piecesDossier && dossier.piecesDossier.length > 0) {
          
          // Use type safe comparison by casting the value first
          const filteredPieces = dossier.piecesDossier.filter(piece => {
            // Convert both to strings to avoid type issues
            return String(piece.type) === String(value);
          });
          
          pieces = filteredPieces.map(piece => ({
            id: String(piece.id),
            statut: piece.statut
          }));
          
        }
        
        return (
          <li key={value}>
            <ValidationDossier
              subject={dossier}
              value={value}
              label={label}
              type={"Dossier"}
              pieces={pieces}
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

const ValidationJustificatifsEnfant: React.FC<{
  enfant: Enfant & { piecesDossier: PieceDossierEnfant[] };
  dataLinks: Record<string, unknown> | null;
  dossier: Dossier;
}> = ({ enfant, dataLinks, dossier }) => {
  
  const justificatifs = [...JUSTIFICATIFS_ENFANTS].sort(
    (a, b) =>
      (enfant.justificatifs.includes(b.value) ? 1 : 0) -
      (enfant.justificatifs.includes(a.value) ? 1 : 0)
  );
  
  return (
    <ul className={styles.justificatifs} style={{ marginBottom: "40px" }}>
      {justificatifs.map(({ label, value }) => {
        // Get pieces from appropriate source
        let pieces: Piece[] = [];
        
        // First try to get pieces from dataLinks (for FORM_EDS source)
        if (dossier.source === "FORM_EDS" && dataLinks && 
            typeof dataLinks === 'object' && 
            'enfants' in dataLinks && 
            Array.isArray(dataLinks.enfants)) {
          
          const foundEnfant = dataLinks.enfants.find(
            (enfantTmp: any) => enfantTmp.id.toString() === enfant.externalId
          );
          
          if (foundEnfant && foundEnfant.piecesDossier && Array.isArray(foundEnfant.piecesDossier)) {
            
            // Use String comparison to avoid type issues
            const filteredPieces = foundEnfant.piecesDossier.filter(
              (piece: any) => String(piece.type) === String(value)
            );
            
            
            pieces = filteredPieces.map((piece: any) => ({
              id: String(piece.id),
              statut: piece.statut
            }));
          }
        }
        
        // If no pieces found in dataLinks or not FORM_EDS, try enfant.piecesDossier as fallback
        if (pieces.length === 0 && enfant.piecesDossier && enfant.piecesDossier.length > 0) {
          
          // Use type safe comparison by casting the value first
          const filteredPieces = enfant.piecesDossier.filter(piece => {
            // Convert both to strings to avoid type issues
            return String(piece.type) === String(value);
          });
          
          pieces = filteredPieces.map(piece => ({
            id: String(piece.id),
            statut: piece.statut
          }));
          
        }
        
        return (
          <li key={value}>
            <ValidationEnfant
              subject={enfant}
              value={value}
              label={label}
              type={"Enfant"}
              pieces={pieces}
            />
          </li>
        );
      })}
    </ul>
  );
};

export { ValidationJustificatifsDossier, ValidationJustificatifsEnfant };
