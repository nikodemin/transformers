import {AppThunk} from "./store";
import {appActions} from "./action-creators";
import {transformersClient} from "../client/TransformersClient";
import {
    Base,
    BattleField, Energon, Equipment, Injury,
    Inspection,
    Modification,
    Operation, Position,
    Transformer,
    Transport,
    Upgrade,
    Weapon
} from "../client/types";
import {
    baseClient,
    battleFieldsClient, energonClient, equipmentClient, injuryClient,
    inspectionsClient,
    modificationsClient, operationsClient, positionsClient, transportClient,
    upgradesClient, weaponsClient
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
        await modificationsClient.deleteModificationsByIdIn(ids);
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

export const deleteOperations = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await operationsClient.deleteOperationsByIdIn(ids);
        const data: Operation[] = await operationsClient.getOperations()
        dispatch(appActions.setOperations(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createOperation = (params: Omit<Operation, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await operationsClient.addOperation(params);
        const data: Operation[] = await operationsClient.getOperations()
        dispatch(appActions.setOperations(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateOperation = (params: Operation): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await operationsClient.updateOperation(params);
        const data: Operation[] = await operationsClient.getOperations()
        dispatch(appActions.setOperations(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
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

export const deleteTransport = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transportClient.deleteTransportByIdIn(ids);
        const data: Transport[] = await transportClient.getTransport()
        dispatch(appActions.setTransport(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createTransport = (params: Omit<Transport, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transportClient.addTransport(params);
        const data: Transport[] = await transportClient.getTransport()
        dispatch(appActions.setTransport(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateTransport = (params: Transport): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await transportClient.updateTransport(params);
        const data: Transport[] = await transportClient.getTransport()
        dispatch(appActions.setTransport(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getWeapons = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Weapon[] = await weaponsClient.getWeapons()
        dispatch(appActions.setWeapons(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const deleteWeapons = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await weaponsClient.deleteWeaponsByIdIn(ids);
        const data: Weapon[] = await weaponsClient.getWeapons()
        dispatch(appActions.setWeapons(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createWeapon = (params: Omit<Weapon, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await weaponsClient.addWeapon(params);
        const data: Weapon[] = await weaponsClient.getWeapons()
        dispatch(appActions.setWeapons(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateWeapon = (params: Weapon): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await weaponsClient.updateWeapon(params);
        const data: Weapon[] = await weaponsClient.getWeapons()
        dispatch(appActions.setWeapons(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getEnergon = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Energon[] = await energonClient.getEnergon()
        dispatch(appActions.setEnergon(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const deleteEnergon = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await energonClient.deleteEnergonByIdIn(ids);
        const data: Energon[] = await energonClient.getEnergon()
        dispatch(appActions.setEnergon(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createEnergon = (params: Omit<Energon, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await energonClient.addEnergon(params);
        const data: Energon[] = await energonClient.getEnergon()
        dispatch(appActions.setEnergon(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateEnergon = (params: Energon): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await energonClient.updateEnergon(params);
        const data: Energon[] = await energonClient.getEnergon()
        dispatch(appActions.setEnergon(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getEquipment = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Equipment[] = await equipmentClient.getEquipment()
        dispatch(appActions.setEquipment(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const deleteEquipment = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await equipmentClient.deleteEquipment(ids);
        const data: Equipment[] = await equipmentClient.getEquipment()
        dispatch(appActions.setEquipment(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createEquipment = (params: Omit<Equipment, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await equipmentClient.addEquipment(params);
        const data: Equipment[] = await equipmentClient.getEquipment()
        dispatch(appActions.setEquipment(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateEquipment = (params: Equipment): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await equipmentClient.updateEquipment(params);
        const data: Equipment[] = await equipmentClient.getEquipment()
        dispatch(appActions.setEquipment(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getInjury = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Injury[] = await injuryClient.getInjuries()
        dispatch(appActions.setInjury(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const deleteInjury = (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await injuryClient.deleteInjuriesByIdIn(ids);
        const data: Injury[] = await injuryClient.getInjuries()
        dispatch(appActions.setInjury(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createInjury = (params: Omit<Injury, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await injuryClient.addInjury(params);
        const data: Injury[] = await injuryClient.getInjuries()
        dispatch(appActions.setInjury(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updateInjury = (params: Injury): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await injuryClient.updateInjury(params);
        const data: Injury[] = await injuryClient.getInjuries()
        dispatch(appActions.setInjury(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const getPositions = (): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        const data: Position[] = await positionsClient.getPositions()
        dispatch(appActions.setPositions(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"))
    } finally {
        dispatch(appActions.setFetching(false))
    }
}

export const deletePositions= (ids: number[]): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await positionsClient.deletePositionsByIdIn(ids);
        const data: Position[] = await positionsClient.getPositions()
        dispatch(appActions.setPositions(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const createPositions = (params: Omit<Position, "id">): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await positionsClient.addPosition(params);
        const data: Position[] = await positionsClient.getPositions()
        dispatch(appActions.setPositions(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}

export const updatePositions = (params: Position): AppThunk => async dispatch => {
    dispatch(appActions.setFetching(true));
    try {
        await positionsClient.updatePosition(params);
        const data: Position[] = await positionsClient.getPositions()
        dispatch(appActions.setPositions(data))
    } catch (e) {
        dispatch(appActions.setError("Some error has occurred!"));
    } finally {
        dispatch(appActions.setFetching(false));
    }
}
