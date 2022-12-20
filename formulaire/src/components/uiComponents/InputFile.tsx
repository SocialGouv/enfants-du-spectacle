import { JustificatifDossier, JustificatifEnfant, PieceDossier, PieceDossierEnfant } from "@prisma/client";
import Image from "next/image";
import { doc } from "prettier";
import React from "react";
import styles from "./InputFile.module.scss";

type Doc = {
    id: number,
    nom: string,
    type: string
}

interface Props {
    id: JustificatifDossier | JustificatifEnfant,
    label: string,
    text: string,
    docs: Doc[],
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDelete: (id: string) => void
}

const InputFile: React.FC<Props> = ({ id, label, text, docs, handleFile, handleDelete }) => {

    return (
        <div className={styles.InputFile}>
            <label htmlFor={id} className="mb-2 italic">
                {label}
            </label>

            <p className={styles.smallText}>
                {text}
            </p>
            {docs.length > 0 &&
                <div className={styles.fileUploaded}>
                    {docs.filter(doc => {return doc.type === id}).map((doc, index) => (
                        <div className={styles.rowDoc} onClick={() => {handleDelete(doc.id.toString())}}>
                            <div className={styles.deleteDoc}>
                                <Image
                                    src={`/images/trash.svg`}
                                    alt="Supprimer"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <span key={`piece_justificative_${id}_${index}`}>{doc.nom}</span>
                        </div>
                    ))}
                </div>
            }
            {docs.filter(doc => {return doc.type === id}).length < 3 && 
                <div className="Form--field">
                    <input type="file"
                        id={id} name="avatar"
                        accept=".doc,.docx,image/jpeg,image/gif,image/png,application/pdf,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={handleFile}>
                    </input>
                </div>
            }
        </div>
    );
};

export default InputFile;