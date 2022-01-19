import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {useDispatch} from "react-redux";
import {Equipment, Injury} from "../client/types";
import {
    createInjury,
    deleteInjury,
    getInjury,
    getTransformers,
    updateInjury
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {DatePicker, Form, Input, Modal, Select, Table} from "antd";
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
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Date",
        dataIndex: "date",
        render: (date: string) =>
            <span>{moment(date).format("YYYY/MM/DD")}</span>,
    },
    {
        title: "Transformer Id",
        dataIndex: "transformerId",
    },
];

export const InjuryComponent: FC = memo(() => {
    const {injury} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [modal, setModal] = useState<null | Partial<Injury>>(null);
    const [selectedEntities, setSelectedEntities] = useState<number[]>([])

    const onCreate = () => setModal({});
    const onDeleteBases = () => {
        if (selectedEntities.length) {
            dispatch(deleteInjury(selectedEntities))
        }
    }
    const closeModal = () => setModal(null);


    useEffect(() => {
        dispatch(getTransformers());
        dispatch(getInjury());
        return () => {
            dispatch(appActions.setInjury(null));
            dispatch(appActions.setTransformers(null));
        }
    }, []);

    if (!injury) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create injury"} onCreate={onCreate} onDelete={onDeleteBases} />
            {modal && <EqupmentModal modal={modal} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, type, description, transformerId} = record;
                    return {
                        onClick: event => setModal({
                            id,
                            date: moment(record.date),
                            type,
                            description,
                            transformerId
                        }), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedEntities(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={injury.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const EqupmentModal: FC<{ closeModal: () => void; modal: Partial<Equipment> }> = memo(({closeModal, modal}) => {
    const [form] = Form.useForm();
    const {transformers} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const submit = (values: Omit<Injury, "id">) => {
        if (modal.id) {
            dispatch(updateInjury({id: modal.id, ...values}))
        } else {
            dispatch(createInjury(values))
        }
    };
    return (
        <Modal title='Injury' visible={true} onCancel={closeModal} okText='Submit'
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
                <Form.Item label='Type' name='type' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Description' name='description' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Date' name='date' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Transformer' name='transformerId' rules={[{required: true}]}>
                    <Select>
                        {transformers && transformers.map(transformer => <Select.Option key={transformer.id}
                                                                                        value={transformer.id}>{transformer.name}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
