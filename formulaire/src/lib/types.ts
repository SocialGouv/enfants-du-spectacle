import { Demandeur, SocieteProduction } from "@prisma/client"

export type statusGroup = 'enCours' | 'termines'

export type DemandeurData = Demandeur & {
    societeProduction: SocieteProduction
}