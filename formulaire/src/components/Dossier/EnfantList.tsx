import React from "react";
import { Card, CardDescription, CardTitle } from "@dataesr/react-dsfr";
import { Enfant } from "@prisma/client";
import { birthDateToFrenchAge, frenchDateText } from "../../lib/helpers";
import styles from "./EnfantList.module.scss";
import { ButtonLink } from "src/uiComponents/button";
import Foldable from "../FoldableItem";
import EnfantForm from "./EnfantForm";
import { createEnfant } from "src/fetching/enfant";
import Link from "next/link";
import {useRef} from 'react';
import moment from 'moment';
import OrderableItem from "../home/OrderableItem";
import Image from "next/image";
import useStateContext from "src/context/StateContext";
import CountPieces from "../CountPieces";
import TableCard from "../TableCard";

interface Props {
    allowChanges: Boolean
}

const EnfantList: React.FC<Props> = ({ allowChanges }) => {
    const contextDossier = {...useStateContext()}
    const [selectedEnfant, setSelectedEnfant] = React.useState<Enfant>()
    const [page, setPage] = React.useState<number>(0)
    const myRef = useRef(null);
    const [termOrdered, setTermToOrder] = React.useState<keyof Enfant>('dateDerniereModification')
    const [order, setOrder] = React.useState<'asc' | 'desc'>('desc')

    const [scrollPosition, setScrollPosition] = React.useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedEnfant]);

    const scrollToRef = (ref: React.MutableRefObject<null>) => {
        if(ref && ref.current) {
            window.scrollTo(0, ref?.current?.offsetTop) 
        }
    }

    const addEnfant = async () => {
        let res = await createEnfant({nom: 'Enfant', prenom: 'Nouvel', dossierId: contextDossier.dossier.id, typeEmploi: 'ROLE_1', nomPersonnage:'', montantCachet: 0, remunerationTotale: 0} as Enfant)
        contextDossier.processEntity('enfants', [ res, ...contextDossier.enfants])
        setSelectedEnfant(res)
        scrollToRef(myRef)
    }

    const clickEnfant = (enfant: Enfant) => {
        setSelectedEnfant(enfant)
    }

    const handleFolded = (enfant: Enfant) => {
        if(selectedEnfant?.id === enfant.id) {
            setSelectedEnfant({} as Enfant)
        } else {
            setSelectedEnfant(enfant)
        }
    }

    const handleRefresh = (enfantUp: Enfant) => {
        contextDossier.processEntity('enfants', contextDossier.enfants.map((enfant) => {return enfant.id === enfantUp.id ? enfantUp : enfant}))
    }

    const handlePage = (pageToGo: number) => {
        setPage(pageToGo)
    }

    const handleOrder = (termToOrder: string) => {
        setOrder(termToOrder === termOrdered ? order === 'desc' ? 'asc' : 'desc' : 'desc')
        setTermToOrder(termToOrder as keyof Enfant);
    }

    React.useEffect(() => {
        contextDossier.processEntity('enfants', [...contextDossier.enfants].sort(function (a, b) {
            if (a[termOrdered] && b[termOrdered] && a[termOrdered] < b[termOrdered]) {
                return order === 'desc' ? 1 : -1;
            }
            if (a[termOrdered] && b[termOrdered] && a[termOrdered] > b[termOrdered]) {
                return order === 'desc' ? -1 : 1;
            }
            return 0;
        }))
    }, [order, termOrdered])

    return (
        <div className={styles.enfantList}>

            <TableCard title={'Enfants'}>
                <div className={styles.headRow}>
                    <OrderableItem text={'Rôle'} termToOrder={'typeEmploi'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                    <OrderableItem text={'Nom et prénom'} termToOrder={'nom'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                    <OrderableItem text={'Age'} termToOrder={'dateNaissance'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                    <OrderableItem text={'Personnage'} termToOrder={'nomPersonnage'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                    <OrderableItem text={'Mis à jour'} termToOrder={'dateDerniereModification'} action={handleOrder} termOrdered={termOrdered} order={order}></OrderableItem>
                    <div className={styles.itemHead}>
                        Pièces justificatives
                    </div>
                </div>
                {contextDossier.enfants.slice(page * 10, (page * 10) + 10).map((enfant) => (
                    <a href={`#row-enfant-${enfant.id}`} className={styles.tableEnfant} key={`table-enfant-${enfant.id}`} onClick={() => {clickEnfant(enfant)}}>
                        <div className={styles.itemDossier}>
                            {enfant.typeEmploi}
                        </div>
                        <div className={styles.itemDossier}>
                            {`${enfant.nom} ${enfant.prenom}`}
                        </div>
                        <div className={styles.itemDossier}>
                            {enfant.dateNaissance ? birthDateToFrenchAge(moment(enfant.dateNaissance).toDate()) : ''}
                        </div>
                        <div className={styles.itemDossier}>
                            {enfant.nomPersonnage}
                        </div>
                        <div className={styles.itemDossier}>
                            {enfant.dateDerniereModification ? frenchDateText(enfant.dateDerniereModification) : ''}
                        </div>
                        <div className={styles.itemDossier}>
                            {enfant.piecesDossier &&
                                <CountPieces piecesJustif={enfant.piecesDossier.map(piece => piece.statut)}></CountPieces>
                            }
                        </div>
                    </a>
                ))}
                <div className={styles.pagination}>
                    {[...Array(Math.ceil(contextDossier.enfants.length/10))].map((e, i) => (
                        <ButtonLink light={page !== (i)} onClick={() => {handlePage(i)}} key={i}>{i + 1}</ButtonLink>
                    ))}
                </div>
            </TableCard>

            {(contextDossier.dossier.statut === 'BROUILLON' || contextDossier.dossier.statut === 'CONSTRUCTION') &&
                <div className={styles.actionRow} ref={myRef}>
                    <ButtonLink light={true} onClick={() => {addEnfant()}}>Ajouter un enfant</ButtonLink>
                </div>
            }

            <div className={styles.listEnfants}>
            {contextDossier.enfants.map((enfant) => (
                <div className={styles.rowEnfant} key={`row-enfant-${enfant.id}`} id={`row-enfant-${enfant.id}`}>
                    <TableCard title={`${enfant.typeEmploi} : ${enfant.nom} ${enfant.prenom} (${enfant.dateNaissance ? birthDateToFrenchAge(moment(enfant.dateNaissance).toDate()) : ''}) - Personnage : ${enfant.nomPersonnage}`}>
                        <Foldable hidden={true} folded={!(selectedEnfant?.id === enfant.id)} action={() => {handleFolded(enfant)}}>
                            <EnfantForm enfant={enfant} refresh={handleRefresh} allowChanges={allowChanges}></EnfantForm>
                        </Foldable>
                    </TableCard>
                </div>
            ))}
            </div>

            {scrollPosition > 450 &&
                <div className={styles.buttonUp}>
                    <Link href={`#menu-dossier`}>
                        <Image
                            src={`/images/arrow-up.svg`}
                            alt="Supprimer"
                            width={30}
                            height={30}
                        />
                    </Link>
                </div>
            }
            
        </div>
    );
};

export default EnfantList;