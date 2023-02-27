import {
  Demandeur,
  Dossier,
  JustificatifDossier,
  PieceDossier,
  SocieteProduction,
} from "@prisma/client";
import IconLoader from "../IconLoader";
import { useRouter } from "next/router";
import React from "react";
import { statusGroup } from "src/lib/types";
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
import { deleteDossier, duplicateDossierEds } from "../../fetching/dossiers";
import {
  createDemandeur,
  deleteDemandeur,
  updateDemandeur,
  getDemandeur,
} from "../../fetching/demandeur";
import { createPiece, getPieces } from "../../fetching/pieces";

interface Props {
  search: string;
  action: (encours: number, termines: number) => void;
  status: statusGroup;
}

const TableDossiers: React.FC<Props> = ({ search, action, status }) => {
  const router = useRouter();
  const [showDialogue, setShowDialogue] = React.useState<boolean>(false);
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [dossiers, setDossiers] = React.useState<DossierData[]>([]);
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);
  const [countDossiers, setCountDossiers] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [termOrdered, setTermToOrder] = React.useState<keyof Dossier>(
    "dateDerniereModification"
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");

  const fetchDossiers = async () => {
    let res = await getDossiers(page, status, search, termOrdered, order);
    setDossiers(res.dossiers);
    setCountDossiers(res.countCurrent);
    action(res.countEnCours, res.countTermines);
  };

  const [indexItem, setIndexItem] = React.useState<number>();

  const duplicateDossier = async (dossierItem: Dossier) => {
    setShowLoader(true);
    // create empty demandeur
    let resDemandeur = await createDemandeur({} as Demandeur);

    // create dossier
    let resDossier = await duplicateDossierEds({
      ...dossierItem,
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
    let res = await deleteDossier(dossier.id);
    setDossiers(dossiers.filter((d) => d.id !== dossier.id));
    let resDemandeur = await deleteDemandeur(dossier.demandeurId as number);
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
      {showLoader && (
        <div className={styles.containerLoader}>
          <IconLoader />
        </div>
      )}
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
            <div className={styles.itemHead}>Pièces justificatives</div>
          </div>
          {dossiers.map((dossier, index) => (
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
              </div>
              <div className={`${styles.itemDossier} ${styles.actionsItem}`}>
                <ButtonLink
                  light={true}
                  onClick={() => {
                    setDropdownVisible(!dropdownVisible);
                    setIndexItem(dossier.id);
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
                </ButtonLink>
                {dropdownVisible && indexItem === dossier.id && (
                  <div className={styles.dropdown}>
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
                        onClick={() => {
                          setShowDialogue(true);
                        }}
                      >
                        <BiTrash
                          size={"20px"}
                          style={{ marginRight: "10px" }}
                        />
                        Supprimer
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {showDialogue && indexItem === dossier.id && (
                <div className={styles.confirmDialogueWrapper}>
                  <div className={styles.confirmDialogue}>
                    <div>Voulez-vous supprimer ce dossier ? </div>
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
                </div>
              )}
              <div className={styles.itemDossier}>
                <CountPieces
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
          ))}
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
