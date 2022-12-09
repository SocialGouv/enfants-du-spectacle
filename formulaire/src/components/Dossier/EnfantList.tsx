import React from "react";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { Dossier, Enfant } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";
import { birthDateToFrenchAge, TYPE_EMPLOI } from "../../lib/helpers";
import styles from "./EnfantList.module.scss";
import { ButtonLink } from "src/uiComponents/button";
import Foldable from "../FoldableItem";
import EnfantForm from "./EnfantForm";
import { createEnfant } from "src/fetching/enfant";
import Link from "next/link";
import {useRef} from 'react';

interface Props {
    dossier: DossierData
}

const EnfantList: React.FC<Props> = ({dossier}) => {
    const [enfants, setEnfants] = React.useState<Enfant[]>(dossier.enfants)
    const [selectedEnfant, setSelectedEnfant] = React.useState<Enfant>()
    const [page, setPage] = React.useState<number>(0)
    const myRef = useRef(null);

    const scrollToRef = (ref: React.MutableRefObject<null>) => {
        if(ref && ref.current) {
            window.scrollTo(0, ref?.current?.offsetTop) 
        }
    }

    const addEnfant = async () => {
        let res = await createEnfant({nom: 'Enfant', prenom: 'Nouvel', dossierId: dossier.id, typeEmploi: 'ROLE_1', nomPersonnage:''} as Enfant)
        setEnfants([ res, ...enfants])
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
        console.log('enfant to refresh in list : ', enfantUp)
        setEnfants(
            enfants.map((enfant) => {return enfant.id === enfantUp.id ? enfantUp : enfant})
        )
    }

    const handlePage = (pageToGo: number) => {
        setPage(pageToGo)
    }

    React.useEffect(() => {
        console.log('selected : ', selectedEnfant)
    }, [selectedEnfant])

    return (
        <div className={styles.enfantList}>
            
        <Card>
            <CardTitle>
                <span className={styles.titleTable}>Enfants</span>
            </CardTitle>
            <CardDescription>

            <div className={styles.headRow}>
                <div className={styles.itemHead}>
                    Rôle
                </div>
                <div className={styles.itemHead}>
                    Nom et prénom
                </div>
                <div className={styles.itemHead}>
                    Age
                </div>
                <div className={styles.itemHead}>
                    Personnage
                </div>
                <div className={styles.itemHead}>
                    Jours travaillés
                </div>
                <div className={styles.itemHead}>
                    Pièces justificatives
                </div>
            </div>
            {enfants.slice(page * 10, (page * 10) + 10).map((enfant) => (
                <Link href={`#row-enfant-${enfant.id}`} className={styles.tableEnfant} key={`table-enfant-${enfant.id}`} onClick={() => {clickEnfant(enfant)}}>
                    <div className={styles.itemDossier}>
                        {enfant.typeEmploi}
                    </div>
                    <div className={styles.itemDossier}>
                        {`${enfant.nom} ${enfant.prenom}`}
                    </div>
                    <div className={styles.itemDossier}>
                        {enfant.dateNaissance ? birthDateToFrenchAge(enfant.dateNaissance) : ''}
                    </div>
                    <div className={styles.itemDossier}>
                        {enfant.nomPersonnage}
                    </div>
                    <div className={styles.itemDossier}>
                        {enfant.nombreJours}
                    </div>
                    <div className={styles.itemDossier}>
                        Pièces justificatives
                    </div>
                </Link>
            ))}
            <div className={styles.pagination}>
                {[...Array(Math.ceil(enfants.length/10))].map((e, i) => (
                    <ButtonLink light={page !== (i)} onClick={() => {handlePage(i)}} key={i}>{i + 1}</ButtonLink>
                ))}
            </div>
            </CardDescription>
        </Card>

        <div className={styles.actionRow} ref={myRef}>
            <ButtonLink light={true} onClick={() => {addEnfant()}}>Ajouter un enfant</ButtonLink>
        </div>

        <div className={styles.listEnfants}>
        {enfants.map((enfant) => (
            <div className={styles.rowEnfant} key={`row-enfant-${enfant.id}`} id={`row-enfant-${enfant.id}`}>
                <Card>
                    <CardTitle>
                        <div className={styles.titleTable}>{`${enfant.typeEmploi} : ${enfant.nom} ${enfant.prenom} (${enfant.dateNaissance ? birthDateToFrenchAge(enfant.dateNaissance) : ''}) - Personnage : ${enfant.nomPersonnage}`}</div>
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