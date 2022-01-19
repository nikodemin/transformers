import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {DatePicker, Form, Input, Modal, Table} from "antd";
import {Inspection, Upgrade} from "../client/types";
import {useDispatch} from "react-redux";
import {createUpgrade, getInspections} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import moment from "moment";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Service Date",
        dataIndex: "serviceDate",
        render: (serviceDate: string) =>
            <span>{moment(serviceDate).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Transformer Id",
        dataIndex: "transformerId",
    },
    {
        title: "Transport Id",
        dataIndex: "transportId",
    },
];
export const Inspections: FC = memo(() => {
    const {inspections} = useAppSelector(state => state.app);
    const [form] = Form.useForm();
    const [inspection, setInspection] = useState<null | Partial<Inspection>>(null);
    const [selectedInspections, setSelectedInspections] = useState<number[]>([])
    const dispatch = useDispatch();

    const onCreate = () => setInspection({});
    const onDeleteUpgrades = () => {
        if (selectedInspections.length) {
            //dispatch(deleteUpgrades(selectedUpgrades))
        }
    }
    const closeModal = () => setInspection(null);
    const submit = (values: Upgrade) => {
        dispatch(createUpgrade(values))
    };

    useEffect(() => {
        dispatch(getInspections())
        return () => {
            dispatch(appActions.setInspections(null));
        }
    }, [])

    if (!inspections) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create inspection"} onCreate={onCreate} onDelete={onDeleteUpgrades} />
            <Modal title='Base' visible={!!inspection} onCancel={closeModal} okText='Submit'
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
                </Form>
            </Modal>
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedInspections(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={inspections.map(inspection => ({...inspection, key: inspection.id}))}
            />
        </>
    );
});
