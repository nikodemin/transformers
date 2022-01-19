import React, {FC, memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {
    createBase,
    createBattleField,
    deleteBases,
    deleteBattleFields,
    getBases,
    getBattleFields
} from "../redux/thunk";
import {Form, Input, InputNumber, Modal, Select, Table} from "antd";
import {Base, BattleField, Location, Terrain} from "../client/types";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";

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
        title: "Terrain",
        dataIndex: "terrain",
    },
];

const terrains = [
    "DESERT",
    "PLAIN",
    "TUNDRA",
    "SAVANNAH"
]

export const BattleFields: FC = memo(() => {
    const {battleFields} = useAppSelector(state => state.app);
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
        dispatch(getBattleFields());
        return () => {
            dispatch(appActions.setBattleFields(null));
        }
    }, [])

    if (!battleFields) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create battle field"} onCreate={onCreate} onDelete={onDeleteBases} />
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
                    <Form.Item label='Terrain' name='terrain'>
                        <Select>
                            {terrains.map(terrain => <Select.Option key={terrain}
                                                                    value={terrain}>{terrain}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedFields(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={battleFields.map(field => ({...field, key: field.id}))}
            />
        </>
    );
});
