import { JustificatifDossier, JustificatifEnfant, PieceDossier, PieceDossierEnfant, STATUT_PIECE } from "@prisma/client";
import Image from "next/image";
import { doc } from "prettier";
import React from "react";
import styles from "./InputFile.module.scss";

type Doc = {
    id: number,
    nom: string,
    type: string,
    statut: STATUT_PIECE
}

interface Props {
    id: JustificatifDossier | JustificatifEnfant,
    label: string,
    text: string,
    docs: Doc[],
    allowChanges: Boolean,
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDelete: (id: string) => void
}

const InputFile: React.FC<Props> = ({ id, label, text, docs, allowChanges, handleFile, handleDelete }) => {

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
                        <div key={`${doc.nom}_${index}`}>
                            <div className={styles.rowDoc}>
                                {!allowChanges &&
                                    <div className={styles.deleteDoc} onClick={() => {handleDelete(doc.id.toString())}}>
                                        <Image
                                            src={`/images/trash.svg`}
                                            alt="Supprimer"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                }
                                <span key={`piece_justificative_${id}_${index}`} className={`${doc.statut === 'REFUSE' ? styles.refused : doc.statut === 'VALIDE' ? styles.accepted : ''}`}>{doc.nom}</span>
                                {doc.statut &&
                                        <span key={`piece_justificative_${id}_${index}`} className={`${doc.statut === 'REFUSE' ? styles.refused  : doc.statut === 'VALIDE' ? styles.accepted  : ''}`}>{` - ${doc.statut}`}</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            }
            {docs.filter(doc => {return doc.type === id}).length < 3 && !allowChanges &&
                <div className="Form--field">
                    <input type="file"
                        id={id} name="justificatif"
                        placeholder="Parcourir..."
                        accept="image/jpeg,image/gif,image/png,application/pdf,text/plain" onChange={handleFile}>
                    </input>
                </div>
            }
        </div>
    );
};

export default InputFile;