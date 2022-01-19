import {AppThunk} from "./store";
import {appActions} from "./action-creators";
import {transformersClient} from "../client/TransformersClient";
import {Base, BattleField, Inspection, Modification, Operation, Transformer, Transport, Upgrade} from "../client/types";
import {
    baseClient,
    battleFieldsClient,
    inspectionsClient,
    modificationsClient, operationsClient, transportClient,
    upgradesClient
} from "../client/BaseClient";

export const getTransformers = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Transformer[] = await transformersClient.getTransfromers()
        dispatch(appActions.setTransformers(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const createTransformer = (params: Transformer): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transformersClient.addTransformer(params);
        const data: Transformer[] = await transformersClient.getTransfromers();
        dispatch(appActions.setTransformers(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateTransformer = (params: Transformer): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transformersClient.updateTransformer(params);
        const data: Transformer[] = await transformersClient.getTransfromers();
        dispatch(appActions.setTransformers(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteTransformers = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transformersClient.deleteTransformersByIdIn(ids);
        const data: Transformer[] = await transformersClient.getTransfromers();
        dispatch(appActions.setTransformers(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getBases = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Base[] = await baseClient.getBases()
        dispatch(appActions.setBases(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const createBase = (params: Omit<Base, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await baseClient.addBase(params);
        const data: Base[] = await baseClient.getBases();
        dispatch(appActions.setBases(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateBase = (params: Base): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await baseClient.updateBase(params);
        const data: Base[] = await baseClient.getBases();
        dispatch(appActions.setBases(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteBases = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await baseClient.deleteBasesByIdIn(ids);
        const data: Base[] = await baseClient.getBases();
        dispatch(appActions.setBases(data));
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getBattleFields = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: BattleField[] = await battleFieldsClient.getFields()
        dispatch(appActions.setBattleFields(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const createBattleField = (params: Omit<BattleField, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await battleFieldsClient.addField(params);
        const data: BattleField[] = await battleFieldsClient.getFields()
        dispatch(appActions.setBattleFields(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateBattleField = (params: BattleField): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await battleFieldsClient.updateField(params);
        const data: BattleField[] = await battleFieldsClient.getFields()
        dispatch(appActions.setBattleFields(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteBattleFields = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await battleFieldsClient.deleteFieldsByIdIn(ids);
        const data: BattleField[] = await battleFieldsClient.getFields()
        dispatch(appActions.setBattleFields(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getUpgrades = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Upgrade[] = await upgradesClient.getUpgrades()
        dispatch(appActions.setUpgrades(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const createUpgrade = (params: Omit<Upgrade, "id" | "modifications">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await upgradesClient.addUpgrade(params);
        const data: Upgrade[] = await upgradesClient.getUpgrades()
        dispatch(appActions.setUpgrades(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const addModificationToUpgrade = (params: { upgradeId: number, modificationId: number }): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await upgradesClient.addModificationToUpgrade(params);
        const data: Upgrade[] = await upgradesClient.getUpgrades()
        dispatch(appActions.setUpgrades(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteUpgrades = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await upgradesClient.deleteUpgradesByIdIn(ids);
        const data: Upgrade[] = await upgradesClient.getUpgrades()
        dispatch(appActions.setUpgrades(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getModifications = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Modification[] = await modificationsClient.getModifications()
        dispatch(appActions.setModifications(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const createInspection = (params: Omit<Inspection, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await inspectionsClient.addInspection(params);
        const data: Inspection[] = await inspectionsClient.getInspections()
        dispatch(appActions.setInspections(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateInspection = (params: Inspection): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await inspectionsClient.updateInspection(params);
        const data: Inspection[] = await inspectionsClient.getInspections()
        dispatch(appActions.setInspections(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteInspections = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await inspectionsClient.deleteInspectionsByIdIn(ids);
        const data: Inspection[] = await inspectionsClient.getInspections()
        dispatch(appActions.setInspections(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createModification = (params: Omit<Modification, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await modificationsClient.addModification(params);
        const data: Modification[] = await modificationsClient.getModifications()
        dispatch(appActions.setModifications(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateModification = (params: Modification): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await modificationsClient.updateModification(params);
        const data: Modification[] = await modificationsClient.getModifications()
        dispatch(appActions.setModifications(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const deleteModifications = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await upgradesClient.deleteUpgradesByIdIn(ids);
        const data: Modification[] = await modificationsClient.getModifications()
        dispatch(appActions.setModifications(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getInspections = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Inspection[] = await inspectionsClient.getInspections()
        dispatch(appActions.setInspections(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const getOperations = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Operation[] = await operationsClient.getOperations()
        dispatch(appActions.setOperations(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const getTransport = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Transport[] = await transportClient.getTransport()
        dispatch(appActions.setTransport(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}
