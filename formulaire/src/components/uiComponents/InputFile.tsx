import {
  JustificatifDossier,
  JustificatifEnfant,
  PieceDossier,
  STATUT_PIECE,
} from "@prisma/client";
import Image from "next/image";
import React from "react";
import CountPieces from "../CountPieces";
import styles from "./InputFile.module.scss";

type Doc = {
  id: number;
  nom: string | null;
  type: string;
  statut: STATUT_PIECE | null;
};

interface Props {
  id: JustificatifDossier | JustificatifEnfant;
  label: string;
  text: string;
  docs: Doc[];
  docsTokenized?: {
    id: number;
    piecesDossier: (PieceDossier & { path: string })[];
  };
  allowChanges: Boolean;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: string) => void;
}

const InputFile: React.FC<Props> = ({
  id,
  label,
  text,
  docs,
  docsTokenized,
  allowChanges,
  handleFile,
  handleDelete,
}) => {
  return (
    <div className={styles.InputFile}>
      <label htmlFor={id} className="mb-2 italic">
        {label}
      </label>

      <p className={styles.smallText}>{text}</p>
      <div>
        <CountPieces
          piecesJustif={docs
            .filter((doc) => doc.type === id)
            .map((doc) => doc.statut)}
        ></CountPieces>
      </div>
      {docs.length > 0 && (
        <div className={styles.fileUploaded}>
          {docs
            .filter((doc) => {
              return doc.type === id;
            })
            .map((doc, index) => {
              const cleanFileName = (originalFilename: string): string => {
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
              };
              return (
                <div key={`${doc.nom}_${index}`}>
                  <div className={styles.rowDoc}>
                    {!allowChanges && doc.statut !== "VALIDE" && (
                      <div
                        className={styles.deleteDoc}
                        onClick={() => handleDelete(doc.id.toString())}
                      >
                        <Image
                          src={`/images/trash.svg`}
                          alt="Supprimer"
                          width={20}
                          height={20}
                        />
                      </div>
                    )}

                    {docsTokenized && (
                      <a
                        href={`/api/download/pieces/${doc.id}?view=inline`}
                        target="_blank"
                        key={`piece_justificative_${id}_${index}`}
                        className={`${
                          doc.statut === "REFUSE"
                            ? styles.refused
                            : doc.statut === "VALIDE"
                            ? styles.accepted
                            : ""
                        }`}
                      >
                        {cleanFileName(doc.nom || "document")}
                      </a>
                    )}
                    {!docsTokenized && (
                      <span
                        key={`piece_justificative_${id}_${index}`}
                        className={`${
                          doc.statut === "REFUSE"
                            ? styles.refused
                            : doc.statut === "VALIDE"
                            ? styles.accepted
                            : ""
                        }`}
                      >
                        {cleanFileName(doc.nom || "document")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {docs.filter((doc) => {
        return doc.type === id;
      }).length < 3 &&
        !allowChanges && (
          <div className="Form--field">
            <input
              type="file"
              id={id}
              name="justificatif"
              placeholder="Parcourir..."
              accept="image/jpeg,image/gif,image/png,application/pdf,text/plain"
              onChange={handleFile}
            ></input>
            <p className={styles.smallText}>
              Documents acceptés : jpeg, png, pdf
            </p>
          </div>
        )}
    </div>
  );
};

export default InputFile;
