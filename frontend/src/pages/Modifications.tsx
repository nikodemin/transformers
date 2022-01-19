import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Equipment, Modification, Upgrade} from "../client/types";
import {
    createModification,
    deleteModifications,
    getModifications,
    updateModification
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {Form, Input, InputNumber, Modal, Table} from "antd";

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
        title: "Affected body part",
        dataIndex: "affectedBodyPart",
    },
    {
        title: "Cost",
        dataIndex: "cost",
    },
    {
        title: "Upgrades",
        dataIndex: "upgrades",
        render: (upgrades: Upgrade[]) =>
            <span>{upgrades && upgrades.map(upgrade => upgrade.id).join(", ")}</span>,
    },
];

export const Modifications: FC = memo(() => {
    const {modifications} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [modal, setModal] = useState<null | Partial<Modification>>(null);
    const [selectedEntities, setSelectedEntities] = useState<number[]>([])

    const onCreate = () => setModal({});
    const onDeleteBases = () => {
        if (selectedEntities.length) {
            dispatch(deleteModifications(selectedEntities))
        }
    }
    const closeModal = () => setModal(null);


    useEffect(() => {
        dispatch(getModifications());
        return () => {
            dispatch(appActions.setModifications(null));
        }
    }, []);

    if (!modifications) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create modification"} onCreate={onCreate} onDelete={onDeleteBases} />
            {modal && <ModificationModal modal={modal} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, upgrades, cost, affectedBodyPart} = record;
                    return {
                        onClick: event => setModal({id, name, upgrades, cost, affectedBodyPart}), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedEntities(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={modifications.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const ModificationModal: FC<{ closeModal: () => void; modal: Partial<Equipment> }> = memo(({closeModal, modal}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Omit<Modification, "id">) => {
        if (modal.id) {
            dispatch(updateModification({id: modal.id, ...values}))
        } else {
            dispatch(createModification(values))
        }
    };
    return (
        <Modal title='Modification' visible={true} onCancel={closeModal} okText='Submit'
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
                <Form.Item label='Affected body part' name='affectedBodyPart' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Cost' name='cost' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})
