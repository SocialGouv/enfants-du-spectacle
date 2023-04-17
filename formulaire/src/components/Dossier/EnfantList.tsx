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
import readXlsxFile, { Row } from "read-excel-file";

interface Props {
  allowChanges: Boolean;
  comments?: Comments[];
}

const EnfantList: React.FC<Props> = ({ allowChanges, comments }) => {
  const contextDossier = { ...useStateContext() };
  const [selectedEnfant, setSelectedEnfant] = React.useState<Enfant>();
  const [page, setPage] = React.useState<number>(0);
  const myRef = useRef(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [enfantInfo, setEnfantInfo] = React.useState<string[]>([]);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [enfantsList, setEnfantsList] = React.useState<Record<string, any>[]>(
    []
  );

  const input = document.getElementById("import-enfants") as HTMLInputElement;
  if (input) {
    input.addEventListener("change", () => {
      if (input.files) {
        console.log("INSIDE! ");
        console.log("SCHEMA:", schema);
        readXlsxFile(input.files[0], {
          sheet: "Enfants",
          schema,
          // transformData(data: any) {
          //   let enfants: string[] = [];
          //   const child: Record<string, any> = {};
          //   // const child: Record<string, any> = {};
          //   return data.filter((row: Row, rowIndex: number) => {
          //     if (rowIndex > 0) {
          //       // get enfant lastname & firstname
          //       // let nomEnfant = "";
          //       // let prenomEnfant = "";
          //       // row.forEach((column, colIndex) => {
          //       //   if (colIndex === 1) {
          //       //     prenomEnfant = column.toString();
          //       //   } else if (colIndex === 2) {
          //       //     nomEnfant = column.toString();
          //       //   }
          //       // });
          //       // enfants.push(`${nomEnfant} ${prenomEnfant}`);
          //       // setEnfantInfo(enfants);

          //       // map values by schema props
          //       Object.entries(schema).forEach(([key, value], objIndex) => {
          //         child[value.prop] = row[objIndex];
          //       });

          //       if (!enfantsList.includes(JSON.parse(JSON.stringify(child)))) {
          //         enfantsList.push(JSON.parse(JSON.stringify(child)));
          //       }

          //       // setEnfantsList([
          //       //   ...enfantsList,
          //       //   JSON.parse(JSON.stringify(child)),
          //       // ]);
          //     }
          //     return false;
          //   });
          // },
        }).then(async (rows) => {
          setEnfantsList(rows.rows);
          console.log("ROWS", rows);
          await importEnfants(rows.rows, contextDossier.dossier.id);
        });
        // .then(async () => {
        //   setTimeout(async () => {
        //   }, 500);
        // });
      }
    });
  }

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setShowModal(true);
    }
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
  }, [order, termOrdered]);

  // if (enfantInfo.length) console.log(enfantInfo);
  if (enfantsList.length) {
    console.log(
      "ENFANTS LISTS FINAL:",
      JSON.parse(JSON.stringify(enfantsList))
    );
  }

  return (
    <div className={styles.enfantList}>
      {(contextDossier.dossier.statut === "BROUILLON" ||
        contextDossier.dossier.statut === "CONSTRUCTION") && (
        <div className={styles.listBtn}>
          <div>
            <ButtonLink onClick={handleFileSelectClick}>
              <FaUserPlus style={{ marginRight: "8px" }} /> Importer le fichier
              d'enfants
            </ButtonLink>
            <input
              id="import-enfants"
              type="file"
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
      {showModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.importTitle}>Import des enfants</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {enfantsList.length > 0
              ? enfantsList.map((child, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      {child.prenom}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
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
            <TableCard
              title={`${enfant.typeEmploi} : ${enfant.nom} ${enfant.prenom} (${
                enfant.dateNaissance
                  ? birthDateToFrenchAge(moment(enfant.dateNaissance).toDate())
                  : ""
              }) - Personnage : ${enfant.nomPersonnage}`}
            >
              <Foldable
                hidden={true}
                folded={!(selectedEnfant?.id === enfant.id)}
                action={() => {
                  handleFolded(enfant);
                  const commentsChildrenIds = comments
                    ?.filter(
                      (comment) =>
                        comment.enfantId === enfant.id &&
                        comment.source === "INSTRUCTEUR"
                    )
                    .map((com) => JSON.stringify(com.id));
                  if (commentsChildrenIds?.length)
                    updateCommentairesNotifications(commentsChildrenIds);
                }}
              >
                <EnfantForm
                  enfant={enfant}
                  refresh={handleRefresh}
                  allowChanges={allowChanges}
                ></EnfantForm>
              </Foldable>
            </TableCard>
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
