import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Weapon} from "../client/types";
import {
    createWeapon,
    deleteWeapons,
    getWeapons,
    updateWeapon
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
        title: "Type",
        dataIndex: "type",
    },
    {
        title: "Caliber",
        dataIndex: "caliber",
    },
    {
        title: "Rate of fire",
        dataIndex: "rateOfFire",
    },
    {
        title: "Range of fire",
        dataIndex: "rangeOfFire",
    },
];

export const Weapons: FC = memo(() => {
    const {weapons} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [weapon, setWeapon] = useState<null | Partial<Weapon>>(null);
    const [selectedWeapons, setSelectedWeapons] = useState<number[]>([])

    const onCreate = () => setWeapon({});
    const onDeleteBases = () => {
        if (selectedWeapons.length) {
            dispatch(deleteWeapons(selectedWeapons))
        }
    }
    const closeModal = () => setWeapon(null);


    useEffect(() => {
        dispatch(getWeapons());
        return () => {
            dispatch(appActions.setWeapons(null));
        }
    }, []);

    if (!weapons) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create weapon"} onCreate={onCreate} onDelete={onDeleteBases} />
            {weapon && <WeaponModal weapon={weapon} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, caliber, type, rangeOfFire, rateOfFire} = record;
                    return {
                        onClick: event => setWeapon({id, name, caliber, type, rangeOfFire, rateOfFire}), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedWeapons(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={weapons.map(weapon => ({...weapon, key: weapon.id}))}
            />
        </>
    );
});

const WeaponModal: FC<{ closeModal: () => void; weapon: Partial<Weapon> }> = memo(({closeModal, weapon}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Omit<Weapon, "id">) => {
        if (weapon.id) {
            dispatch(updateWeapon({id: weapon.id, ...values}))
        } else {
            dispatch(createWeapon(values))
        }
    };
    return (
        <Modal title='Base' visible={true} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={weapon.id ? weapon : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Type' name='type' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Caliber' name='caliber' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Rate of fire' name='rateOfFire' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Range of fire' name='rangeOfFire' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})
