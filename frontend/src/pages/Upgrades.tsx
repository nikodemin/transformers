import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {DatePicker, Form, Modal, Select, Table} from "antd";
import {Modification, Transformer, Upgrade} from "../client/types";
import {useDispatch} from "react-redux";
import {
    addModificationToUpgrade,
    createUpgrade,
    deleteUpgrades,
    getModifications, getTransformers,
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
    const {upgrades, modifications, transformers} = useAppSelector(state => state.app);
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

    useEffect(() => {
        dispatch(getUpgrades());
        dispatch(getTransformers());
        dispatch(getModifications());
        return () => {
            dispatch(appActions.setUpgrades(null));
            dispatch(appActions.setModifications(null));
            dispatch(appActions.setTransformers(null));
        }
    }, [])

    if (!upgrades) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create upgrade"} onCreate={onCreate} onDelete={onDeleteUpgrades} />
            {upgrade && <UpgradeModal upgrade={upgrade} closeModal={closeModal} modifications={modifications}
                                      transformers={transformers} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, modifications, transformerId} = record;
                    return {
                        onClick: event => setUpgrade({
                            id, modifications, transformerId
                        }), // click row
                    };
                }}
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

const UpgradeModal: FC<{ closeModal: () => void; upgrade: Partial<Upgrade> | null, modifications: Modification[] | null, transformers: null | Transformer[] }> = memo(({
                                                                                                                                                                           closeModal,
                                                                                                                                                                           upgrade,
                                                                                                                                                                           modifications,
                                                                                                                                                                           transformers
                                                                                                                                                                       }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: {
        id: number
        date: string | Date
        checkDate: string | Date
        transformerId: number
        modifications: number
    }) => {
        if (upgrade?.id) {
            dispatch(addModificationToUpgrade({modificationId: values.modifications, upgradeId: upgrade.id}))
        } else {
            dispatch(createUpgrade(values))
        }
    };
    return (
        <Modal title='Upgrade' visible={!!upgrade} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={upgrade?.id ? upgrade : undefined}>
                {upgrade?.id ? <Form.Item label='Modifications' name='modifications'>
                    <Select>
                        {modifications && modifications.map(modification => <Select.Option key={modification.id}
                                                                                           value={modification.id}>{modification.name}</Select.Option>)}
                    </Select>
                </Form.Item> : <>
                    <Form.Item label='Transformer' name='transformerId' rules={[{required: true}]}>
                        <Select>
                            {transformers && transformers.map(transformer => <Select.Option key={transformer.id}
                                                                                            value={transformer.id}>{transformer.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Date' name='date' rules={[{required: true}]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label='Check Date' name='checkDate' rules={[{required: true}]}>
                        <DatePicker />
                    </Form.Item></>}
            </Form>
        </Modal>
    )
})
