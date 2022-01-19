import {InferActionsType} from "./store";
import {ActionTypes} from "./action-types";
import {Base, Transformer} from "../client/types";

export const appActions = {
    setTransformers: (payload: Transformer[] | null) => ({
        type: ActionTypes.SET_TRANSFORMERS,
        payload
    } as const),

    setBases: (payload: Base[] | null) => ({
        type: ActionTypes.SET_BASES,
        payload
    } as const),

    setFetching: (payload: boolean) => ({
        type: ActionTypes.SET_FETCHING,
        payload
    } as const),

    setError: (payload: string) => ({
        type: ActionTypes.SET_ERROR,
        payload
    } as const),
}

export type AppActionsType = InferActionsType<typeof appActions>;
