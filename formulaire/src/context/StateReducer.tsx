import { Demandeur, Dossier, Enfant, SocieteProduction } from "@prisma/client"
import { DossierData, EnfantData, ResDocs } from "src/fetching/dossiers"
import { DemandeurData } from "src/lib/types"

export type action = 'SET_ENTITY' | 'SET_INPUT_FOR_ENTITY' | 'SET_FILE'

export const initialState = {
    dossier: {} as DossierData,
    demandeur: {} as DemandeurData,
    enfants: [] as EnfantData[],
    societeProduction: {} as SocieteProduction,
    docs: {} as ResDocs
}

export type Contextype = typeof initialState
export type ContextValueType = keyof Contextype

const stateReducer = (state : object, action: {type: action, entity: ContextValueType, value: string | Date | Object | Array<Object>, field?: string}) => {
    const { type, entity, value, field } = action;

    switch (type) {
        case 'SET_ENTITY': 
            return {...state, 
                [entity]: value
            }
        case 'SET_INPUT_FOR_ENTITY':
            if (field)
            return {
                ...state,
                [entity]: {
                    ...state[entity],
                    [field]: value
                }
            }
        case 'SET_FILE':
            return {

            }
        default: 
            throw new Error(`No case for type ${type} found...`);
    }
}

export default stateReducer