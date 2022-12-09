
import { Container } from "@dataesr/react-dsfr";
import React from "react";
import { DossierData } from "../../fetching/dossiers";
import { frenchDateText } from "../../lib/helpers";
import styles from "./HeadingDossier.module.scss";

interface Props {
    dossier: DossierData
}

const HeadingDossier: React.FC<Props> = ({ dossier }) => {
    return (
        <div className={styles.headingDossier}>
            <Container>
                <h4>Enfants du spectacle</h4>
                <h2>Dossier n° {dossier.id} en brouillon depuis le {frenchDateText(dossier.dateDerniereModification)}</h2>
            </Container>
        </div>
    );
};

export default HeadingDossier;