import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {DatePicker, Form, Input, Modal, Select, Table} from "antd";
import {Operation} from "../client/types";
import {batch, useDispatch} from "react-redux";
import {
    createOperation,
    deleteOperations, getBattleFields,
    getOperations, getTransport, updateOperation,
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
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
        title: "Enemy",
        dataIndex: "enemy",
    },
    {
        title: "Battle Field Id",
        dataIndex: "battleFieldId",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        render: (serviceDate: string) =>
            <span>{moment(serviceDate).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        render: (serviceDate: string) =>
            <span>{moment(serviceDate).format("YYYY/MM/DD")}</span>,
    },

];

export const Operations: FC = memo(() => {
    const {operations} = useAppSelector(state => state.app);
    const [operation, setOperation] = useState<null | Partial<Operation>>(null);
    const [selectedFields, setSelectedFields] = useState<number[]>([])
    const dispatch = useDispatch();

    const onCreate = () => setOperation({});
    const onDeleteOperations = () => {
        if (selectedFields.length) {
            dispatch(deleteOperations(selectedFields))
        }
    }
    const closeModal = () => setOperation(null);

    useEffect(() => {
        dispatch(getOperations());
        dispatch(getBattleFields());
        dispatch(getTransport());
        return () => {
            batch(() => {
                dispatch(appActions.setOperations(null));
                dispatch(appActions.setBattleFields(null));
                dispatch(appActions.setTransport(null));
            })
        }
    }, [])

    if (!operations) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create operation"} onCreate={onCreate} onDelete={onDeleteOperations} />
            {operation && <OperationModal operation={operation} closeModal={closeModal} />}
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedFields(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={operations.map(operation => ({...operation, key: operation.id}))}
            />
        </>
    );
});

const OperationModal: FC<{ closeModal: () => void; operation: Partial<Operation> }> = memo(({
                                                                                                closeModal,
                                                                                                operation
                                                                                            }) => {
    const [form] = Form.useForm();
    const {battleFields} = useAppSelector(state => state.app);
    const dispatch = useDispatch();
    const submit = (values: Omit<Operation, "id">) => {
        if (operation.id) {
            dispatch(updateOperation({id: operation.id, ...values}))
        } else {
            dispatch(createOperation(values))
        }
    };
    return (
        <Modal title='Operation' visible={!!operation} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={operation.id ? operation : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Start date' name='startDate' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='End date' name='endDate' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Enemy' name='enemy' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Battle field' name='battleFieldId' rules={[{required: true}]}>
                    <Select>
                        {battleFields && battleFields.map(battleField => <Select.Option key={battleField.id}
                                                                                        value={battleField.id}>{battleField.name}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
