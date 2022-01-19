import {axiosInstance} from "./index";
import {
    Base,
    BattleField,
    Energon,
    Equipment,
    Injury,
    Inspection,
    Modification,
    Operation,
    Position,
    Transport, Upgrade, Weapon
} from "./types";
import {responseTransformer} from "./TransformersClient";

const baseUrl = "/bases"

const baseResponseTransformer = responseTransformer((data) => data._embedded.bases);
const energonResponseTransformer = responseTransformer((data) => data._embedded.energon);
const battleFieldsResponseTransformer = responseTransformer((data) => data._embedded.battleFields);
const equipmentResponseTransformer = responseTransformer((data) => data._embedded.equipment);
const injuryResponseTransformer = responseTransformer((data) => data._embedded.injuries);
const inspectionsResponseTransformer = responseTransformer((data) => data._embedded.inspections);
const modificationsResponseTransformer = responseTransformer((data) => data._embedded.modifications);
const operationsResponseTransformer = responseTransformer((data) => data._embedded.operations);
const positionsResponseTransformer = responseTransformer((data) => data._embedded.positions);
const transportResponseTransformer = responseTransformer((data) => data._embedded.transports);
const upgradesResponseTransformer = responseTransformer((data) => data._embedded.upgrades);
const weaponsResponseTransformer = responseTransformer((data) => data._embedded.weapons);

