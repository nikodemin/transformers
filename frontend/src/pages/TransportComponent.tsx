import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Operation, Transport} from "../client/types";
import {createTransport, deleteTransport, getTransport, updateTransport} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {Form, Input, Modal, Select, Table} from "antd";

const transportTypes = [
    "AIR",
    "GROUND"
]

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
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Type",
        dataIndex: "type",
    },
    {
        title: "Operations",
        dataIndex: "operations",
        render: (operations: Operation[]) =>
            <span>{operations && operations.map(operation => operation.name).join(", ")}</span>,
    },
];

export const TransportComponent: FC = memo(() => {
    const {transport} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [editableTransport, setTransport] = useState<null | Partial<Transport>>(null);
    const [selectedTransport, setSelectedTransport] = useState<number[]>([])

    const onCreate = () => setTransport({});
    const onDeleteTransport = () => {
        if (selectedTransport.length) {
            dispatch(deleteTransport(selectedTransport))
        }
    }
    const closeModal = () => setTransport(null);


    useEffect(() => {
        dispatch(getTransport());
        return () => {
            dispatch(appActions.setTransport(null));
        }
    }, []);

    if (!transport) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create transport"} onCreate={onCreate} onDelete={onDeleteTransport} />
            {editableTransport && <TransportModal editableTransport={editableTransport} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, operations, type, status} = record;
                    return {
                        onClick: event => setTransport({id, name, operations, type, status}), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedTransport(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={transport.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const TransportModal: FC<{ closeModal: () => void; editableTransport: Partial<Transport> }> = memo(({
                                                                                                        closeModal,
                                                                                                        editableTransport
                                                                                                    }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Omit<Transport, "id">) => {
        if (editableTransport.id) {
            dispatch(updateTransport({id: editableTransport.id, ...values}))
        } else {
            dispatch(createTransport(values))
        }
    };
    return (
        <Modal title='Transport' visible={true} onCancel={closeModal} okText='Submit'
               onOk={() => {
                   form
                       .validateFields()
                       .then(values => {
                           form.resetFields();
                           submit(values);
                           closeModal();
                       })
                       .catch(info => {
                           console.log("Validate Failed:", info);
                       });
               }}>
            <Form form={form} initialValues={editableTransport.id ? editableTransport : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Status' name='status' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Transport' name='type' rules={[{required: true}]}>
                    <Select>
                        {transportTypes.map(type => <Select.Option key={type}
                                                                   value={type}>{type}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
