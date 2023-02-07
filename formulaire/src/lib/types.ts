import { Demandeur, SocieteProduction } from "@prisma/client"

export type statusGroup = 'enCours' | 'termines'

export type DemandeurData = Demandeur & {
    societeProduction: SocieteProduction
}

export type TokenizedLink = {
    id: number,
    type: string,
    statut: string | null,
    link: string
}