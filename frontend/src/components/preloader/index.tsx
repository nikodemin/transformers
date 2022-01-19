import React, {FC, memo} from "react";
import {Spin} from "antd";
import styles from "./Preloader.module.scss";

export const Preloader: FC = memo(() => {
    return (
        <div className={styles.container}>
            <Spin size='large' />
        </div>
    );
});
