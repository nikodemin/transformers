import React, {FC, memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createBase, deleteBases, getBases} from "../../redux/thunk";
import {appActions} from "../../redux/action-creators";
import {useAppSelector} from "../../redux/store";
import {Form, Input, InputNumber, Modal, Table} from "antd";
import {ButtonsPannel} from "../../components/buttonsPanel";
import {Base, Location} from "../../client/types";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Location",
        dataIndex: "location",
        render: (location: Location) => <span>{location.latitude + ", " + location.longitude}</span>,
    },
];

export const Bases: FC = memo(() => {
    const {bases} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [base, setBase] = useState<null | Partial<Base>>(null);
    const [selectedBases, setSelectedBases] = useState<number[]>([])

    const onCreate = () => setBase({});
    const onDeleteBases = () => {
        if (selectedBases.length) {
            dispatch(deleteBases(selectedBases))
        }
    }
    const closeModal = () => setBase(null);
    const submit = (values: {
        name: string, latitude: number
        longitude: number
    }) => {
        const {latitude, name, longitude} = values;
        dispatch(createBase({name, location: {latitude, longitude}}))
    };

    useEffect(() => {
        dispatch(getBases());
        return () => {
            dispatch(appActions.setBases(null));
        }
    }, []);

    if (!bases) {
        return null;
    }

    return (
        <>
            <ButtonsPannel createLabel={"Create base"} onCreate={onCreate} onDelete={onDeleteBases} />
            <Modal title='Base' visible={!!base} onCancel={closeModal} okText='Submit'
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
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Latitude' name='latitude'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Longitude' name='longitude'>
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedBases(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={bases.map(base => ({...base, key: base.id}))}
            />
        </>
    );
});
