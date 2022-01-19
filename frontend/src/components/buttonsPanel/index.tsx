import React, {FC, memo} from "react";
import {Button, Space} from "antd";

interface Props {
    createLabel: string;
    onCreate: () => void;
    onDelete: () => void;
}

export const ButtonsPannel: FC<Props> = memo(({createLabel, onCreate, onDelete}) => {
    return (
        <div style={{padding: "1rem"}}>
            <Space>
                <Button type='primary' onClick={onCreate}>
                    {createLabel}
                </Button>
                <Button danger onClick={onDelete}>
                    Delete selected
                </Button>
            </Space>
        </div>
    );
});
