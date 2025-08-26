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
import { DossierJustificatifs } from "src/components/DossierJustificatifs";
import logoArrowUp from "src/images/arrow-up.svg";
import { useDossier } from "src/lib/api";
import type { Comments } from "src/lib/fetching/comments";
import { getCommentsByDossier } from "src/lib/fetching/comments";
import {
  birthDateToFrenchAge,
  EMPLOIS_CATEGORIES,
  frenchDateHour,
  frenchDateText,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import { generateDA } from "src/lib/pdf/pdfGenerateDA";
import { generateAndUploadDA } from "src/lib/pdf/pdfGenerateAndUploadDA";
import { generateFE } from "src/lib/pdf/pdfGenerateFE";
import {
  deleteDossier,
  sendEmail,
  updateCommentairesNotifications,
} from "src/lib/queries";
import type { DataLinks, Remuneration } from "src/lib/types";

import Accordion from "./Accordion";
import CountPieces from "./CountPieces";
import InputComments from "./inputComments";
import ListComments from "./ListComments";
import Table from "./Table";
import { getUsersById } from "src/lib/fetching/users";

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
  const [senderComment, setSenderComment] = React.useState<string>(
    session?.dbUser.prenom + " " + session?.dbUser.nom || "Instructeur"
  );
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [fetchedSocieteProduction, setFetchedSocieteProduction] =
    React.useState(null);
  const [otherFilms, setOtherFilms] = React.useState<any>({});
  const [loadingOtherFilms, setLoadingOtherFilms] =
    React.useState<boolean>(false);
  const [openAccordionIds, setOpenAccordionIds] = React.useState<number[]>([]);
  const [openEnfantAccordionIds, setOpenEnfantAccordionIds] = React.useState<
    string[]
  >([]);

  // Functions to manage accordion states for children
  const toggleAccordion = (enfantId: number) => {
    setOpenAccordionIds((prev) =>
      prev.includes(enfantId)
        ? prev.filter((id) => id !== enfantId)
        : [...prev, enfantId]
    );
  };

  const expandAllAccordions = () => {
    if (dossier?.enfants) {
      const allEnfantIds = dossier.enfants.map((enfant: any) => enfant.id);
      setOpenAccordionIds(allEnfantIds);
    }
  };

  const collapseAllAccordions = () => {
    setOpenAccordionIds([]);
  };

  const isAccordionOpen = (enfantId: number) => {
    return openAccordionIds.includes(enfantId);
  };

  // Functions to manage accordion states for enfant accordions
  const toggleEnfantAccordion = (accordionId: string) => {
    setOpenEnfantAccordionIds((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId]
    );
  };

  const expandAllEnfantAccordions = () => {
    if (dossier?.enfants) {
      const allAccordionIds: string[] = [];
      dossier.enfants.forEach((enfant: any) => {
        allAccordionIds.push(
          `${enfant.id}-infos`,
          `${enfant.id}-comments`,
          `${enfant.id}-representants`,
          `${enfant.id}-otherFilms`,
          `${enfant.id}-avisMedical`
        );
      });
      setOpenEnfantAccordionIds(allAccordionIds);
    }
  };

  const collapseAllEnfantAccordions = () => {
    setOpenEnfantAccordionIds([]);
  };

  // Function to fetch societeProduction directly
  const fetchSocieteProduction = async (id: number) => {
    try {
      const response = await fetch(`/api/societe-production/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFetchedSocieteProduction(data);
      } else {
        console.error("Failed to fetch societeProduction", response.status);
      }
    } catch (error) {
      console.error("Error fetching societeProduction:", error);
    }
  };

  const fetchUser = async () => {
    if (session) {
      const users = await getUsersById([session.dbUser.id]);
      const responseUser = users[0] || {};
      if (responseUser && responseUser.nom && responseUser.prenom) {
        setSenderComment(responseUser.nom + " " + responseUser.prenom);
      }
    }
  };

  const fetchOtherFilms = async () => {
    if (!dossier?.enfants?.length) return;

    setLoadingOtherFilms(true);
    try {
      // Récupérer tous les nameId des enfants du dossier
      const nameIds = dossier.enfants
        .filter((enfant: any) => enfant.nameId)
        .map((enfant: any) => enfant.nameId);

      if (nameIds.length === 0) {
        setOtherFilms({});
        return;
      }

      const response = await fetch("/api/enfants/other-films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameIds,
          currentDossierId: dossier.id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error fetching other films: ${response.status} - ${errorText}`
        );
      }

      const otherFilmsData = await response.json();
      setOtherFilms(otherFilmsData);
    } catch (error) {
      console.error("Error fetching other films:", error);
      setOtherFilms({});
    } finally {
      setLoadingOtherFilms(false);
    }
  };

  const fetchComments = async () => {
    try {
      // Récupérer TOUS les commentaires du dossier (projet ET enfants)
      if (dossier?.id) {
        const response = await fetch(
          `/api/dossier-comments/${dossier.id}?includeChildren=true`
        );
        if (!response.ok) {
          throw new Error(`Error fetching comments: ${response.status}`);
        }
        const commentsData = await response.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]); // Set empty comments to avoid UI errors
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
        (e: any) =>
          typeEmploiLabel(e.typeEmploi) === typeEmploi.label ||
          typeEmploi.value.includes(e.typeEmploi)
      );
    }
    return [];
  };

  React.useEffect(() => {
    try {
      fetchComments();
      fetchOtherFilms();
    } catch (error) {
      console.error("Error in initial data fetch:", error);
    }
  }, [dossier?.id]);

  React.useEffect(() => {
    fetchUser();
  }, []);

  // Call fetchSocieteProduction when showCompanySection changes to true
  React.useEffect(() => {
    if (showCompanySection) {
      // Try to fetch using dossier.societeProductionId first
      if (dossier?.societeProductionId) {
        fetchSocieteProduction(dossier.societeProductionId);
      }
      // If that doesn't exist, try using demandeur.societeProductionId as a fallback
      else if (dossier?.demandeur?.societeProductionId) {
        fetchSocieteProduction(dossier.demandeur.societeProductionId);
      }
    }
  }, [
    showCompanySection,
    dossier?.societeProductionId,
    dossier?.demandeur?.societeProductionId,
  ]);

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
      {session?.dbUser.role !== "MEMBRE" &&
        session?.dbUser.role !== "MEDECIN" && (
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
                  dossier.scenesSensibles
                    .filter((scene: any) => scene !== null)
                    .join(", ")}
                {dossier.dateDerniereModification && (
                  <p className={styles.infoDate}>
                    Mis à jour le{" "}
                    {frenchDateHour(
                      dossier.dateDerniereModification ?? new Date()
                    )}
                  </p>
                )}
              </Info>
            </div>
            <Info title="PIECES JUSTIFICATIVES & VALIDATION">
              {dossier.source === "FORM_EDS" && (
                <DossierJustificatifs
                  dossier={dossier}
                  showValidation={
                    session?.dbUser.role === "INSTRUCTEUR" ||
                    session?.dbUser.role === "ADMIN"
                  }
                />
              )}
            </Info>
          </div>
          <div className={styles.actionButtonsContainer}>
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
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <AiOutlineMinus
                    cursor="pointer"
                    color="black"
                    onClick={() => {
                      setShowCommentSection(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {showCommentSection && (
                <>
                  <InputComments
                    dossierId={dossier.id}
                    sender={senderComment}
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
              {/* Allow comments for all dossier sources */}
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
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <AiOutlineMinus
                    cursor="pointer"
                    color="black"
                    onClick={() => {
                      setShowCompanySection(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {showCompanySection && (
                <div className={styles.societeSummaryBloc}>
                  {/* Create a mock societeProduction if it doesn't exist */}
                  <Info title="SOCIETE">
                    <InfoSociete
                      societeProduction={
                        // Try to use fetchedSocieteProduction first, then fall back to other options
                        fetchedSocieteProduction ||
                        dossier.societeProduction ||
                        dossier.demandeur?.societeProduction || {
                          id: 0,
                          nom: "Société de production",
                          siret: "N/A",
                          siren: "N/A",
                          departement: "N/A",
                          naf: "N/A",
                          raisonSociale: "Information non disponible",
                          adresse: "Adresse non disponible",
                          adresseCodePostal: "N/A",
                          adresseCodeCommune: "N/A",
                          formeJuridique: "Information non disponible",
                          conventionCollectiveCode: "N/A",
                          otherConventionCollective: null,
                        }
                      }
                      conventionCollectiveCode={
                        dossier.demandeur.conventionCollectiveCode
                      }
                      otherConventionCollective={
                        dossier.demandeur.otherConventionCollective
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
                      session?.dbUser.role !== "MEMBRE" && (
                        <div>
                          <button
                            className="postButton"
                            onClick={async () => {
                              const result = await generateAndUploadDA([dossier], true);
                              sendEmail(
                                "auth_access",
                                result.pdfBase64 as string,
                                dossier,
                                dossier.demandeur.email || undefined
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
              session?.dbUser.role !== "MEMBRE" && (
                <button
                  className={`postButton ${styles.actionButton}`}
                  onClick={() => {
                    generateFE([dossier]);
                  }}
                >
                  Télécharger Fiche Emploi
                </button>
              )}
            {dossier.statut == "ACCEPTE" &&
              session?.dbUser.role !== "MEMBRE" && (
                <button
                  className={`postButton ${styles.actionButton}`}
                  onClick={() => {
                    generateDA([dossier]);
                  }}
                >
                  Télécharger Décision autorisation
                </button>
              )}
            {session?.dbUser.role === "ADMIN" && (
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
                  {filterTypeEmploi(typeEmploi).map((enf: any, idx: number) => {
                    let countCommentsNotification = 0;
                    if (enf.id !== null) {
                      const filteredComments = comments.filter(
                        (comment) =>
                          comment.enfantId === enf.id &&
                          comment.source === "SOCIETE_PROD" &&
                          (comment.seen === false || comment.seen === null)
                      );
                      countCommentsNotification = filteredComments.length;
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
                              piecesJustif={
                                enf.piecesDossier?.map(
                                  (piece: any) => piece.statut
                                ) as string[] | undefined
                              }
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

      <div className={styles.childrenSection}>
        {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
        {dossier.enfants.length > 0 && (
          <div className={styles.accordionControlButtons}>
            <button
              className={`postButton ${styles.controlButton}`}
              onClick={() => {
                expandAllAccordions();
                expandAllEnfantAccordions();
              }}
            >
              Déplier tous les accordéons
            </button>
            <button
              className="postButton"
              onClick={() => {
                collapseAllAccordions();
                collapseAllEnfantAccordions();
              }}
            >
              Replier tous les accordéons
            </button>
          </div>
        )}
        {TYPES_EMPLOI.map((typeEmploi, index) => (
          <span key={index}>
            {dossier.enfants.filter(function (element: any) {
              return typeEmploiLabel(element.typeEmploi) === typeEmploi.label;
            }).length > 0 ? (
              <div className={styles.childSection}>
                {dossier.enfants
                  .filter(function (element: any) {
                    return (
                      typeEmploiLabel(element.typeEmploi) === typeEmploi.label
                    );
                  })
                  .sort(function (a: any, b: any) {
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
                  .map((enfant: any) => {
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
                        className={`${styles.bloc} ${styles.childBlock}`}
                      >
                        <Accordion
                          title={childInfo}
                          type={"commentChildren"}
                          isOpen={isAccordionOpen(enfant.id)}
                          onToggle={() => toggleAccordion(enfant.id)}
                        >
                          <Enfant
                            enfant={enfant}
                            sender={senderComment}
                            dataLinks={dataLinks}
                            dossier={dossier}
                            comments={comments}
                            actionComments={processComment}
                            remunerations={enfant.remuneration || []}
                            otherFilms={
                              enfant.nameId
                                ? otherFilms[enfant.nameId] || []
                                : []
                            }
                            openEnfantAccordionIds={openEnfantAccordionIds}
                            onToggleEnfantAccordion={toggleEnfantAccordion}
                          />
                          {dossier.statut !== "INSTRUCTION" &&
                            dossier.statut !== "CONSTRUCTION" &&
                            session?.dbUser.role !== "MEMBRE" && (
                              <div className={styles.downloadButtonContainer}>
                                <button
                                  className="postButton"
                                  onClick={() => {
                                    generateFE([dossier], enfant.id);
                                  }}
                                >
                                  Télécharger Fiche Emploi individuelle
                                </button>
                                {dossier.statut == "ACCEPTE" && (
                                  <button
                                    className="postButton"
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                      generateDA([dossier], false, enfant.id);
                                    }}
                                  >
                                    Télécharger Décision autorisation individuelle
                                  </button>
                                )}
                              </div>
                            )}
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
            <Image src={logoArrowUp} alt="Remonter" width={30} height={30} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Dossier;
