import { Select } from "@dataesr/react-dsfr";
import type {
  Dossier,
  Enfant,
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossierEnfant,
  STATUT_PIECE,
} from "@prisma/client";
import Image from "next/image";
import React from "react";
import { mutate } from "swr";
import styles from "src/components/Justificatifs.module.scss";
import justifStyles from "./DossierJustificatifs.module.scss";
import logoAccepted from "src/images/accepted.svg";
import logoRefused from "src/images/refused.svg";
import { frenchDateHour } from "src/lib/helpers";
import { sendEmail, getDossierUserEmails } from "src/lib/queries";

// Define piece structure
interface PieceDoc {
  id: string;
  type: string;
  link: string;
  statut: STATUT_PIECE | null;
  createdAt: Date;
}

interface DocsData {
  dossier: {
    id: number;
    piecesDossier: PieceDoc[];
  };
  enfants: Array<{
    id: number;
    piecesDossier: PieceDoc[];
  }>;
}

// Main component for showing and validating justificatifs
interface DossierJustificatifsProps {
  dossier: Dossier & {
    piecesDossier: PieceDossierEnfant[];
    docs?: DocsData;
  };
  showValidation?: boolean;
}

// Constants for justificatif types
const JUSTIFICATIFS_DOSSIERS: { value: JustificatifDossier; label: string }[] =
  [
    { label: "Synopsis", value: "SYNOPSIS" },
    { label: "Scénario", value: "SCENARIO" },
    { label: "Mesures de sécurité", value: "MESURES_SECURITE" },
    { label: "Plan de travail", value: "PLAN_TRAVAIL" },
    { label: "Infos complémentaires", value: "INFOS_COMPLEMENTAIRES" },
  ];

const JUSTIFICATIFS_ENFANTS: { value: JustificatifEnfant; label: string }[] = [
  { label: "Livret de famille", value: "LIVRET_FAMILLE" },
  { label: "Autorisation parentale", value: "AUTORISATION_PARENTALE" },
  { label: "Situations particulières", value: "SITUATION_PARTICULIERE" },
  { label: "Contrat de travail", value: "CONTRAT" },
  { label: "Certificat de scolarité", value: "CERTIFICAT_SCOLARITE" },
  { label: "Avis pédagogique 1er dégré", value: "AVIS_PEDAGOGIQUE_1ER_DEGRE" },
  { label: "Avis pédagogique 2nd degré", value: "AVIS_PEDAGOGIQUE_2ND_DEGRE" },
  { label: "Avis DASEN", value: "AVIS_DASEN" },
  {
    label: "Avis médical (médecin généraliste ou pédiatre)",
    value: "AVIS_MEDICAL",
  },
  {
    label: "Avis médical (Thalie santé ou partenaire)",
    value: "AVIS_MEDICAL_THALIE",
  },
  { label: "Dispense Thalie santé", value: "AUTORISATION_PRISE_EN_CHARGE" },
  { label: "bon de prise en charge", value: "BON_PRISE_EN_CHARGE" },
  {
    label: "Déclaration sur l'honneur de l'enfant âgé de plus de 13 ans",
    value: "DECLARATION_HONNEUR",
  },
];

// Unified component for displaying a single justificatif
interface JustificatifItemProps {
  label: string;
  docPieces: PieceDoc[];
  showValidation: boolean;
  documentType: string;
  dossierId: number;
  enfantInfo?: { nom: string; prenom: string };
}

