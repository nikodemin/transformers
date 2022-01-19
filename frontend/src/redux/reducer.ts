import {Reducer} from "redux";
import {AppActionsType} from "./action-creators";
import {ActionTypes} from "./action-types";
import {Base, Transformer} from "../client/types";

interface AppState {
    transformers: Transformer[] | null;
    bases: Base[] | null;
    isFetching: boolean;
    error: string;
}

const initialState: Readonly<AppState> = {
    transformers: null,
    bases: null,
    isFetching: false,
    error: "",
}

export const appReducer: Reducer<AppState, AppActionsType> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_TRANSFORMERS:
            return {
                ...state,
                transformers: action.payload,
            }
        case ActionTypes.SET_BASES:
            return {
                ...state,
                bases: action.payload,
            }
        case ActionTypes.SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}
