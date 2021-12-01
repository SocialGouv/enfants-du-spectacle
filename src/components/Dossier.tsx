import { Icon, Title } from "@dataesr/react-dsfr";
import React from "react";
import AssignedAgentSelect from "src/components/AssignedAgentSelect";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import ChangeStatutDossierButton from "src/components/ChangeStatutDossierButton";
import styles from "src/components/Dossier.module.scss";
import Enfant from "src/components/Enfant";
import IconLoader from "src/components/IconLoader";
import Info from "src/components/Info";
import InfoSociete from "src/components/InfoSociete";
import { JustificatifsDossier } from "src/components/Justificatifs";
import { useDossier } from "src/lib/api";
import { categorieToLabel } from "src/lib/categories";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";

interface Props {
  dossierId: number;
}

const Dossier: React.FC<Props> = ({ dossierId }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  return (
    <>
      <div className={styles.title}>
        <Title as="h1">Le Dossier</Title>
        <ChangeStatutDossierButton dossier={dossier} />
      </div>

      <div className={styles.dossierSummaryBloc}>
        <div>
          <Info title="Suivi par" className={styles.infoSelect}>
            <AssignedAgentSelect dossierId={dossierId} />
          </Info>
          <Info title="Commission" className={styles.infoSuccessive}>
            {frenchDateText(dossier.commission.date)} -{" "}
            {frenchDepartementName(dossier.commission.departement)}
          </Info>
          <Info title="Catégorie" className={styles.infoSuccessive}>
            {categorieToLabel(dossier.categorie)}
            <br />
            <CategorieDossierTag dossier={dossier} size="sm" />
          </Info>
          <Info title="Scènes sensibles" className={styles.infoSuccessive}>
            {dossier.scenesSensibles.length == 0 && <span>N/A</span>}
            {dossier.scenesSensibles.length > 0 && (
              <ul>
                {dossier.scenesSensibles.map((sceneSensible) => (
                  <li key={sceneSensible}>{sceneSensible}</li>
                ))}
              </ul>
            )}
          </Info>
        </div>
        <div>
          <Info title="Dates">
            {frenchDateText(dossier.dateDebut)} -{" "}
            {frenchDateText(dossier.dateFin)}
          </Info>
          <Info title="Présentation générale" className={styles.info}>
            {dossier.presentation}
          </Info>
        </div>
        <Info title="Pièces justificatives">
          <JustificatifsDossier dossier={dossier} />
        </Info>
      </div>

      <div className={styles.societeSummaryBloc}>
        <Info title="Demandeur" className={styles.infoSuccessive}>
          <div>
            {dossier.demandeur.prenom} {dossier.demandeur.nom}
          </div>
          <div title="Fonction(s)">{dossier.demandeur.fonction}</div>
          <div>
            <a href={`mailto:${dossier.demandeur.email}`}>
              ✉️ {dossier.demandeur.email}
            </a>
          </div>
          <div>
            <a href={`tel:${dossier.demandeur.phone}`}>
              📞 {dossier.demandeur.phone}
            </a>
          </div>
        </Info>
        <Info title="Société">
          <InfoSociete societeProduction={dossier.societeProduction} />
        </Info>
      </div>

      <Title as="h3">Enfants</Title>
      {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
      {dossier.enfants.map((enfant) => (
        <div key={enfant.id} className={styles.bloc}>
          <Enfant enfant={enfant} />
        </div>
      ))}
    </>
  );
};

export default Dossier;
