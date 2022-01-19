import React, {FC, memo} from "react";
import {Button, Space} from "antd";

interface Props {
    createLabel: string;
    onCreate: () => void;
    onDelete: () => void;
}

export const ButtonsPanel: FC<Props> = memo(({createLabel, onCreate, onDelete}) => {
    return (
        <div style={{padding: "1rem", margin: '0 -16px 1rem -16px', backgroundColor: '#001529', zIndex: 5}}>
            <Space>
                <Button ghost type="primary" onClick={onCreate}>
                    {createLabel}
                </Button>
                <Button danger ghost onClick={onDelete}>
                    Delete selected
                </Button>
            </Space>
        </div>
    );
});
