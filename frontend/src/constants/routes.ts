import React from "react";
import {Transformers} from "../pages/Transformers";

export enum Paths {
    TRANSFORMERS = '/transformers',
}

export const Routes:Route[] = [
    {
        path: Paths.TRANSFORMERS,
        component: Transformers,
    }
]

export interface Route {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}
