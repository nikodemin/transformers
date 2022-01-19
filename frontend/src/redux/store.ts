import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {appReducer} from "./reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
})

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesType<T>>

export default store;