export const baseClient = {
    getBases() {
        return axiosInstance.get<Base[]>(baseUrl, {
            transformResponse: baseResponseTransformer
        }).then(response => response.data)
    },
    deleteBasesByIdIn(ids: number[]) {
        return axiosInstance.delete(baseUrl, {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addBase(base: Omit<Base, "id">) {
        return axiosInstance.post(baseUrl, base)
    },
    updateBase(base: Base) {
        return axiosInstance.put(`${baseUrl}/${base.id}`, base)
    }
}

export const energonClient = {
    getEnergon() {
        return axiosInstance.get<Energon[]>("/energon", {
            transformResponse: energonResponseTransformer
        }).then(response => response.data)
    },
    deleteEnergonByIdIn(ids: number[]) {
        return axiosInstance.delete("/energon", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addEnergon(data: Omit<Energon, "id">) {
        return axiosInstance.post("/energon", data)
    },
    updateEnergon(data: Energon) {
        return axiosInstance.put(`/energon/${data.id}`, data)
    }
}

export const battleFieldsClient = {
    getFields() {
        return axiosInstance.get<BattleField[]>("/battleFields", {
            transformResponse: battleFieldsResponseTransformer
        }).then(response => response.data)
    },
    deleteFieldsByIdIn(ids: number[]) {
        return axiosInstance.delete("/battleFields", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addField(data: Omit<BattleField, "id">) {
        return axiosInstance.post("/battleFields", data)
    },
    updateField(data: BattleField) {
        return axiosInstance.put(`/battleFields/${data.id}`, data)
    }
}

export const equipmentClient = {
    getEquipment() {
        return axiosInstance.get<Equipment[]>("/equipment", {
            transformResponse: equipmentResponseTransformer
        }).then(response => response.data)
    },
    deleteEquipment(ids: number[]) {
        return axiosInstance.delete("/equipment", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addEquipment(data: Omit<Equipment, "id">) {
        return axiosInstance.post("/equipment", data)
    },
    updateEquipment(data: Equipment) {
        return axiosInstance.put(`/equipment/${data.id}`, data)
    }
}

export const injuryClient = {
    getInjuries() {
        return axiosInstance.get<Injury[]>("/injuries", {
            transformResponse: injuryResponseTransformer
        }).then(response => response.data)
    },
    deleteInjuriesByIdIn(ids: number[]) {
        return axiosInstance.delete("/injuries", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addInjury(data: Omit<Injury, "id">) {
        return axiosInstance.post("/injuries", data)
    },
    updateInjury(data: Injury) {
        return axiosInstance.put(`/injuries/${data.id}`, data)
    }
}

export const inspectionsClient = {
    getInspections() {
        return axiosInstance.get<Inspection[]>("/inspections", {
            transformResponse: inspectionsResponseTransformer
        }).then(response => response.data)
    },
    deleteInspectionsByIdIn(ids: number[]) {
        return axiosInstance.delete("/inspections", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addInspection(data: Omit<Inspection, "id">) {
        return axiosInstance.post("/inspections", data)
    },
    updateInspection(data: Inspection) {
        return axiosInstance.put(`/inspections/${data.id}`, data)
    }
}

export const modificationsClient = {
    getModifications() {
        return axiosInstance.get<Modification[]>("/modifications", {
            transformResponse: modificationsResponseTransformer
        }).then(response => response.data)
    },
    deleteModificationsByIdIn(ids: number[]) {
        return axiosInstance.delete("/modifications", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addModification(data: Omit<Modification, "id">) {
        return axiosInstance.post("/modifications", data)
    },
    updateModification(data: Modification) {
        return axiosInstance.put(`/modifications/${data.id}`, data)
    }
}

export const operationsClient = {
    getOperations() {
        return axiosInstance.get<Operation[]>("/operations", {
            transformResponse: operationsResponseTransformer
        }).then(response => response.data)
    },
    deleteOperationsByIdIn(ids: number[]) {
        return axiosInstance.delete("/operations", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addOperation(data: Omit<Operation, "id">) {
        return axiosInstance.post("/operations", data)
    },
    updateOperation(data: Operation) {
        return axiosInstance.put(`/operations/${data.id}`, data)
    },
    addTransformerToOperation(data: { operationId: number, transformerId: number }) {
        return axiosInstance.post("/operations/addTransformer", data)
    },
}

export const positionsClient = {
    getPositions() {
        return axiosInstance.get<Position[]>("/positions", {
            transformResponse: positionsResponseTransformer
        }).then(response => response.data)
    },
    deletePositionsByIdIn(ids: number[]) {
        return axiosInstance.delete("/positions", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addPosition(data: Omit<Position, "id">) {
        return axiosInstance.post("/positions", data)
    },
    updatePosition(data: Position) {
        return axiosInstance.put(`/positions/${data.id}`, data)
    }
}

export const transportClient = {
    getTransport() {
        return axiosInstance.get<Transport[]>("/transports", {
            transformResponse: transportResponseTransformer
        }).then(response => response.data)
    },
    deleteTransportByIdIn(ids: number[]) {
        return axiosInstance.delete("/transports", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addTransport(data: Omit<Transport, "id">) {
        return axiosInstance.post("/transports", data)
    },
    updateTransport(data: Transport) {
        return axiosInstance.put(`/transports/${data.id}`, data)
    },
    addTransportToOperation(data: { operationId: number, transportId: number }) {
        return axiosInstance.post("/transports/addOperation", data)
    },
}

export const upgradesClient = {
    getUpgrades() {
        return axiosInstance.get<Upgrade[]>("/upgrades", {
            transformResponse: upgradesResponseTransformer
        }).then(response => response.data)
    },
    deleteUpgradesByIdIn(ids: number[]) {
        return axiosInstance.delete("/upgrades", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addUpgrade(data: Omit<Upgrade, "id">) {
        return axiosInstance.post("/upgrades", data)
    },
    updateUpgrade(data: Upgrade) {
        return axiosInstance.put("/upgrades", data)
    },
    addModificationToUpgrade(params: { upgradeId: number, modificationId: number }) {
        return axiosInstance.post("/upgrades/addModification", {}, {params})
    },
}

export const weaponsClient = {
    getWeapons() {
        return axiosInstance.get<Weapon[]>("/weapons", {
            transformResponse: weaponsResponseTransformer
        }).then(response => response.data)
    },
    deleteWeaponsByIdIn(ids: number[]) {
        return axiosInstance.delete("/weapons", {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addWeapon(data: Omit<Weapon, "id">) {
        return axiosInstance.post("/weapons", data)
    },
    updateWeapon(data: Weapon) {
        return axiosInstance.put(`/weapons/${data.id}`, data)
    }
}
