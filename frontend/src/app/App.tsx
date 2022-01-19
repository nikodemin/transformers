import React, {FC, useEffect} from "react";
import {LayoutWrapper} from "./Layout";
import {Paths} from "../constants/routes";
import {useRoutes} from "react-router-dom";
import {Transformers} from "../pages/Transformers/Transformers";
import {useAppSelector} from "../redux/store";
import {Preloader} from "../components/preloader";
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {appActions} from "../redux/action-creators";
import {Bases} from "../pages/Bases/Bases";
import {Upgrades} from "../pages/Upgrades";
import {Weapons} from "../pages/Weapons";
import {Transport} from "../pages/Transport";
import {Inspections} from "../pages/Inspections";
import {Operations} from "../pages/Operations";
import {BattleFields} from "../pages/BattleFields";
import {Energon} from "../pages/Energon";
import {Equipment} from "../pages/Equipment";
import {Injury} from "../pages/Injury";
import {Modifications} from "../pages/Modifications";
import {Positions} from "../pages/Positions";

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
        },
        {
            path: Paths.UPGRADES,
            element: <Upgrades />,
        },
        {
            path: Paths.WEAPONS,
            element: <Weapons />,
        },
        {
            path: Paths.TRANSPORT,
            element: <Transport />,
        },
        {
            path: Paths.INSPECTIONS,
            element: <Inspections />,
        },
        {
            path: Paths.OPERATIONS,
            element: <Operations />,
        },
        {
            path: Paths.BATTLE_FIELDS,
            element: <BattleFields />,
        },
        {
            path: Paths.ENERGON,
            element: <Energon />,
        },
        {
            path: Paths.EQUIPMENT,
            element: <Equipment />,
        },
        {
            path: Paths.INJURY,
            element: <Injury />,
        },
        {
            path: Paths.MODIFICATIONS,
            element: <Modifications />,
        },
        {
            path: Paths.POSITIONS,
            element: <Positions />,
        },
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
