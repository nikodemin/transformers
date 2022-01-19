import {axiosInstance} from "./index";
import {Base} from "./types";
import {responseTransformer} from "./TransformersClient";

const baseUrl = "/bases"

const baseResponseTransformer = responseTransformer((data) => data._embedded.bases)

export const baseClient = {
    getBases() {
        return axiosInstance.get<Base[]>(baseUrl, {
            transformResponse: baseResponseTransformer
        }).then(response => response.data)
    },
    deleteBasesByIdIn(ids: number[]) {
        return axiosInstance.delete(baseUrl, {
            params: {
                ids: ids.join(',')
            }
        })
    },
    addBase(base: Omit<Base, "id">) {
        return axiosInstance.post(baseUrl, base)
    },
    updateBase(base: Base) {
        return axiosInstance.put(baseUrl, base)
    }
}
