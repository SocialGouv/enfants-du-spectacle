import React from "react";
import { Card, CardDescription, CardTitle } from "@dataesr/react-dsfr";
import { Enfant } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";
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

interface Props {
    dossier: DossierData
    enfants: Enfant[]
    passData: (enfans: Enfant[]) => void;
}

const EnfantList: React.FC<Props> = ({dossier, enfants, passData}) => {
    const [enfantsTmp, setEnfants] = React.useState<Enfant[]>(enfants)
    const [selectedEnfant, setSelectedEnfant] = React.useState<Enfant>()
    const [page, setPage] = React.useState<number>(0)
    const myRef = useRef(null);
    const [termOrdered, setTermToOrder] = React.useState<keyof Enfant>('dateDerniereModification')
    const [order, setOrder] = React.useState<'asc' | 'desc'>('desc')

    const scrollToRef = (ref: React.MutableRefObject<null>) => {
        if(ref && ref.current) {
            window.scrollTo(0, ref?.current?.offsetTop) 
        }
    }

    const addEnfant = async () => {
        let res = await createEnfant({nom: 'Enfant', prenom: 'Nouvel', dossierId: dossier.id, typeEmploi: 'ROLE_1', nomPersonnage:''} as Enfant)
        setEnfants([ res, ...enfantsTmp])
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
        setEnfants(
            enfantsTmp.map((enfant) => {return enfant.id === enfantUp.id ? enfantUp : enfant})
        )
    }

    const handlePage = (pageToGo: number) => {
        setPage(pageToGo)
    }

    const handleOrder = (termToOrder: string) => {
        setOrder(termToOrder === termOrdered ? order === 'desc' ? 'asc' : 'desc' : 'desc')
        setTermToOrder(termToOrder as keyof Enfant);
    }

    React.useEffect(() => {
        setEnfants([...enfantsTmp].sort(function (a, b) {
            if (a[termOrdered] && b[termOrdered] && a[termOrdered] < b[termOrdered]) {
                return order === 'desc' ? 1 : -1;
            }
            if (a[termOrdered] && b[termOrdered] && a[termOrdered] > b[termOrdered]) {
                return order === 'desc' ? -1 : 1;
            }
            return 0;
        }))
        console.log('order done')
    }, [order, termOrdered])

    React.useEffect(() => {
        passData(enfantsTmp)
    }, [enfantsTmp, passData])

    return (
        <div className={styles.enfantList}>
            
        <Card>
            <CardTitle>
                <span className={styles.titleTable}>Enfants</span>
            </CardTitle>
            <CardDescription>

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
            {enfantsTmp.slice(page * 10, (page * 10) + 10).map((enfant) => (
                <Link href={`#row-enfant-${enfant.id}`} className={styles.tableEnfant} key={`table-enfant-${enfant.id}`} onClick={() => {clickEnfant(enfant)}}>
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
                        Pièces justificatives
                    </div>
                </Link>
            ))}
            <div className={styles.pagination}>
                {[...Array(Math.ceil(enfantsTmp.length/10))].map((e, i) => (
                    <ButtonLink light={page !== (i)} onClick={() => {handlePage(i)}} key={i}>{i + 1}</ButtonLink>
                ))}
            </div>
            </CardDescription>
        </Card>

        <div className={styles.actionRow} ref={myRef}>
            <ButtonLink light={true} onClick={() => {addEnfant()}}>Ajouter un enfant</ButtonLink>
        </div>

        <div className={styles.listEnfants}>
        {enfantsTmp.map((enfant) => (
            <div className={styles.rowEnfant} key={`row-enfant-${enfant.id}`} id={`row-enfant-${enfant.id}`}>
                <Card>
                    <CardTitle>
                        <div className={styles.titleTable}>{`${enfant.typeEmploi} : ${enfant.nom} ${enfant.prenom} (${enfant.dateNaissance ? birthDateToFrenchAge(moment(enfant.dateNaissance).toDate()) : ''}) - Personnage : ${enfant.nomPersonnage}`}</div>
                    </CardTitle>
                    <CardDescription>
                    <Foldable hidden={true} folded={!(selectedEnfant?.id === enfant.id)} action={() => {handleFolded(enfant)}}>
                        <EnfantForm enfant={enfant} refresh={handleRefresh}></EnfantForm>
                    </Foldable>
                    </CardDescription>
                </Card>
            </div>
        ))}
        </div>
            
        </div>
    );
};

export default EnfantList;