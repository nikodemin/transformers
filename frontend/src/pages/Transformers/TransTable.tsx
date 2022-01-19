import React, {FC, memo} from "react";
import {Table} from "antd";
import {Transformer} from "../../client/types";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Date of build",
        dataIndex: "dateOfBuild",
        render: (dateOfBuild: string) => <span>{new Date(dateOfBuild).toTimeString()}</span>,
    },
    {
        title: "Height",
        dataIndex: "height",
    },
    {
        title: "Weight",
        dataIndex: "weight",
    },
    {
        title: "Base id",
        dataIndex: "baseId",
    },
];


interface Props {
    transformers: Transformer[];
    setSelectedTrans: (ids: number[]) => void;
    handleUpdate: (transformer: Transformer) => void;
}

export const TransTable: FC<Props> = memo(({transformers, setSelectedTrans, handleUpdate}) => {
    return (
        <Table
            onRow={(record, rowIndex) => {
                const {id, name, baseId, height, weight, hiringDate, post, dateOfBuild} = record;
                return {
                    onClick: event => handleUpdate({
                        id,
                        dateOfBuild,
                        name,
                        baseId,
                        height,
                        weight,
                        hiringDate,
                        post
                    }), // click row
                };
            }}
            rowSelection={{
                type: "checkbox",
                onChange: ((selectedRowKeys, selectedRows) => setSelectedTrans(selectedRows.map(row => row.id)))
            }}
            columns={columns}
            dataSource={transformers.map(base => ({...base, key: base.id}))}
        />
    );
});
