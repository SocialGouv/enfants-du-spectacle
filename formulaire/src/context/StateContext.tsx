import { Dossier } from "@prisma/client";
import React, { createContext, useReducer, useContext } from "react";
import stateReducer, { ContextValueType, Contextype, initialState } from "./StateReducer";

interface Props {
    children: React.ReactNode;
}

const StateContext = createContext({} as Contextype & {
    processEntity: (key: ContextValueType, value: Object) => void
    processInput: (entity: ContextValueType, field: string, value: string | Date | Object | Array<Object>) => void
})

export const StateProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialState)

    const processEntity = (entity: ContextValueType, value: Dossier) => {
        dispatch({
            type: 'SET_ENTITY', 
            entity: entity,
            value: value
        })
    }

    const processInput = (entity: ContextValueType, field: string, value: string | Date | Object | Array<Object>) => {
        dispatch({
            type: 'SET_INPUT_FOR_ENTITY',
            entity: entity,
            field: field, 
            value: value
        })
    }

    const value = {
        ...state,
        processEntity,
        processInput
    }

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}

const useStateContext = () => {
    const context = useContext(StateContext)

    if (context === undefined) {
        throw new Error("useFilters must be used within FiltersContext")
    }

    return context
}

export default useStateContext