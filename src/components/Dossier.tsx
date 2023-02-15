import { Icon } from "@dataesr/react-dsfr";
import router from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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
import {
  birthDateToFrenchAge,
  EMPLOIS_CATEGORIES,
  frenchDateText,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import { generateDA } from "src/lib/pdf/pdfGenerateDA";
import { generateFE } from "src/lib/pdf/pdfGenerateFE";
import { deleteDossier, sendEmail } from "src/lib/queries";
import type { DataLinks } from "src/lib/types";

import Accordion from "./Accordion";
import CountPieces from "./CountPieces";
import Table from "./Table";
import { ValidationJustificatifsDossier } from "./ValidationJustificatifs";
import { Comments, getCommentsByDossier } from "src/lib/fetching/comments";
import ListComments from "./ListComments";
import InputComments from "./inputComments";

interface Props {
  dossierId: number;
  dataLinks: DataLinks;
}

const Dossier: React.FC<Props> = ({ dossierId, dataLinks }) => {
  const { dossier, isLoading, isError } = useDossier(dossierId);
  const { data: session } = useSession();
  const [showCommentSection, setShowCommentSection] =
    React.useState<boolean>(false);
  const [showCompanySection, setShowCompanySection] =
    React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comments[]>([])

  const fetchComments = async () => {
    if(dossier?.source === 'FORM_EDS') {
      const res = await getCommentsByDossier(dossier?.externalId as string)
      console.log('res comments : ', res)
      setComments(res)
    }
  }

  const processComment = (comment: Comments) => {
    setComments([...comments, comment])
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  React.useEffect(() => {
    console.log('comments : ', comments)
  }, comments)

  const tableChildHeaders: string[] = [
    "Rôles",
    "Nom et Prénom",
    "Age",
    "Personnage",
    "Pièces justificatives",
  ];

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  return (
    <>
      {session.dbUser.role !== "MEMBRE" && (
        <DossierActionBar dossierId={dossierId} />
      )}
      <Accordion title={dossier.nom} className="accordionSpacing" state={true}>
        <div className={styles.dossierSummaryBloc}>
          <div className={styles.insideWrapper}>
            <Info title="TYPE DE PROJET">
              <CategorieDossierTag dossier={dossier} />
            </Info>
            <Info title="DATE">
              <div> Du {frenchDateText(dossier.dateDebut)}</div>
              <div>au {frenchDateText(dossier.dateFin)}</div>
            </Info>
            <div>
              <Info title="PRESENTATION GENERALE" className={`${styles.info}`}>
                <Foldable>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dossier.presentation.replace(/\n/g, "<br />"),
                    }}
                  />
                </Foldable>
              </Info>
              <Info title="SCENES SENSIBLES" className={styles.infoSuccessive}>
                {dossier.scenesSensibles.length == 0 && <span>aucune</span>}
                {dossier.scenesSensibles.length > 0 &&
                  dossier.scenesSensibles.join(", ")}
              </Info>
            </div>
            <Info title="PIECES JUSTIFICATIVES">
              <JustificatifsDossier dossier={dossier} dataLinks={dataLinks} />
            </Info>
            <Info title="VALIDATION">
              <ValidationJustificatifsDossier
                dossier={dossier}
                dataLinks={dataLinks}
              />
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
                  <ListComments comments={comments.filter((comment) => {return comment.enfantId === null})}></ListComments>
                  <InputComments dossierId={parseInt(dossier.externalId as string)} enfantId={null} parentId={null} action={processComment}></InputComments>
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
      </Accordion>
      <div>
        {EMPLOIS_CATEGORIES.map((typeEmploi, index) => (
          <div key={index}>
            {dossier.enfants.filter(function (element) {
              return (
                typeEmploiLabel(element.typeEmploi) === typeEmploi.label ||
                typeEmploi.value.includes(element.typeEmploi)
              );
            }).length > 0 ? (
              <Accordion title={typeEmploi.label} className="accordionBorder">
                <Table headers={tableChildHeaders}>
                  {dossier.enfants
                    .filter(
                      (e) =>
                        typeEmploiLabel(e.typeEmploi) === typeEmploi.label ||
                        typeEmploi.value.includes(e.typeEmploi)
                    )
                    .map((enf, idx) => (
                      <tr key={idx}>
                        {/* <a href={`#` + dossier.id.toString()}> */}
                        <td>{typeEmploiLabel(enf.typeEmploi)}</td>
                        {/* </a> */}
                        <td>
                          {enf.nom} {enf.prenom}
                        </td>
                        <td>{birthDateToFrenchAge(enf.dateNaissance)}</td>
                        <td>{enf.nomPersonnage}</td>
                        <td>
                          <CountPieces
                            piecesJustif={dataLinks.enfants
                              .find(
                                (data) =>
                                  data.id === parseInt(enf.externalId ?? "")
                              )
                              ?.piecesDossier.map((tmp) => tmp.statut)}
                          />
                        </td>
                      </tr>
                    ))}
                </Table>
              </Accordion>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "44px 0" }}>
        {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
        {TYPES_EMPLOI.map((typeEmploi, index) => (
          <span key={index}>
            {dossier.enfants.filter(function (element) {
              return typeEmploiLabel(element.typeEmploi) === typeEmploi.label;
            }).length > 0 ? (
              <div style={{ marginBottom: "36px" }}>
                {dossier.enfants
                  .filter(function (element) {
                    return (
                      typeEmploiLabel(element.typeEmploi) === typeEmploi.label
                    );
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
                  .map((enfant) => {
                    const childInfo = `
                      ${typeEmploiLabel(enfant.typeEmploi)}
                      :
                      ${enfant.nom.toUpperCase()}
                      ${enfant.prenom}
                      (${birthDateToFrenchAge(
                        enfant.dateNaissance
                      )}) - Personnage:
                      ${enfant.nomPersonnage}`;
                    return (
                      <div
                        id={dossier.id.toString()}
                        key={enfant.id}
                        className={styles.bloc}
                        style={{ marginBottom: "44px", padding: "15px" }}
                      >
                        <Accordion title={childInfo}>
                          <Enfant
                            enfant={enfant}
                            dataLinks={dataLinks}
                            dossier={dossier}
                            comments={comments}
                            actionComments={processComment}
                          />
                        </Accordion>
                      </div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </span>
        ))}
      </div>
    </>
  );
};

export default Dossier;
