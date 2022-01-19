import {AppThunk} from "./store";
import {appActions} from "./action-creators";
import {transformersClient} from "../client/TransformersClient";
import {Base, Transformer} from "../client/types";
import {baseClient} from "../client/BaseClient";

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
