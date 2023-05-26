import { JustificatifDossier, JustificatifEnfant, PieceDossier, STATUT_PIECE } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./InputFile.module.scss";

type Doc = {
    nom: string,
    type: string,
    statut: STATUT_PIECE | null,
    link: string
}

interface Props {
    id: JustificatifDossier | JustificatifEnfant,
    label: string,
    text: string,
    docs: Doc[],
    docsTokenized?: {id: number, piecesDossier: (PieceDossier & {path: string})[]}
    allowChanges: Boolean,
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDelete: (id: string) => void
}

const InputFile: React.FC<Props> = ({ id, label, text, docs, docsTokenized, allowChanges, handleFile, handleDelete }) => {

    console.log('docs : ', docs)

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
                                <a href={`${doc.link}`} 
                                    target="_blank"
                                    key={`piece_justificative_${id}_${index}`} 
                                    className={`${doc.statut === 'REFUSE' ? styles.refused : doc.statut === 'VALIDE' ? styles.accepted : ''}`}
                                    >{doc.type}</a>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {docs.length === 0 &&
                <div className="Form--field">
                    <input type="file"
                        id={id} name="justificatif"
                        placeholder="Parcourir..."
                        accept="image/jpeg,image/gif,image/png,application/pdf,text/plain" onChange={handleFile}>
                    </input>
                    <p className={styles.smallText}>Documents acceptés : jpeg, png, pdf</p>
                </div>
            }
        </div>
    );
};

export default InputFile;