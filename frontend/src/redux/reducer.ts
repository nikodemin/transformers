import {Reducer} from "redux";
import {AppActionsType} from "./action-creators";
import {ActionTypes} from "./action-types";
import {
    Base,
    BattleField,
    Energon, Equipment, Injury,
    Inspection, Modification,
    Operation, Position,
    Transformer,
    Transport,
    Upgrade,
    Weapon
} from "../client/types";

interface AppState {
    transformers: Transformer[] | null;
    bases: Base[] | null;
    upgrades: Upgrade[] | null;
    weapons: Weapon[] | null;
    transport: Transport[] | null;
    inspections: Inspection[] | null;
    operations: Operation[] | null;
    battleFields: BattleField[] | null;
    energon: Energon[] | null;
    equipment: Equipment[] | null;
    injury: Injury[] | null;
    modifications: Modification[] | null;
    positions: Position[] | null;
    isFetching: boolean;
    error: string;
}

const initialState: Readonly<AppState> = {
    transformers: null,
    bases: null,
    battleFields: null,
    energon: null,
    equipment: null,
    injury: null,
    inspections: null,
    modifications: null,
    operations: null,
    positions: null,
    transport: null,
    upgrades: null,
    weapons: null,
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
        case ActionTypes.SET_BATTLE_FIELDS:
            return {
                ...state,
                battleFields: action.payload,
            }
        case ActionTypes.SET_ENERGON:
            return {
                ...state,
                energon: action.payload,
            }
        case ActionTypes.SET_EQUIPMENT:
            return {
                ...state,
                equipment: action.payload,
            }
        case ActionTypes.SET_INJURY:
            return {
                ...state,
                injury: action.payload,
            }
        case ActionTypes.SET_INSPECTIONS:
            return {
                ...state,
                inspections: action.payload,
            }
        case ActionTypes.SET_MODIFICATIONS:
            return {
                ...state,
                modifications: action.payload,
            }
        case ActionTypes.SET_OPERATIONS:
            return {
                ...state,
                operations: action.payload,
            }
        case ActionTypes.SET_POSITIONS:
            return {
                ...state,
                positions: action.payload,
            }
        case ActionTypes.SET_TRANSPORT:
            return {
                ...state,
                transport: action.payload,
            }
        case ActionTypes.SET_UPGRADES:
            return {
                ...state,
                upgrades: action.payload,
            }
        case ActionTypes.SET_WEAPONS:
            return {
                ...state,
                weapons: action.payload,
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
