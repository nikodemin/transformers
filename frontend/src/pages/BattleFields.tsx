import React, {FC, memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {
    createBattleField,
    deleteBattleFields,
    getBattleFields, updateBattleField
} from "../redux/thunk";
import {Form, Input, Modal, Select, Table} from "antd";
import {BattleField, Terrain} from "../client/types";
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
            {field && <FieldModal field={field} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, terrain} = record;
                    return {
                        onClick: event => setField({id, name, terrain}), // click row
                    };
                }}
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

const FieldModal: FC<{ closeModal: () => void; field: Partial<BattleField> | null }> = memo(({
                                                                                                 closeModal,
                                                                                                 field,
                                                                                             }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: BattleField) => {
        if (field?.id) {
            dispatch(updateBattleField({...values, id: field.id}))
        } else {
            dispatch(createBattleField(values))
        }
    };
    return (
        <Modal title='Battle field' visible={!!field} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={field?.id ? field : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Terrain' name='terrain' rules={[{required: true}]}>
                    <Select>
                        {terrains.map(terrain => <Select.Option key={terrain}
                                                                value={terrain}>{terrain}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
