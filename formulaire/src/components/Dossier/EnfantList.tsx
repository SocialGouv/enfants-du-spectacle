import React from "react";
import { Comments, Enfant } from "@prisma/client";
import { birthDateToFrenchAge, frenchDateText } from "../../lib/helpers";
import styles from "./EnfantList.module.scss";
import { ButtonLink } from "src/uiComponents/button";
import Foldable from "../FoldableItem";
import EnfantForm from "./EnfantForm";
import { createEnfant, importEnfants } from "src/fetching/enfant";
import { useRef } from "react";
import moment from "moment";
import OrderableItem from "../home/OrderableItem";
import Image from "next/image";
import useStateContext from "src/context/StateContext";
import CountPieces from "../CountPieces";
import TableCard from "../TableCard";
import { updateCommentairesNotifications } from "src/fetching/commentaires";
import { CommentaireNotifications } from "src/lib/types";
import { SCHEMA_ENFANTS as schema } from "src/lib/helpers";
import { FaUserPlus, FaFileDownload } from "react-icons/fa";
import readXlsxFile from "read-excel-file";
import { RxCross2 } from "react-icons/rx";
import ProgressBar from "../ProgressBar";
import { useRouter } from "next/router";
import Accordion from "../Accordion";

interface Props {
  allowChanges: Boolean;
  comments?: Comments[];
}

