import axios, {AxiosResponse, AxiosResponseTransformer} from "axios"

const BasePath = 'http://localhost:8080/api/'

// Transformer:

export interface Transformer {
    id: number
    name: string
    dateOfBuild: string
    height: number
    weight: number
    baseId: number
}

const transformersResponseTransformer = responseTransformer((data) => data._embedded.transformers)

export function deleteTransformersByIdIn(ids: number[], handleResp: (resp: any) => void, onError: (err: any) => void = err => undefined) {
    axios.delete(BasePath + 'transformers?ids=' + ids.join(',')).then(handleResp).catch(onError)
}

export function getTransformers(handleResp: (resp: AxiosResponse<Transformer[], any>) => void, onError: (err: any) => void = err => undefined) {
    axios.get<Transformer[]>(BasePath + 'transformers', {
        transformResponse: transformersResponseTransformer
    }).then(handleResp).catch(onError)
}

export function addTransformer(transformer: Transformer, handleResp: (resp: AxiosResponse<Transformer, any>) => void, onError: (err: any) => void = err => undefined) {
    axios.post<Transformer>(BasePath + 'transformers', transformer).then(handleResp).catch(onError)
}

// Base:

export interface Base {
    id: number
    name: string
    location: Location
}

const baseResponseTransformer = responseTransformer((data) => data._embedded.bases)

export function getBases(handleResp: (resp: AxiosResponse<Base[], any>) => void, onError: (err: any) => void = err => undefined) {
    axios.get<Base[]>(BasePath + "bases", {
        transformResponse: baseResponseTransformer
    }).then(handleResp).catch(onError)
}

// Common

export interface Location {
    latitude: number
    longitude: number
}

function responseTransformer(transformer: AxiosResponseTransformer) {
    return (axios.defaults.transformResponse as AxiosResponseTransformer[]).concat(transformer)
}
