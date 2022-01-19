import React, {FC, memo} from "react";
import {Table} from "antd";
import {Transformer} from "../../client/types";
import moment from "moment";

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
        render: (dateOfBuild: string) => <span>{moment(dateOfBuild).format("YYYY/MM/DD")}</span>,
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
    {
        title: "Post",
        dataIndex: "post",
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
                const {id, name, baseId, height, weight, post} = record;
                return {
                    onClick: event => handleUpdate({
                        id,
                        dateOfBuild: moment(record.dateOfBuild),
                        name,
                        baseId,
                        height,
                        weight,
                        hiringDate: moment(record.hiringDate),
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
