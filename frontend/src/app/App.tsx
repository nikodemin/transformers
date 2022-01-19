import React, {FC, useEffect} from "react";
import {LayoutWrapper} from "./Layout";
import {Paths} from "../constants/routes";
import {useRoutes} from "react-router-dom";
import {Transformers} from "../pages/Transformers";
import {useAppSelector} from "../redux/store";
import {Preloader} from "../components/preloader";
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {appActions} from "../redux/action-creators";
import {Bases} from "../pages/Bases";

export const App: FC = () => {
    const dispatch = useDispatch();
    const {isFetching, error} = useAppSelector(state => state.app);

    const routes = useRoutes([
        {
            path: Paths.TRANSFORMERS,
            element: <Transformers />,
        },
        {
            path: Paths.BASES,
            element: <Bases />,
        }
    ]);

    useEffect(() => {
        if (error) {
            const modal = Modal.error({
                title: "Error!",
                content: error,
                onOk: () => dispatch(appActions.setError("")),
            });
            return () => {
                modal.destroy();
            };
        }
    }, [error]);

    return (
        <LayoutWrapper>
            {routes}
            {isFetching && <Preloader />}
        </LayoutWrapper>
    );
}
