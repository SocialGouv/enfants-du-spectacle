import { Icon } from "@dataesr/react-dsfr";
import Image from "next/image";
import Link from "next/link";
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
import logoArrowUp from "src/images/arrow-up.svg";
import { useDossier } from "src/lib/api";
import type { Comments } from "src/lib/fetching/comments";
import { getCommentsByDossier } from "src/lib/fetching/comments";
import {
  birthDateToFrenchAge,
  EMPLOIS_CATEGORIES,
  frenchDateText,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import { generateDA } from "src/lib/pdf/pdfGenerateDA";
import { generateFE } from "src/lib/pdf/pdfGenerateFE";
import {
  deleteDossier,
  sendEmail,
  updateCommentairesNotifications,
} from "src/lib/queries";
import type { DataLinks } from "src/lib/types";

import Accordion from "./Accordion";
import CountPieces from "./CountPieces";
import InputComments from "./inputComments";
import ListComments from "./ListComments";
import Table from "./Table";
import { ValidationJustificatifsDossier } from "./ValidationJustificatifs";

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
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const [comments, setComments] = React.useState<Comments[]>([]);

  const fetchComments = async () => {
    if (dossier?.source === "FORM_EDS") {
      const res = await getCommentsByDossier(dossier.externalId!);
      setComments(res);
    }
  };

  const processComment = (comment: Comments) => {
    setComments([comment, ...comments]);
  };

  const updateComments = () => {
    const commentsProjectIds: string[] = comments
      .filter(
        (comment) =>
          comment.enfantId === null && comment.source === "SOCIETE_PROD"
      )
      .map((com) => JSON.stringify(com.id));
    updateCommentairesNotifications(commentsProjectIds);
  };

  const filterTypeEmploi = (
    typeEmploi:
      | {
          label: string;
          value: string;
        }
      | {
          label: string;
          value: string[];
        }
  ) => {
    if (dossier) {
      return dossier.enfants.filter(
        (e) =>
          typeEmploiLabel(e.typeEmploi) === typeEmploi.label ||
          typeEmploi.value.includes(e.typeEmploi)
      );
    }
    return [];
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  React.useEffect(() => {
    console.log("comments : ", comments);
  }, comments);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tableChildHeaders: string[] = [
    "Rôles",
    "Nom et Prénom",
    "Age",
    "Personnage",
    "Notifications",
  ];

  if (isLoading) return <IconLoader />;
  if (isError || !dossier) return <Icon name="ri-error" />;

  return (
    <>
      {session.dbUser.role !== "MEMBRE" &&
        session.dbUser.role !== "MEDECIN" && (
          <div id="summaryBloc">
            <DossierActionBar dossierId={dossierId} />
          </div>
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
                      const commentsProject = comments.filter(
                        (comment) =>
                          comment.enfantId === null &&
                          comment.source === "SOCIETE_PROD"
                      );
                      if (commentsProject.length) updateComments();
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
              {dossier.source === "FORM_EDS" && showCommentSection && (
                <>
                  <InputComments
                    dossierId={parseInt(dossier.externalId!)}
                    enfantId={null}
                    parentId={null}
                    action={processComment}
                  />
                  <ListComments
                    comments={comments.filter((comment) => {
                      return comment.enfantId === null;
                    })}
                  />
                </>
              )}
              {dossier.source !== "FORM_EDS" && showCommentSection && (
                <span>
                  Les commentaires ne sont pas disponibles pour les dossiers
                  déposés sur Démarches Simplifiées.
                </span>
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
                      otherConventionCollective={
                        dossier.otherConventionCollective
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
                                "auth_access",
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
            {filterTypeEmploi(typeEmploi).length > 0 ? (
              <Accordion
                title={typeEmploi.label}
                subtitle={`: ${filterTypeEmploi(typeEmploi).length} ${
                  filterTypeEmploi(typeEmploi).length > 1 ? "enfants" : "enfant"
                }`}
                className="accordionBorder"
              >
                <Table headers={tableChildHeaders}>
                  {filterTypeEmploi(typeEmploi).map((enf, idx) => {
                    let countCommentsNotification = 0;
                    if (enf.externalId !== null) {
                      countCommentsNotification = comments.filter(
                        (comment) =>
                          comment.enfantId === parseInt(enf.externalId) &&
                          comment.source === "SOCIETE_PROD" &&
                          comment.seen !== true
                      ).length;
                    }
                    return (
                      <tr key={idx}>
                        <td>
                          <a href={`#` + enf.id.toString()}>
                            {typeEmploiLabel(enf.typeEmploi)}
                          </a>
                        </td>
                        <td>
                          <a href={`#` + enf.id.toString()}>
                            {enf.nom} {enf.prenom}
                          </a>
                        </td>
                        <td>{birthDateToFrenchAge(enf.dateNaissance)}</td>
                        <td>{enf.nomPersonnage}</td>
                        <td>
                          {dossier.source === "FORM_EDS" && (
                            <CountPieces
                              countCommentsNotification={
                                countCommentsNotification
                              }
                              piecesJustif={dataLinks.enfants
                                .find(
                                  (data) =>
                                    data.id === parseInt(enf.externalId ?? "")
                                )
                                ?.piecesDossier.map((tmp) => tmp.statut)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </Table>
              </Accordion>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "44px 0 10px 0" }}>
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
                        id={enfant.id.toString()}
                        key={enfant.id}
                        className={styles.bloc}
                        style={{ marginBottom: "44px", padding: "15px" }}
                      >
                        <Accordion title={childInfo} type={"commentChildren"}>
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
      {scrollPosition > 400 && (
        <div className={styles.buttonUp}>
          <Link href={`#summaryBloc`}>
            <Image src={logoArrowUp} alt="Supprimer" width={30} height={30} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Dossier;
