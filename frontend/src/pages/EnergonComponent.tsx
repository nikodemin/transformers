import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Energon} from "../client/types";
import {
    createEnergon,
    deleteEnergon,
    getEnergon,
    updateEnergon,
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {Form, InputNumber, Modal, Select, Table} from "antd";

const energonTypes = [
    "DARK",
    "BRIGHT"
]

const columns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Type",
        dataIndex: "type",
    },
    {
        title: "Capacity left",
        dataIndex: "capacityLeft",
    },
    {
        title: "Kkal",
        dataIndex: "kkal",
    },
    {
        title: "Weight",
        dataIndex: "weight",
    },
];

export const EnergonComponent: FC = memo(() => {
    const {energon} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [energonState, setEnergonState] = useState<null | Partial<Energon>>(null);
    const [selectedEnergon, setSelectedWeapons] = useState<number[]>([])

    const onCreate = () => setEnergonState({});
    const onDeleteBases = () => {
        if (selectedEnergon.length) {
            dispatch(deleteEnergon(selectedEnergon))
        }
    }
    const closeModal = () => setEnergonState(null);


    useEffect(() => {
        dispatch(getEnergon());
        return () => {
            dispatch(appActions.setEnergon(null));
        }
    }, []);

    if (!energon) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create energon"} onCreate={onCreate} onDelete={onDeleteBases} />
            {energonState && <EnergonModal energon={energonState} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, type, weight, kkal, capacityLeft} = record;
                    return {
                        onClick: event => setEnergonState({id, type, weight, kkal, capacityLeft}), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedWeapons(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={energon.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const EnergonModal: FC<{ closeModal: () => void; energon: Partial<Energon> }> = memo(({closeModal, energon}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Omit<Energon, "id">) => {
        if (energon.id) {
            dispatch(updateEnergon({id: energon.id, ...values}))
        } else {
            dispatch(createEnergon(values))
        }
    };
    return (
        <Modal title='Energon' visible={true} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={energon.id ? energon : undefined}>
                <Form.Item label='Type' name='type' rules={[{required: true}]}>
                    <Select>
                        {energonTypes.map(type => <Select.Option key={type}
                                                                 value={type}>{type}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='Capacity left' name='capacityLeft' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Kkal' name='kkal' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Weight' name='weight' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})

