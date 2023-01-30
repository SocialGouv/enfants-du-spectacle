import { Icon } from "@dataesr/react-dsfr";
import router from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
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
import { deleteDossier, sendEmail } from "src/lib/queries";

interface Props {
  dossierId: number;
  dataLinks: Record<string, unknown>;
}

const Dossier: React.FC<Props> = ({ dossierId, dataLinks }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);
  const { data: session } = useSession();
  const [showTable, setShowTable] = React.useState<boolean>(true);
  const [showCommentSection, setShowCommentSection] =
    React.useState<boolean>(false);
  const [showCompanySection, setShowCompanySection] =
    React.useState<boolean>(false);

  const JUSTIFICATIFS_DOSSIERS: { status: string; label: string }[] = [
    { label: "Synopsis", status: "VALIDÉ" },
    { label: "Scénario", status: "REFUSÉ" },
    { label: "Mesures de sécurité", status: "VALIDÉ" },
    { label: "Plan de travail", status: "REFUSÉ" },
    { label: "Infos complémentaires", status: "" },
  ];

  console.log("DATA LINKS", dataLinks);
  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  return (
    <>
      {session.dbUser.role !== "MEMBRE" && (
        <DossierActionBar dossierId={dossierId} />
      )}
      <div className={styles.dossierSummaryBloc}>
        <div className={styles.flexRow}>
          <div className={styles.dossierTitle}>{dossier.nom}</div>
          {showTable ? (
            <AiOutlineMinus
              cursor="pointer"
              color="black"
              onClick={() => {
                setShowTable(false);
              }}
            />
          ) : (
            <AiOutlinePlus
              cursor="pointer"
              color="black"
              onClick={() => {
                setShowTable(true);
              }}
            />
          )}
        </div>
        {showTable && (
          <div>
            <div className={styles.insideWrapper}>
              <Info title="TYPE DE PROJET">
                <CategorieDossierTag dossier={dossier} />
              </Info>
              <Info title="DATE">
                <div> Du {frenchDateText(dossier.dateDebut)}</div>
                <div>au {frenchDateText(dossier.dateFin)}</div>
              </Info>
              <div>
                <Info
                  title="PRESENTATION GENERALE"
                  className={`${styles.info}`}
                >
                  <Foldable>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dossier.presentation.replace(/\n/g, "<br />"),
                      }}
                    />
                  </Foldable>
                </Info>
                <Info
                  title="SCENES SENSIBLES"
                  className={styles.infoSuccessive}
                >
                  {dossier.scenesSensibles.length == 0 && <span>aucune</span>}
                  {dossier.scenesSensibles.length > 0 &&
                    dossier.scenesSensibles.join(", ")}
                </Info>
              </div>
              <Info title="PIECES JUSTIFICATIVES">
                <JustificatifsDossier dossier={dossier} dataLinks={dataLinks} />
              </Info>
              <Info title="VALIDATION">
                {JUSTIFICATIFS_DOSSIERS.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.justificatifStatus} ${
                      item.status === "VALIDÉ"
                        ? styles.tagGreen
                        : item.status === "REFUSÉ"
                        ? styles.tagRed
                        : ""
                    }`}
                  >
                    {item.status === "VALIDÉ" ? (
                      <FaCheckCircle size={12} style={{ marginRight: "5px" }} />
                    ) : item.status === "REFUSÉ" ? (
                      <RxCrossCircled
                        size={12}
                        style={{ marginRight: "5px" }}
                      />
                    ) : (
                      <select
                        name="instructors"
                        className={styles.statusSelected}
                      >
                        <option value="Séléctionner">Séléctionner</option>
                        <option value="validate">VALIDÉ</option>
                        <option value="refused">REFUSÉ</option>
                      </select>
                    )}{" "}
                    {item.status}
                  </div>
                ))}
              </Info>
            </div>
            <div style={{ marginTop: "36px" }}>
              <div
                className={`${styles.bottomItemFoldable} ${styles.commentItem}`}
              >
                <div className={`${styles.flexRow}`}>
                  <div>Commentaires</div>
                  {!showCommentSection ? (
                    <AiOutlinePlus
                      cursor="pointer"
                      color="black"
                      onClick={() => {
                        setShowCommentSection(true);
                      }}
                    />
                  ) : (
                    <AiOutlineMinus
                      cursor="pointer"
                      color="black"
                      onClick={() => {
                        setShowCommentSection(false);
                      }}
                    />
                  )}
                </div>
                {showCommentSection && (
                  <>
                    <textarea
                      name="comment"
                      className={styles.commentSection}
                    />
                    <button
                      className="postButton"
                      onClick={() => {
                        console.log("Todo Répondre");
                      }}
                    >
                      Répondre
                    </button>
                  </>
                )}
              </div>
              <div className={`${styles.bottomItemFoldable}`}>
                <div className={styles.flexRow}>
                  <div>Afficher la société et le demandeur</div>
                  {!showCompanySection ? (
                    <AiOutlinePlus
                      cursor="pointer"
                      color="black"
                      onClick={() => {
                        setShowCompanySection(true);
                      }}
                    />
                  ) : (
                    <AiOutlineMinus
                      cursor="pointer"
                      color="black"
                      onClick={() => {
                        setShowCompanySection(false);
                      }}
                    />
                  )}
                </div>
                {showCompanySection && (
                  <div className={styles.societeSummaryBloc}>
                    <Info title="SOCIETE">
                      <InfoSociete
                        societeProduction={dossier.societeProduction}
                        conventionCollectiveCode={
                          dossier.conventionCollectiveCode
                        }
                      />
                    </Info>
                    <Info title="DEMANDEUR">
                      <div className={styles.demandeurInfo}>
                        {dossier.demandeur.prenom} {dossier.demandeur.nom}
                      </div>
                      <div className={styles.demandeurInfo} title="Fonction(s)">
                        {dossier.demandeur.fonction}
                      </div>
                      <div className={styles.demandeurInfo}>
                        <a href={`mailto:${dossier.demandeur.email}`}>
                          ✉️ {dossier.demandeur.email}
                        </a>
                      </div>
                      <div className={styles.demandeurInfo}>
                        <a href={`tel:${dossier.demandeur.phone}`}>
                          📞 {dossier.demandeur.phone}
                        </a>
                      </div>
                      {dossier.statut == "ACCEPTE" &&
                        session.dbUser.role !== "MEMBRE" && (
                          <div>
                            <button
                              className="postButton"
                              onClick={() => {
                                const attachment = generateDA([dossier], true);
                                sendEmail(
                                  "dl_decision",
                                  attachment as string,
                                  dossier,
                                  dossier.demandeur.email
                                );
                              }}
                            >
                              Renvoyer décision autorisation
                            </button>
                          </div>
                        )}
                    </Info>
                  </div>
                )}
              </div>
              {dossier.statut !== "INSTRUCTION" &&
                dossier.statut !== "CONSTRUCTION" &&
                session.dbUser.role !== "MEMBRE" && (
                  <button
                    style={{ marginRight: "10px" }}
                    className="postButton"
                    onClick={() => {
                      generateFE([dossier]);
                    }}
                  >
                    Télécharger Fiche Emploi
                  </button>
                )}
              {dossier.statut == "ACCEPTE" &&
                session.dbUser.role !== "MEMBRE" && (
                  <button
                    className="postButton"
                    style={{ marginRight: "10px" }}
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
                      window.confirm(
                        "Souhaitez-vous vraiment supprimer ce dossier?"
                      )
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
          </div>
        )}
      </div>

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
