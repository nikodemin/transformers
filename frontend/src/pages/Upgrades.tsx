import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {DatePicker, Form, Input, Modal, Select, Table} from "antd";
import {Modification, Upgrade} from "../client/types";
import {useDispatch} from "react-redux";
import {
    createBase, createUpgrade,
    deleteUpgrades,
    getModifications,
    getUpgrades
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
        title: "Date",
        dataIndex: "date",
        render: (date: string) =>
            <span>{moment(date).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "Check Date",
        dataIndex: "checkDate",
        render: (checkDate: string) =>
            <span>{moment(checkDate).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "Transformer Id",
        dataIndex: "transformerId",
    },
    {
        title: "Modifications",
        dataIndex: "modifications",
        render: (modifications: Modification[]) =>
            <span>{modifications?.map(modification => modification.name).join(", ")}</span>,
    },
];

export const Upgrades: FC = memo(() => {
    const {upgrades, modifications} = useAppSelector(state => state.app);
    const [form] = Form.useForm();
    const [upgrade, setUpgrade] = useState<null | Partial<Upgrade>>(null);
    const [selectedUpgrades, setSelectedUpgrades] = useState<number[]>([])
    const dispatch = useDispatch();

    const onCreate = () => setUpgrade({});
    const onDeleteUpgrades = () => {
        if (selectedUpgrades.length) {
            dispatch(deleteUpgrades(selectedUpgrades))
        }
    }
    const closeModal = () => setUpgrade(null);
    const submit = (values: Upgrade) => {
        dispatch(createUpgrade(values))
    };

    useEffect(() => {
        dispatch(getUpgrades());
        dispatch(getModifications());
        return () => {
            dispatch(appActions.setUpgrades(null));
            dispatch(appActions.setModifications(null));
        }
    }, [])

    if (!upgrades) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create upgrade"} onCreate={onCreate} onDelete={onDeleteUpgrades} />
            <Modal title='Base' visible={!!upgrade} onCancel={closeModal} okText='Submit'
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
                    <Form.Item label='Name' name='name' rules={[{required: true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Date' name='date' rules={[{required: true}]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label='Check Date' name='checkDate' rules={[{required: true}]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label='Modifications' name='modifications'>
                        <Select mode="multiple"
                                allowClear>
                            {modifications && modifications.map(modification => <Select.Option key={modification.id}
                                                                                               value={modification.id}>{modification.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedUpgrades(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={upgrades.map(upgrade => ({...upgrade, key: upgrade.id}))}
            />
        </>
    );
});