const JustificatifItem: React.FC<JustificatifItemProps> = ({
  label,
  docPieces,
  showValidation,
  documentType,
  dossierId,
  enfantInfo,
}) => {
  const [pieces, setPieces] = React.useState<PieceDoc[]>(docPieces);

  // Update state when doc pieces change
  React.useEffect(() => {
    setPieces(docPieces);
  }, [docPieces]);

  // Handle validation status change
  const handleValidationChange = async (
    pieceId: string,
    newStatus: STATUT_PIECE | null
  ) => {
    // Update local state optimistically
    setPieces(
      pieces.map((piece) => {
        if (piece.id === pieceId) {
          return { ...piece, statut: newStatus };
        }
        return piece;
      })
    );

    // Send update to API
    try {
      const url = "/api/sync/out/pieces";
      await fetch(url, {
        body: JSON.stringify({
          id: pieceId,
          statut: newStatus,
          type: documentType === "enfant" ? "Enfant" : "Dossier",
        }),
        method: "PUT",
      });

      // Invalidate SWR cache to sync with database
      mutate(`/api/dossiers/${dossierId}`);

      // Send email notification if piece is refused
      if (newStatus === "REFUSE") {
        try {
          // Get dossier info
          const dossierResponse = await fetch(`/api/dossiers/${dossierId}`);
          if (!dossierResponse.ok) {
            throw new Error(
              `Failed to fetch dossier: ${dossierResponse.status}`
            );
          }
          const dossierInfo = await dossierResponse.json();

          // Get user emails
          const userEmails = await getDossierUserEmails(dossierId);

          // Prepare enfant name if applicable
          const enfantName = enfantInfo
            ? `${enfantInfo.prenom} ${enfantInfo.nom}`
            : undefined;

          // Send email to each user
          for (const email of userEmails) {
            sendEmail(
              "piece_refused",
              "", // no attachment
              dossierInfo,
              email,
              "",
              {
                pieceName: label,
                enfantName,
                documentType,
              }
            );
          }
        } catch (error) {
          console.error("Error sending refusal emails:", error);
        }
      }
    } catch (error) {
      console.error("Failed to update document status:", error);
      // Revert the state if the API call fails
      setPieces(docPieces);
    }
  };

  // Check if document is present by looking at pieces array
  const isPresent = pieces.length > 0;

  // If no documents uploaded yet, just show the name with an X
  if (!isPresent) {
    return (
      <div className={justifStyles.justificatifRow}>
        <div className={justifStyles.documentInfo}>
          <span className={justifStyles.statusIcon} style={{ color: "red" }}>
            ✗
          </span>
          <span className={justifStyles.documentName}>{label}</span>
        </div>
        {showValidation && (
          <div className={justifStyles.validationControls}>
            {/* Empty validation area when no document */}
          </div>
        )}
      </div>
    );
  }

  // Show documents with links
  return (
    <>
      {pieces.map((piece, index) => (
        <div key={index} className={justifStyles.justificatifRow}>
          <div className={justifStyles.documentInfo}>
            <span
              className={justifStyles.statusIcon}
              style={{ color: "green" }}
            >
              ✓
            </span>
            <a
              href={`/api/download/${
                documentType === "enfant" ? "pieces-enfant" : "pieces-dossier"
              }/${piece.id}?view=inline`}
              target="_blank"
              rel="noreferrer"
              className={justifStyles.documentLink}
            >
              {label.length > 50 ? label.slice(0, 50) + "..." : label}
            </a>
            {piece.createdAt && (
              <p>Déposé le {frenchDateHour(piece.createdAt ?? new Date())}</p>
            )}
          </div>

          {/* Validation controls if showValidation is true */}
          {showValidation && (
            <div className={justifStyles.validationControls}>
              {piece.statut && piece.statut !== "EN_ATTENTE" ? (
                // Show status indicator with ability to clear
                <div
                  className={`${justifStyles.labelStatus} ${
                    piece.statut === "REFUSE"
                      ? justifStyles.refused
                      : justifStyles.accepted
                  }`}
                  onClick={() => handleValidationChange(piece.id, null)}
                >
                  <img
                    src={
                      piece.statut === "REFUSE"
                        ? logoRefused.src
                        : logoAccepted.src
                    }
                    alt="Status"
                    width={15}
                    height={15}
                    style={{ display: "inline-block" }}
                  />
                  <span>{piece.statut}</span>
                </div>
              ) : (
                // Show dropdown to set status
                <div className={justifStyles.compactSelect}>
                  <Select
                    id={`piece_${piece.id}`}
                    selected={""}
                    options={[
                      { label: "Choisir", value: "" },
                      { label: "Valider", value: "VALIDE" },
                      { label: "Refuser", value: "REFUSE" },
                    ]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const valueSelected = e.target.value as STATUT_PIECE;
                      if (valueSelected) {
                        handleValidationChange(piece.id, valueSelected);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// Component for dossier justificatifs
const DossierJustificatifs: React.FC<DossierJustificatifsProps> = ({
  dossier,
  showValidation = false,
}) => {
  if (!dossier) return null;

  // Sort justificatifs to show present ones first
  const sortedJustificatifs = [...JUSTIFICATIFS_DOSSIERS].sort(
    (a, b) =>
      (dossier.justificatifs.includes(b.value) ? 1 : 0) -
      (dossier.justificatifs.includes(a.value) ? 1 : 0)
  );

  return (
    <ul className={styles.justificatifs}>
      {sortedJustificatifs.map(({ label, value }) => {
        // Check if this justificatif is present in the dossier
        const isPresent = dossier.justificatifs.includes(value);

        // Get matching pieces from docs if available
        const docPieces =
          dossier.docs?.dossier.piecesDossier.filter(
            (piece) => piece.type === value
          ) || [];

        return (
          <li key={value} style={{ marginBottom: "16px" }}>
            <JustificatifItem
              label={label}
              docPieces={docPieces}
              showValidation={showValidation}
              documentType="dossier"
              dossierId={dossier.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

// Component for enfant justificatifs
interface EnfantJustificatifsProps {
  enfant: Enfant;
  dossier: Dossier & {
    docs?: DocsData;
  };
  showValidation?: boolean;
}

const EnfantJustificatifs: React.FC<EnfantJustificatifsProps> = ({
  enfant,
  dossier,
  showValidation = false,
}) => {
  if (!enfant || !dossier) return null;

  // Keep original order of justificatifs
  const sortedJustificatifs = [...JUSTIFICATIFS_ENFANTS];

  return (
    <ul className={styles.justificatifs}>
      {sortedJustificatifs.map(({ label, value }) => {
        // Check if this justificatif is present for the enfant
        const isPresent = enfant.justificatifs.includes(value);

        // Find this enfant in the docs and get its pieces
        const enfantDocs = dossier.docs?.enfants.find(
          (e) =>
            e.id ===
            (enfant.externalId ? parseInt(enfant.externalId) : enfant.id)
        );

        // Get matching pieces for this justificatif type
        const docPieces =
          enfantDocs?.piecesDossier.filter((piece) => piece.type === value) ||
          [];

        return (
          <li key={value} style={{ marginBottom: "16px" }}>
            <JustificatifItem
              label={label}
              docPieces={docPieces}
              showValidation={showValidation}
              documentType="enfant"
              dossierId={dossier.id}
              enfantInfo={{
                nom: enfant.nom || "",
                prenom: enfant.prenom || "",
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export { DossierJustificatifs, EnfantJustificatifs };
