export interface Transformer {
    id: number
    name: string
    dateOfBuild: string | Date
    hiringDate: string | Date
    post: TransformerPost
    height: number
    weight: number
    baseId: number
}

export enum TransformerPost {
    GENERAL = "GENERAL",
    ADMIRAL = "ADMIRAL",
    LIEUTENANT = "LIEUTENANT",
    COLONEL = "COLONEL",
    MAJOR = "MAJOR"
}

export interface Location {
    latitude: number
    longitude: number
}

export interface Base {
    id: number
    name: string
    location: Location
}

export enum Terrain {
    DESERT = "DESERT",
    PLAIN = "PLAIN",
    TUNDRA = "TUNDRA",
    SAVANNAH = "SAVANNAH"
}

export interface BattleField {
    id: number
    name: string
    terrain: Terrain
}

export enum EnergonType {
    DARK = "DARK",
    BRIGHT = "BRIGHT"
}

export interface Energon {
    id: number
    type: EnergonType
    capacityLeft: number
    kkal: number
    weight: number
}

export interface Equipment {
    id: number
    name: string;
    type: string;
    quantity: number;
    takeDate: number;
    positionId: number;
}

export interface Injury {
    id: number;
    type: string
    description: string
    date: string | Date
    transformerId: number
}

export interface Inspection {
    id: number
    serviceDate: string | Date
    description: string
    transformerId: number
    transportId: number
}

export interface Upgrade {
    id: number
    date: string | Date
    checkDate: string | Date
    transformerId: number
    modifications?: Modification[]
}

export interface Modification {
    id: number
    name: string
    affectedBodyPart: string
    cost: number
    upgrades: Upgrade[]
}

export interface Operation {
    id: number
    name: string
    startDate: string | Date
    endDate: string | Date
    enemy: string
    battleFieldId: number
    transformers: Transformer[]
    transports: Transport[]
}

export enum Squad {
    AIR = "AIR",
    GROUND = "GROUND"
}

export interface Position {
    id: number
    location: Location
    squad: Squad
    energonId: number
    battleFieldId: number
    transformerId: number
    weaponId: number
}

export enum TransportType {
    AIR = "AIR",
    GROUND = "GROUND"
}

export interface Transport {
    id: number
    name: string
    status: string
    type: TransportType
    operations: Operation[]
}

export interface Weapon {
    id: number
    name: string
    type: string
    caliber: string
    rateOfFire: number
    rangeOfFire: number
}
