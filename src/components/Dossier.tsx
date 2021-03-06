import { Icon, Title } from "@dataesr/react-dsfr";
import router from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import styles from "src/components/Dossier.module.scss";
import DossierActionBar from "src/components/DossierActionBar";
import Enfant from "src/components/Enfant";
import Foldable from "src/components/Foldable";
import IconLoader from "src/components/IconLoader";
import Info from "src/components/Info";
import InfoSociete from "src/components/InfoSociete";
import { JustificatifsDossier } from "src/components/Justificatifs";
import { useDossier } from "src/lib/api";
import { frenchDateText, typeEmploiLabel, TYPES_EMPLOI } from "src/lib/helpers";
import { generateDA } from "src/lib/pdf/pdfGenerateDA";
import { generateFE } from "src/lib/pdf/pdfGenerateFE";
import { deleteDossier } from "src/lib/queries";

interface Props {
  dossierId: number;
  dataLinks: Record<string, unknown>;
}

const Dossier: React.FC<Props> = ({ dossierId, dataLinks }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);
  const { data: session } = useSession();

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  return (
    <>
      <DossierActionBar dossierId={dossierId} />
      <div className={styles.dossierSummaryBloc}>
        <div>
          <Info title="Type de projet">
            <CategorieDossierTag dossier={dossier} />
          </Info>
        </div>
        <div>
          <Info title="Dates">
            Du <b>{frenchDateText(dossier.dateDebut)}</b> au{" "}
            <b>{frenchDateText(dossier.dateFin)}</b>
          </Info>
          <Info
            title="Présentation générale"
            className={`${styles.info} ${styles.infoSuccessive}`}
          >
            <Foldable>
              <span
                dangerouslySetInnerHTML={{
                  __html: dossier.presentation.replace(/\n/g, "<br />"),
                }}
              />
            </Foldable>
          </Info>
          <Info title="Scènes sensibles" className={styles.infoSuccessive}>
            {dossier.scenesSensibles.length == 0 && <span>aucune</span>}
            {dossier.scenesSensibles.length > 0 &&
              dossier.scenesSensibles.join(", ")}
          </Info>
        </div>
        <Info title="Pièces justificatives">
          <JustificatifsDossier dossier={dossier} dataLinks={dataLinks} />
        </Info>
        {dossier.statut !== "INSTRUCTION" && dossier.statut !== "CONSTRUCTION" && (
          <button
            className="postButton"
            onClick={() => {
              generateFE([dossier]);
            }}
          >
            Télécharger Fiche Emploi
          </button>
        )}
        {dossier.statut == "ACCEPTE" && (
          <button
            className="postButton"
            onClick={() => {
              generateDA([dossier]);
            }}
          >
            Télécharger Décision autorisation
          </button>
        )}
        {session.dbUser.role === "ADMIN" && (
          <button
            className="deleteButton"
            onClick={() => {
              if (
                window.confirm("Souhaitez-vous vraiment supprimer ce dossier?")
              ) {
                deleteDossier(dossier.id);
                router.push("/dossiers").catch((e) => {
                  console.log(e);
                });
              }
            }}
          >
            Supprimer dossier
          </button>
        )}
        <br />
      </div>

      <div className={styles.societeSummaryBloc}>
        <Info title="Société">
          <InfoSociete
            societeProduction={dossier.societeProduction}
            conventionCollectiveCode={dossier.conventionCollectiveCode}
          />
        </Info>
        <Info title="Demandeur">
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
      </div>

      <Title as="h3">Enfants</Title>
      {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
      {TYPES_EMPLOI.map((typeEmploi, index) => (
        <span key={index}>
          {dossier.enfants.filter(function (element) {
            return typeEmploiLabel(element.typeEmploi) === typeEmploi.label;
          }).length > 0 ? (
            <h4>{typeEmploi.label}</h4>
          ) : (
            ""
          )}
          {dossier.enfants
            .filter(function (element) {
              return typeEmploiLabel(element.typeEmploi) === typeEmploi.label;
            })
            .sort(function (a, b) {
              if (a.nom < b.nom) {
                return -1;
              }
              if (a.nom > b.nom) {
                return 1;
              }
              if (a.prenom < b.prenom) {
                return -1;
              }
              if (a.prenom > b.prenom) {
                return 1;
              }
              return 0;
            })
            .map((enfant) => (
              <div key={enfant.id} className={styles.bloc}>
                <Enfant enfant={enfant} dataLinks={dataLinks} />
              </div>
            ))}
        </span>
      ))}
    </>
  );
};

export default Dossier;