const EnfantList: React.FC<Props> = ({ allowChanges, comments }) => {
  const contextDossier = { ...useStateContext() };
  const router = useRouter();
  const [selectedEnfant, setSelectedEnfant] = React.useState<Enfant>();
  const [page, setPage] = React.useState<number>(0);
  const myRef = useRef(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [activeOnce, setActiveOnce] = React.useState<boolean>(false);
  const [errorsRows, setErrorsRows] = React.useState<Record<string, any>[]>([]);
  const [enfantRefused, setEnfantRefused] = React.useState<number>(0);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [enfantsList, setEnfantsList] = React.useState<Record<string, any>[]>(
    []
  );
  const [progress, setProgress] = React.useState(0);

  if (selectedFile && activeOnce) {
    readXlsxFile(selectedFile, {
      sheet: "Enfants",
      schema,
    }).then(async (rows) => {
      setErrorsRows(rows.errors);
      const rowParsed = rows.rows.filter(
        (v: any, index, a) =>
          !rows.errors.some((err) => err.row - 1 === index + 1) &&
          a.findIndex(
            (v2: any) =>
              v2.nom === v.nom &&
              v2.prenom === v.prenom &&
              Date.parse(v2.dateNaissance) === Date.parse(v.dateNaissance)
          ) === index
      );
      let start = 0;
      while (start < rowParsed.length) {
        const end = Math.min(start + 10, rowParsed.length);
        const batch = rowParsed.slice(start, end);
        const resImport = await importEnfants(batch, contextDossier.dossier.id);
        setEnfantsList(rowParsed);
        start += 10;
        if (rowParsed.length <= start) setProgress(100);
        else setProgress((start / rowParsed.length) * 100);
      }
      setEnfantRefused(new Set(rows.errors.map((obj) => obj.row)).size);
    });
    setActiveOnce(false);
  }

  React.useEffect(() => {
    if (showModal) {
      const disableScroll = (event: WheelEvent) => {
        const target = event.target as HTMLElement;
        const isScrollable = target.scrollHeight > target.clientHeight;
        if (isScrollable) {
          return;
        }
        event.preventDefault();
      };
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.removeEventListener("wheel", disableScroll);
      };
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [showModal]);

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveOnce(false);
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      window.scrollTo({ top: 0, left: 0 });
      setShowModal(true);
      setActiveOnce(true);
      setEnfantsList([]);
      setEnfantRefused(0);
    }
  };

  const handleErrors = (error: Record<string, any>) => {
    return error.reason === "not_an_email" || error.reason === "not an email"
      ? "Le format de l'email est invalide"
      : error.reason === "not_a_date"
      ? "Le format de la date est invalide"
      : error.reason === "not_a_number"
      ? "Le format est invalide"
      : "Ce champ est obligatoire";
  };
  const handleDownload = () => {
    fetch("/template/template-enfants-v1.xlsx")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template-enfants-v1.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  const [termOrdered, setTermToOrder] = React.useState<keyof Enfant>(
    "dateDerniereModification"
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");

  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedEnfant]);

  const scrollToRef = (ref: React.MutableRefObject<null>) => {
    if (ref && ref.current) {
      window.scrollTo(0, ref?.current?.offsetTop);
    }
  };

  const addEnfant = async () => {
    let res = await createEnfant({
      nom: "Enfant",
      prenom: "Nouvel",
      dossierId: contextDossier.dossier.id,
      typeEmploi: "ROLE_1",
      typeConsultation: "GENERALISTE",
      nomPersonnage: "",
      montantCachet: 0,
      remunerationTotale: 0,
    } as Enfant);
    contextDossier.processEntity("enfants", [
      { ...res, piecesDossier: [] },
      ...contextDossier.enfants,
    ]);
    setSelectedEnfant(res);
    scrollToRef(myRef);
  };

  const clickEnfant = (enfant: Enfant) => {
    setSelectedEnfant(enfant);
  };

  const handleFolded = (enfant: Enfant) => {
    if (selectedEnfant?.id === enfant.id) {
      setSelectedEnfant({} as Enfant);
    } else {
      setSelectedEnfant(enfant);
    }
  };

  const handleRefresh = (enfantUp: Enfant) => {
    contextDossier.processEntity(
      "enfants",
      contextDossier.enfants.map((enfant) => {
        return enfant.id === enfantUp.id ? enfantUp : enfant;
      })
    );
  };

  const handlePage = (pageToGo: number) => {
    setPage(pageToGo);
  };

  const handleOrder = (termToOrder: string) => {
    setOrder(
      termToOrder === termOrdered ? (order === "desc" ? "asc" : "desc") : "desc"
    );
    setTermToOrder(termToOrder as keyof Enfant);
  };

  React.useEffect(() => {
    contextDossier.processEntity(
      "enfants",
      [...contextDossier.enfants].sort(function (a, b) {
        if (
          a[termOrdered] &&
          b[termOrdered] &&
          a[termOrdered] < b[termOrdered]
        ) {
          return order === "desc" ? 1 : -1;
        }
        if (
          a[termOrdered] &&
          b[termOrdered] &&
          a[termOrdered] > b[termOrdered]
        ) {
          return order === "desc" ? -1 : 1;
        }
        return 0;
      })
    );
  }, [order, termOrdered])

  React.useEffect(() => {
    console.log('selectedEnfant : ', selectedEnfant)
  }, [selectedEnfant])


  return (
    <div className={styles.enfantList}>
      {(contextDossier.dossier.statut === "BROUILLON" ||
        contextDossier.dossier.statut === "CONSTRUCTION") && (
        <div className={styles.listBtn}>
          <div>
            <ButtonLink onClick={handleFileSelectClick}>
              <FaUserPlus style={{ marginRight: "8px" }} />
              {`Importer le fichier d'enfants`}
            </ButtonLink>
            <input
              id="import-enfants"
              type="file"
              accept="xls, xlsx"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          <div>
            <ButtonLink light={true} onClick={handleDownload}>
              <FaFileDownload style={{ marginRight: "8px" }} /> Télécharger le
              modèle (csv excel)
            </ButtonLink>
          </div>
        </div>
      )}
      {showModal && <div className={styles.overlay} />}
      {showModal && (
        <>
          <div className={styles.modalWrapper}>
            <RxCross2
              className={styles.closeBtn}
              size={24}
              onClick={() => {
                setProgress(0);
                setShowModal(false);
                router.push(`/dossier/${contextDossier.dossier.id}`);
              }}
            />
            <div className={styles.importTitle}>
              Import des informations enfants
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {enfantsList.length > 0 ? (
                <div>
                  {progress === 100
                    ? "Importation terminée"
                    : "Importation en cours..."}
                </div>
              ) : (
                <>{`Aucune information n'a été importée.`}</>
              )}
            </div>
            <div className={styles.percentage}>{Math.trunc(progress)}%</div>
            <ProgressBar progress={progress} />
            <div className={styles.summaryWrapper}>
              <div className={styles.importTitle}>Résumé:</div>
              <div style={{ marginBottom: "20px" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {enfantsList.length}
                  </span>{" "}
                  {enfantsList.length > 1 ? "enfants crées" : "enfant créé"}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{enfantRefused}</span>{" "}
                  {enfantRefused > 1 ? "enfants refusés" : "enfant refusé"}
                </div>
              </div>
              {errorsRows.length ? (
                <div>
                  <div className={styles.importTitle}>
                    Erreurs{" "}
                    <span className={styles.errorDescription}>
                      ({`certains enfants n'ont pas été importés`})
                    </span>
                  </div>

                  {errorsRows.map((error, index) => {
                    return (
                      <div key={index} className={styles.errorRow}>
                        Ligne{" "}
                        <span style={{ fontWeight: "bold" }}>{error.row}</span>{" "}
                        : {error.column} {`=>`} {handleErrors(error)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* {progress === 100 && (
              <ButtonLink
                onClick={() => {
                  router.push(`/dossier/${contextDossier.dossier.id}`);
                }}
              >
                Fermer
              </ButtonLink>
            )} */}
          </div>
        </>
      )}
      <TableCard title={"Enfants"}>
        <div className={styles.headRow}>
          <OrderableItem
            text={"Rôle"}
            termToOrder={"typeEmploi"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Nom et prénom"}
            termToOrder={"nom"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Age"}
            termToOrder={"dateNaissance"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Personnage"}
            termToOrder={"nomPersonnage"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Mis à jour"}
            termToOrder={"dateDerniereModification"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <div className={styles.itemHead}>Notifications</div>
        </div>
        {contextDossier.enfants
          .slice(page * 10, page * 10 + 10)
          .map((enfant) => {
            const commentsChildren = comments?.filter(
              (comment) =>
                comment.dossierId === contextDossier.dossier.id &&
                comment.seen !== true &&
                comment.source === "INSTRUCTEUR" &&
                comment.enfantId === enfant.id
            );
            const commentsNotifications: CommentaireNotifications = {
              dossierId: contextDossier.dossier.id,
              notificationsProject: 0,
              notificationsChildren: commentsChildren?.length || 0,
            };
            return (
              <a
                href={`#row-enfant-${enfant.id}`}
                className={styles.tableEnfant}
                key={`table-enfant-${enfant.id}`}
                onClick={() => {
                  clickEnfant(enfant);
                  if (commentsChildren?.length) {
                    const commentsChildrenIds: string[] = commentsChildren.map(
                      (comment: Comments) => JSON.stringify(comment.id)
                    );
                    if (commentsChildrenIds)
                      updateCommentairesNotifications(commentsChildrenIds);
                  }
                }}
              >
                <div className={styles.itemDossier}>{enfant.typeEmploi}</div>
                <div className={styles.itemDossier}>
                  {`${enfant.nom} ${enfant.prenom}`}
                </div>
                <div className={styles.itemDossier}>
                  {enfant.dateNaissance
                    ? birthDateToFrenchAge(
                        moment(enfant.dateNaissance).toDate()
                      )
                    : ""}
                </div>
                <div className={styles.itemDossier}>{enfant.nomPersonnage}</div>
                <div className={styles.itemDossier}>
                  {enfant.dateDerniereModification
                    ? frenchDateText(enfant.dateDerniereModification)
                    : ""}
                </div>
                <div className={styles.itemDossier}>
                  {enfant.piecesDossier && (
                    <CountPieces
                      commentsNotifications={commentsNotifications}
                      piecesJustif={enfant.piecesDossier.map(
                        (piece) => piece.statut
                      )}
                    ></CountPieces>
                  )}
                </div>
              </a>
            );
          })}
        <div className={styles.pagination}>
          {[...Array(Math.ceil(contextDossier.enfants.length / 10))].map(
            (e, i) => (
              <ButtonLink
                light={page !== i}
                onClick={() => {
                  handlePage(i);
                }}
                key={i}
              >
                {i + 1}
              </ButtonLink>
            )
          )}
        </div>
      </TableCard>

      {(contextDossier.dossier.statut === "BROUILLON" ||
        contextDossier.dossier.statut === "CONSTRUCTION") && (
        <div className={styles.actionRow} ref={myRef}>
          <ButtonLink
            light={true}
            onClick={() => {
              addEnfant();
            }}
          >
            Ajouter un enfant
          </ButtonLink>
        </div>
      )}

      <div className={styles.listEnfants}>
        {contextDossier.enfants.map((enfant) => (
          <div
            className={styles.rowEnfant}
            key={`row-enfant-${enfant.id}`}
            id={`row-enfant-${enfant.id}`}
          >
            <Accordion
              title={`${enfant.typeEmploi} : ${enfant.nom} ${enfant.prenom} (${
                enfant.dateNaissance
                  ? birthDateToFrenchAge(moment(enfant.dateNaissance).toDate())
                  : ""
              }) - Personnage : ${enfant.nomPersonnage}`}
              enfant={enfant}
              selectedEnfant={selectedEnfant}
              action={clickEnfant}
            >
              <EnfantForm
                enfant={enfant}
                refresh={handleRefresh}
                allowChanges={allowChanges}
              ></EnfantForm>
            </Accordion>
          </div>
        ))}
      </div>

      {scrollPosition > 450 && (
        <div className={styles.buttonUp}>
          <a href={`#menu-dossier`}>
            <Image
              src={`/images/arrow-up.svg`}
              alt="Supprimer"
              width={30}
              height={30}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default EnfantList;
