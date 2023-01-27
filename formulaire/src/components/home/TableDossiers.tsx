import { Dossier } from "@prisma/client";
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

interface Props {
    search: string
    action: (encours: number, termines: number) => void
    status: statusGroup
}

const TableDossiers: React.FC<Props> = ({ search, action, status }) => {
    const router = useRouter()
    const [dossiers, setDossiers] = React.useState<DossierData[]>([])
    const [countDossiers, setCountDossiers] = React.useState<number>(0)
    const [page, setPage] = React.useState<number>(1)
    const [termOrdered, setTermToOrder] = React.useState<keyof Dossier>('dateDerniereModification')
    const [order, setOrder] = React.useState<'asc' | 'desc'>('desc')

    const fetchDossiers = async () => {
        let res = await getDossiers(page, status, search, termOrdered, order)
        setDossiers(res.dossiers)
        setCountDossiers(res.countCurrent)
        action(res.countEnCours, res.countTermines)
    }

    const handleOrder = (termToOrder: string) => {
        setOrder(termToOrder === termOrdered ? order === 'desc' ? 'asc' : 'desc' : 'desc')
        setTermToOrder(termToOrder as keyof Dossier);
    }

    React.useEffect(() => {
        fetchDossiers()
    }, [ search, termOrdered, order, page, status ])

    React.useEffect(() => {
        fetchDossiers()
    }, [])

    return (
        <div className={styles.containerDossiers}>
            <TableCard title={'Dossiers en cours'}>
                <div>
                    <div className={styles.headRow}>
                            <OrderableItem text={'N° Dossier'} termToOrder={'id'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                            <OrderableItem text={'Nom Projet'} termToOrder={'nom'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                            <OrderableItem text={'Statut'} termToOrder={'statut'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                            <OrderableItem text={'Mis à jour'} termToOrder={'dateDerniereModification'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                            <div className={styles.itemHead}>
                                Actions
                            </div>
                            <div className={styles.itemHead}>
                                Pièces justificatives
                            </div>
                        </div>
                        {dossiers.map((dossier) => (
                            <div className={styles.rowDossier} key={dossier.id}>
                                <div className={styles.itemDossier}>
                                    {dossier.id}
                                </div>
                                <div className={styles.itemDossier}>
                                    {dossier.nom}
                                </div>
                                <div className={styles.itemDossier}>
                                    <LabelStatus status={dossier.statut}></LabelStatus>
                                </div>
                                <div className={styles.itemDossier}>
                                    {dossier.dateDerniereModification ? frenchDateText(dossier.dateDerniereModification) : ''}
                                </div>
                                <div className={styles.itemDossier}>
                                    <ButtonLink light={true} onClick={() => {router.push(`/dossier/${dossier.id}`)}}>Éditer</ButtonLink>
                                </div>
                                <div className={styles.itemDossier}>
                                    <CountPieces dossier={dossier} 
                                    piecesJustif={
                                        dossier.piecesDossier.map(piece => piece.statut).concat(
                                            dossier.enfants.map(enfant => enfant.piecesDossier).flat().map(piece => piece.statut)
                                        )
                                    }></CountPieces>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={styles.pagination}>
                    {[...Array(Math.ceil(countDossiers/10))].map((e, i) => (
                        <ButtonLink light={page !== (i + 1)} onClick={() => {setPage(i + 1)}} key={i}>{i + 1}</ButtonLink>
                    ))}
                </div>
            </TableCard>
        </div>
    );
};

export default TableDossiers;