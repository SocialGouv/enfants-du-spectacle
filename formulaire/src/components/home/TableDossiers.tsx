import { Comments, Demandeur, Dossier, PieceDossier } from "@prisma/client";
import IconLoader from "../IconLoader";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { CommentaireNotifications, statusGroup } from "src/lib/types";
import { DossierData, getDossiers } from "../../fetching/dossiers";
import { frenchDateText } from "../../lib/helpers";
import { ButtonLink } from "../../uiComponents/button";
import CountPieces from "../CountPieces";
import LabelStatus from "../LabelStatus";
import TableCard from "../TableCard";
import OrderableItem from "./OrderableItem";
import styles from "./TableDossiers.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { deleteDossier, duplicateDossierEds } from "../../fetching/dossiers";
import { getComments } from "src/fetching/commentaires";

import {
  createDemandeur,
  updateDemandeur,
  getDemandeur,
} from "../../fetching/demandeur";
import { createPiece, getPieces } from "../../fetching/pieces";
import { useSession } from "next-auth/react";
import ShareDossierModal from "../Dossier/ShareDossierModal";
import { set } from "date-fns";

interface Props {
  search: string;
  action: (encours: number, termines: number) => void;
  status: statusGroup;
}

const TableDossiers: React.FC<Props> = ({ search, action, status }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDialogue, setShowDialogue] = React.useState<boolean>(false);
  const [type, setType] = React.useState<"delete" | "share" | "">("");
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [dossiers, setDossiers] = React.useState<DossierData[]>([]);
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);
  const [countDossiers, setCountDossiers] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [termOrdered, setTermToOrder] = React.useState<keyof Dossier>(
    "dateDerniereModification"
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchDossiers = async () => {
    setShowLoader(true);
    let res = await getDossiers(page, status, search, termOrdered, order);
    setDossiers(res.dossiers);
    setCountDossiers(res.countCurrent);
    action(res.countEnCours, res.countTermines);
  };

  const [comments, setComments] = React.useState<Comments[]>([]);

  const fetchComments = async () => {
    if (dossiers && dossiers.length > 0) {
      const commentsList = await Promise.all(
        dossiers.map(async (dossier: DossierData) => {
          const resComments = await getComments(dossier.id as number);
          return resComments;
        })
      );
      setComments(commentsList.flat());
      setShowLoader(false);
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [status])

  React.useEffect(() => {
    fetchComments();
  }, [dossiers]);

  const [indexItem, setIndexItem] = React.useState<number>();

  const duplicateDossier = async (dossierItem: Dossier) => {
    setShowLoader(true);
    // create empty demandeur
    let resDemandeur = await createDemandeur({} as Demandeur);

    // create dossier
    let resDossier = await duplicateDossierEds({
      ...dossierItem,
      dateCreation: new Date(),
      demandeurId: resDemandeur.id,
    } as Dossier);

    //get pieces justificatifs
    let piecesDossier = (await getPieces(
      dossierItem.id.toString()
    )) as PieceDossier[];

    await Promise.all(
      piecesDossier.map(async (piece: PieceDossier) => {
        const { id, ...tmpPiece } = piece;

        const pieceCreate = await createPiece({
          ...tmpPiece,
          dossierId: resDossier.id,
        });
        return pieceCreate;
      })
    );

    // get and update demandeur
    let demandeur = {} as Demandeur;
    if (dossierItem.demandeurId) {
      demandeur = await getDemandeur(dossierItem.demandeurId.toString());
    }
    await updateDemandeur({ ...demandeur, id: resDemandeur.id });
    router.push(`/dossier/${resDossier.id}`);
    setShowLoader(false);
  };

  const removeDossier = async (dossier: Dossier) => {
    try {
      let res = await deleteDossier(dossier.id);
      setDossiers(dossiers.filter((d) => d.id !== dossier.id));
      console.log("res delete : ", res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrder = (termToOrder: string) => {
    setOrder(
      termToOrder === termOrdered ? (order === "desc" ? "asc" : "desc") : "desc"
    );
    setTermToOrder(termToOrder as keyof Dossier);
  };

  React.useEffect(() => {
    fetchDossiers();
  }, [search, termOrdered, order, page, status]);

  React.useEffect(() => {
    fetchDossiers();
  }, []);

  return (
    <div className={styles.containerDossiers}>
      <TableCard title={"Dossiers en cours"}>
        <div>
          <div className={styles.headRow}>
            <OrderableItem
              text={"N° Dossier"}
              termToOrder={"id"}
              action={handleOrder}
              termOrdered={termOrdered}
              order={order}
            ></OrderableItem>
            <OrderableItem
              text={"Nom Projet"}
              termToOrder={"nom"}
              action={handleOrder}
              termOrdered={termOrdered}
              order={order}
            ></OrderableItem>
            <OrderableItem
              text={"Statut"}
              termToOrder={"statut"}
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
            <div className={styles.itemHead}>Actions</div>
            <div className={styles.itemHead}>Notifications</div>
          </div>
          {showLoader ? <div style={{textAlign: 'center', margin: '2rem'}}><IconLoader></IconLoader></div> : 
          dossiers.map((dossier, index) => {
            const commentsNotifications: CommentaireNotifications = {
              dossierId: dossier.id,
              notificationsProject: comments?.filter(
                (comment) =>
                  comment.dossierId === dossier.id &&
                  comment.seen !== true &&
                  comment.source === "INSTRUCTEUR" &&
                  comment.enfantId === null
              ).length,
              notificationsChildren: comments?.filter(
                (comment) =>
                  comment.dossierId === dossier.id &&
                  comment.seen !== true &&
                  comment.source === "INSTRUCTEUR" &&
                  comment.enfantId !== null
              ).length,
            };
            return (
              <div className={styles.rowDossier} key={index}>
                <div className={styles.itemDossier}>{dossier.id}</div>
                <div className={styles.itemDossier}>{dossier.nom}</div>
                <div className={styles.itemDossier}>
                  <LabelStatus status={dossier.statut}></LabelStatus>
                </div>
                <div className={styles.itemDossier}>
                  {dossier.dateDerniereModification
                    ? frenchDateText(dossier.dateDerniereModification)
                    : ""}
                  {showDialogue && indexItem === dossier.id && (
                    <div className={styles.confirmDialogueWrapper}>
                      {type === "delete" ? (
                        <div className={styles.confirmDialogue}>
                          <div>{`Voulez-vous supprimer le dossier`}</div>
                          <div className={styles.dossierName}>
                            {dossier.nom} ?
                          </div>
                          <div className={styles.btnList}>
                            <ButtonLink
                              onClick={() => {
                                setShowDialogue(false);
                                removeDossier(dossier);
                              }}
                            >
                              Oui
                            </ButtonLink>
                            <ButtonLink
                              onClick={() => {
                                setShowDialogue(false);
                              }}
                            >
                              Non
                            </ButtonLink>
                          </div>
                        </div>
                      ) : (
                        <ShareDossierModal
                          dossier={dossier}
                          showDialogue={showDialogue}
                          setShowDialogue={setShowDialogue}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className={`${styles.itemDossier} ${styles.actionsItem}`}>
                  <div
                    className={styles.actionsBtn}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDropdownVisible(!dropdownVisible);
                      setIndexItem(dossier.id);
                      setShowDialogue(false);
                    }}
                  >
                    Actions
                    <TiArrowSortedDown
                      size={"20px"}
                      style={{
                        marginLeft: "6px",
                        marginTop: "2px",
                      }}
                    />
                  </div>
                  {dropdownVisible && indexItem === dossier.id && (
                    <div
                      ref={dropdownRef}
                      className={`${styles.dropdown} dropdownWrapper`}
                    >
                      <ul>
                        <li
                          onClick={() => {
                            router.push(`/dossier/${dossier.id}`);
                          }}
                        >
                          <BiEditAlt
                            size={"20px"}
                            style={{ marginRight: "10px" }}
                          />
                          Éditer
                        </li>
                        {session?.dbUser.id === dossier.userId && (
                          <>
                            <li
                              onClick={async () => {
                                duplicateDossier(dossier);
                              }}
                            >
                              <HiOutlineDocumentDuplicate
                                size={"20px"}
                                style={{ marginRight: "10px" }}
                              />
                              Dupliquer
                            </li>
                            <li
                              onClick={async () => {
                                setShowDialogue(true);
                                setType("share");
                                setDropdownVisible(false);
                              }}
                            >
                              <FiUsers
                                size={"20px"}
                                style={{ marginRight: "10px" }}
                              />
                              Partager
                            </li>
                            <li
                              onClick={() => {
                                setShowDialogue(true);
                                setType("delete");
                                setDropdownVisible(false);
                              }}
                            >
                              <BiTrash
                                size={"20px"}
                                style={{ marginRight: "10px" }}
                              />
                              Supprimer
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={styles.itemDossier}>
                  <CountPieces
                    commentsNotifications={commentsNotifications}
                    dossier={dossier}
                    piecesJustif={dossier.piecesDossier
                      .map((piece) => piece.statut)
                      .concat(
                        dossier.enfants
                          .map((enfant) => enfant.piecesDossier)
                          .flat()
                          .map((piece) => piece.statut)
                      )}
                  ></CountPieces>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          {[...Array(Math.ceil(countDossiers / 10))].map((e, i) => (
            <ButtonLink
              light={page !== i + 1}
              onClick={() => {
                setPage(i + 1);
              }}
              key={i}
            >
              {i + 1}
            </ButtonLink>
          ))}
        </div>
      </TableCard>
    </div>
  );
};

export default TableDossiers;
