import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Equipment} from "../client/types";
import {
    createEquipment,
    deleteEquipment,
    getEquipment,
    updateEquipment
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {DatePicker, Form, Input, InputNumber, Modal, Table} from "antd";
import moment from "moment";

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
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
    {
        title: "Take Date",
        dataIndex: "takeDate",
        render: (serviceDate: string) =>
            <span>{moment(serviceDate).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "Position ID",
        dataIndex: "positionId",
    },
];

export const EquipmentComponent: FC = memo(() => {
    const {equipment} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [modal, setModal] = useState<null | Partial<Equipment>>(null);
    const [selectedEntities, setSelectedEntities] = useState<number[]>([])

    const onCreate = () => setModal({});
    const onDeleteBases = () => {
        if (selectedEntities.length) {
            dispatch(deleteEquipment(selectedEntities))
        }
    }
    const closeModal = () => setModal(null);


    useEffect(() => {
        dispatch(getEquipment());
        return () => {
            dispatch(appActions.setEquipment(null));
        }
    }, []);

    if (!equipment) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create equipment"} onCreate={onCreate} onDelete={onDeleteBases} />
            {modal && <EqupmentModal modal={modal} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, type, positionId, quantity} = record;
                    return {
                        onClick: event => setModal({
                            id,
                            name,
                            takeDate: moment(record.takeDate),
                            positionId,
                            quantity,
                            type
                        }), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedEntities(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={equipment.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const EqupmentModal: FC<{ closeModal: () => void; modal: Partial<Equipment> }> = memo(({closeModal, modal}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Omit<Equipment, "id">) => {
        if (modal.id) {
            dispatch(updateEquipment({id: modal.id, ...values}))
        } else {
            dispatch(createEquipment(values))
        }
    };
    return (
        <Modal title='Equipment' visible={true} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={modal.id ? modal : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Type' name='type' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Quantity' name='quantity' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Take date' name='takeDate' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Position Id' name='positionId' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})
