import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {DatePicker, Form, Input, Modal, Select, Table} from "antd";
import {Inspection} from "../client/types";
import {useDispatch} from "react-redux";
import {
    createInspection, deleteInspections,
    getInspections, getTransformers, getTransport,
    updateInspection
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
    const [inspection, setInspection] = useState<null | Partial<Inspection>>(null);
    const [selectedInspections, setSelectedInspections] = useState<number[]>([])
    const dispatch = useDispatch();

    const onCreate = () => setInspection({});
    const onDeleteUpgrades = () => {
        if (selectedInspections.length) {
            dispatch(deleteInspections(selectedInspections))
        }
    }
    const closeModal = () => setInspection(null);

    useEffect(() => {
        dispatch(getInspections())
        dispatch(getTransformers())
        dispatch(getTransport())
        return () => {
            dispatch(appActions.setInspections(null));
            dispatch(appActions.setTransformers(null));
            dispatch(appActions.setTransport(null));
        }
    }, [])

    if (!inspections) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create inspection"} onCreate={onCreate} onDelete={onDeleteUpgrades} />
            {inspection && <InspectionModal inspection={inspection} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, transformerId, description, transportId} = record;
                    return {
                        onClick: event => setInspection({
                            id, transformerId, description, serviceDate: moment(record.serviceDate), transportId
                        }), // click row
                    };
                }}
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

const InspectionModal: FC<{ closeModal: () => void; inspection: Partial<Inspection> }> = memo(({
                                                                                                   closeModal,
                                                                                                   inspection
                                                                                               }) => {
    const {transformers, transport} = useAppSelector(state => state.app);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: Inspection) => {
        if (inspection.id) {
            dispatch(updateInspection({...values, id: inspection.id}))
        } else {
            dispatch(createInspection(values))
        }
    };
    return (
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
            <Form form={form} initialValues={inspection.id ? inspection : undefined}>
                <Form.Item label='Description' name='description' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Service Date' name='serviceDate' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Transformer' name='transformerId' rules={[{required: true}]}>
                    <Select>
                        {transformers && transformers.map(transformer => <Select.Option key={transformer.id}
                                                                                        value={transformer.id}>{transformer.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='Transport' name='transportId' rules={[{required: true}]}>
                    <Select>
                        {transport && transport.map(transportItem => <Select.Option key={transportItem.id}
                                                                                    value={transportItem.id}>{transportItem.name}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
