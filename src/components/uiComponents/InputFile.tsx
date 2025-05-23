import type {
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossier,
  STATUT_PIECE,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { BiLoader, BiTrash } from "react-icons/bi";

import ButtonLink from "./button/buttonLink";
import styles from "./InputFile.module.scss";
import IconLoader from "../IconLoader";

interface Doc {
  id: string;
  nom: string;
  type: string;
  statut: STATUT_PIECE | null;
  link: string;
}

interface Props {
  id: JustificatifDossier | JustificatifEnfant;
  label: string;
  text: string;
  docs: Doc[];
  docsTokenized?: {
    id: number;
    piecesDossier: (PieceDossier & { path: string })[];
  };
  allowChanges: boolean;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: string) => void;
  isLoading?: boolean;
}

const InputFile: React.FC<Props> = ({
  id,
  label,
  text,
  docs,
  handleFile,
  handleDelete,
  isLoading = false,
}) => {
  const { data: session } = useSession();
  const [showDialogue, setShowDialogue] = React.useState<boolean>(false);
  const cleanFileName = (originalFilename: string | null | undefined): string => {
    if (!originalFilename) {
      return "Fichier sans nom";
    }
    
    try {
      const cleaned = originalFilename
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, (match) => {
          const specialChars: Record<string, string> = {
            è: "e",
            ç: "c",
            à: "a",
            "¨": "",
            "~": "",
            ê: "e",
            î: "i",
            ĩ: "i",
          };

          return specialChars[match] || match;
        })
        .replace(/@/g, "")
        .replace(/\s/g, "_");

      return cleaned;
    } catch (error) {
      console.error("Error cleaning filename:", error, "Original filename:", originalFilename);
      return String(originalFilename);
    }
  };

  return (
    <div className={styles.InputFile}>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <IconLoader />
          <span className={styles.loadingText}>Chargement en cours...</span>
        </div>
      )}
      <label htmlFor={id} className="mb-2 italic">
        {label}
      </label>

      <p className={styles.smallText}>{text}</p>
      {docs.length > 0 && (
        <div className={styles.fileUploaded}>
          {docs
            .filter((doc) => {
              return doc.type === id;
            })
            .map((doc, index) => (
              <div key={`${doc.nom}_${index}`}>
                <div className={styles.rowDoc}>
                  <a
                    href={`${doc.link}`}
                    target="_blank"
                    key={`piece_justificative_${id}_${index}`}
                    className={`${
                      doc.statut === "REFUSE"
                        ? styles.refused
                        : doc.statut === "VALIDE"
                        ? styles.accepted
                        : ""
                    }`}
                    rel="noreferrer"
                  >
                    {cleanFileName(doc.nom)}
                  </a>
                  {session && session.dbUser.role === "MEDECIN" && (
                    <div className={styles.medecinBloc}>
                      {showDialogue && (
                        <div className={styles.confirmDialogueWrapper}>
                          <div className={styles.confirmDialogue}>
                            <div className={styles.confirmTitle}>
                              Voulez-vous supprimer cette pièce jointe ?
                            </div>
                            <div className={styles.btnList}>
                              <ButtonLink
                                red
                                onClick={() => {
                                  setShowDialogue(false);
                                  handleDelete(doc.id);
                                }}
                              >
                                Oui
                              </ButtonLink>
                              <ButtonLink
                                onClick={() => {
                                  setShowDialogue(false);
                                }}
                              >
                                Non
                              </ButtonLink>
                            </div>
                          </div>
                        </div>
                      )}
                      <BiTrash
                        size={20}
                        className={styles.trashIcon}
                        onClick={() => {
                          setShowDialogue(true);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      {docs.length === 0 && (
        <div className="Form--field">
          {!isLoading ? (
            <>
              <input
                type="file"
                id={id}
                name="justificatif"
                placeholder="Parcourir..."
                accept="image/jpeg,image/gif,image/png,application/pdf,text/plain"
                onChange={handleFile}
                disabled={isLoading}
              />
              <p className={styles.smallText}>
                Documents acceptés : jpeg, png, pdf
              </p>
            </>
          ) : (
            <p className={styles.smallText}>
              Téléchargement en cours, veuillez patienter...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputFile;
