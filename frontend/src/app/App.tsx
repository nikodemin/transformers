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
import {TransportComponent} from "../pages/TransportComponent";
import {Inspections} from "../pages/Inspections";
import {Operations} from "../pages/Operations";
import {BattleFields} from "../pages/BattleFields";
import {EnergonComponent} from "../pages/EnergonComponent";
import {EquipmentComponent} from "../pages/EquipmentComponent";
import {InjuryComponent} from "../pages/InjuryComponent";
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
            element: <TransportComponent />,
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
            element: <EnergonComponent />,
        },
        {
            path: Paths.EQUIPMENT,
            element: <EquipmentComponent />,
        },
        {
            path: Paths.INJURY,
            element: <InjuryComponent />,
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
