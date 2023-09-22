import React from "react";
import { Comments, Enfant } from "@prisma/client";
import { birthDateToFrenchAge, frenchDateText } from "../../lib/helpers";
import styles from "./EnfantList.module.scss";
import { getEnfantsByDossierId } from "src/fetching/enfant";
import useStateContext from "src/context/StateContext";
import { set } from "date-fns";
import TableCard from "../TableCard";
import OrderableItem from "../home/OrderableItem";
import { ButtonLink } from "src/uiComponents/button";
import { EnfantData } from "src/fetching/dossiers";
import moment from "moment";
import CountPieces from "../CountPieces";
import { CommentaireNotifications } from "src/lib/types";
import IconLoader from "../IconLoader";
import Image from "next/image";
import EnfantForm from "./EnfantForm";

interface Props {
  allowChanges: Boolean;
}

const EnfantListBis: React.FC<Props> = ({ allowChanges }) => {
  const contextDossier = { ...useStateContext() };
  const [enfants, setEnfants] = React.useState<EnfantData[]>([]);
  const [termOrdered, setTermToOrder] = React.useState<keyof Enfant>(
    "nom"
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState<number>(0);
  const [numberEnfants, setNumberEnfants] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedEnfant, setSelectedEnfant] = React.useState<EnfantData | null>(null)
  const [scrollPosition, setScrollPosition] = React.useState(0);

  /*const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);*/

  const fetchEnfants = async () => {
    setLoading(true);
    const enfantsFetched = await getEnfantsByDossierId(contextDossier.dossier.id, page, termOrdered, order)
    setEnfants(enfantsFetched.enfants);
    setNumberEnfants(enfantsFetched.count);
    setLoading(false);
  }

  const handleOrder = (termToOrder: string) => {
    setOrder(
      termToOrder === termOrdered ? (order === "desc" ? "asc" : "desc") : "desc"
    );
    setTermToOrder(termToOrder as keyof Enfant);
  };

  const handlePage = (page: number) => {
    setPage(page); 
  };

  React.useEffect(() => {
    fetchEnfants() 
  }, [order, page])

  return (
    <div className={styles.enfantList}>

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
        {loading ? <div style={{textAlign: 'center', margin: '2rem'}}><IconLoader></IconLoader></div> : 
        enfants.map((enfant) => {
          const commentsNotifications: CommentaireNotifications = {
            dossierId: contextDossier.dossier.id,
            notificationsProject: 0,
            notificationsChildren: enfant.comments?.length || 0,
          };
          return (
            <a href={`#row-enfant-${enfant.id}`}
              className={(selectedEnfant && selectedEnfant?.id === enfant.id) ? `${styles.tableEnfant} ${styles.selected}` : styles.tableEnfant}
              key={`table-enfant-${enfant.id}`}
              onClick={() => {
                setSelectedEnfant(enfant);
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
          )
        })}
        <div className={styles.pagination}>
          {[...Array(Math.ceil(numberEnfants / 25))].map(
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

      {selectedEnfant && (
        <>
        <br />
        <TableCard title={`${selectedEnfant.nom} ${selectedEnfant.prenom}`}>
          <EnfantForm
            enfant={selectedEnfant}
            allowChanges={allowChanges}
            refresh={() => {
              console.log('refresh')
            }}
          ></EnfantForm>
        </TableCard>
        </>
      )}

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
  )
};

export default EnfantListBis;
