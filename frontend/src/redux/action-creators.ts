import {InferActionsType} from "./store";
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

export const appActions = {
    setTransformers: (payload: Transformer[] | null) => ({
        type: ActionTypes.SET_TRANSFORMERS,
        payload
    } as const),

    setBases: (payload: Base[] | null) => ({
        type: ActionTypes.SET_BASES,
        payload
    } as const),

    setUpgrades: (payload: Upgrade[] | null) => ({
        type: ActionTypes.SET_UPGRADES,
        payload
    } as const),

    setWeapons: (payload: Weapon[] | null) => ({
        type: ActionTypes.SET_WEAPONS,
        payload
    } as const),

    setTransport: (payload: Transport[] | null) => ({
        type: ActionTypes.SET_TRANSPORT,
        payload
    } as const),

    setInspections: (payload: Inspection[] | null) => ({
        type: ActionTypes.SET_INSPECTIONS,
        payload
    } as const),

    setOperations: (payload: Operation[] | null) => ({
        type: ActionTypes.SET_OPERATIONS,
        payload
    } as const),

    setBattleFields: (payload: BattleField[] | null) => ({
        type: ActionTypes.SET_BATTLE_FIELDS,
        payload
    } as const),

    setEnergon: (payload: Energon[] | null) => ({
        type: ActionTypes.SET_ENERGON,
        payload
    } as const),

    setEquipment: (payload: Equipment[] | null) => ({
        type: ActionTypes.SET_EQUIPMENT,
        payload
    } as const),

    setInjury: (payload: Injury[] | null) => ({
        type: ActionTypes.SET_INJURY,
        payload
    } as const),

    setModifications: (payload: Modification[] | null) => ({
        type: ActionTypes.SET_MODIFICATIONS,
        payload
    } as const),

    setPositions: (payload: Position[] | null) => ({
        type: ActionTypes.SET_POSITIONS,
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
