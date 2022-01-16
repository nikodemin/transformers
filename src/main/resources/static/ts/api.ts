import axios, {AxiosResponse, AxiosResponseHeaders, AxiosResponseTransformer} from "axios"

const BasePath = 'http://localhost:8080/api/'

export interface Transformer {
    id: number
    name: string
    dateOfBuild: string
    height: number
    weight: number
    baseId: number
}

const transformersResponseTransformer = (axios.defaults.transformResponse as AxiosResponseTransformer[]).concat(
    (data: any, headers?: AxiosResponseHeaders) => data._embedded.transformers
)

export function deleteTransformersByIdIn(ids: number[], handleResp: (resp: any) => void, onError: (err: any) => void = err => undefined) {
    axios.delete(BasePath + 'transformers?ids=' + ids.join(',')).then(handleResp).catch(onError)
}

export function getTransformers(handleResp: (resp: AxiosResponse<Transformer[], any>) => void, onError: (err: any) => void = err => undefined) {
    axios.get<Transformer[]>(BasePath + 'transformers', {
        transformResponse: transformersResponseTransformer
    }).then(handleResp).catch(onError)
}

export function addTransformer(transformer: Transformer, handleResp: (resp: AxiosResponse<Transformer, any>) => void, onError: (err: any) => void = err => undefined) {
    axios.post<Transformer>(BasePath + 'transformers').then(handleResp).catch(onError)
}