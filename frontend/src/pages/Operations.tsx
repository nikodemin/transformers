import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {Form, Input, Modal, Table} from "antd";
import {BattleField} from "../client/types";
import {useDispatch} from "react-redux";
import {createBattleField, deleteBattleFields, getOperations} from "../redux/thunk";
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
    const [form] = Form.useForm();
    const [field, setField] = useState<null | Partial<BattleField>>(null);
    const [selectedFields, setSelectedFields] = useState<number[]>([])
    const dispatch = useDispatch();

    const onCreate = () => setField({});
    const onDeleteBases = () => {
        if (selectedFields.length) {
            dispatch(deleteBattleFields(selectedFields))
        }
    }
    const closeModal = () => setField(null);
    const submit = (values: BattleField) => {
        dispatch(createBattleField(values))
    };

    useEffect(() => {
        dispatch(getOperations());
        return () => {
            dispatch(appActions.setOperations(null));
        }
    }, [])

    if (!operations) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create operation"} onCreate={onCreate} onDelete={onDeleteBases} />
            <Modal title='Base' visible={!!field} onCancel={closeModal} okText='Submit'
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
                <Form form={form}>
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
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
