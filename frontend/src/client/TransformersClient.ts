import {axiosInstance} from "./index";
import {Transformer} from "./types";
import {AxiosResponseTransformer} from "axios";

const baseUrl = "/transformers";

export function responseTransformer(transformer: AxiosResponseTransformer) {
    return (axiosInstance.defaults.transformResponse as AxiosResponseTransformer[]).concat(transformer)
}

const transformersResponseTransformer = responseTransformer((data) => data._embedded.transformers)
export const transformersClient = {
    getTransfromers() {
        return axiosInstance.get<Transformer[]>(baseUrl, {transformResponse: transformersResponseTransformer}).then(response => response.data)
    },
    deleteTransformersByIdIn(ids: number[]) {
        return axiosInstance.delete(baseUrl, {
            params: {
                ids: ids.join(",")
            }
        })
    },
    addTransformer(transformer: Transformer) {
        return axiosInstance.post(baseUrl, transformer)
    },
    updateTransformer(transformer: Transformer) {
        return axiosInstance.put(`${baseUrl}/${transformer.id}`, transformer)
    }
}
