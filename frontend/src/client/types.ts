export interface Transformer {
    id: number
    name: string
    dateOfBuild: string
    height: number
    weight: number
    baseId: number
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
