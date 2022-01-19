import React, {FC, memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createBase, deleteBases, getBases, updateBase} from "../../redux/thunk";
import {appActions} from "../../redux/action-creators";
import {useAppSelector} from "../../redux/store";
import {Form, Input, InputNumber, Modal, Table} from "antd";
import {ButtonsPanel} from "../../components/buttonsPanel";
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
    const [base, setBase] = useState<null | Partial<Base>>(null);
    const [selectedBases, setSelectedBases] = useState<number[]>([])

    const onCreate = () => setBase({});
    const onDeleteBases = () => {
        if (selectedBases.length) {
            dispatch(deleteBases(selectedBases))
        }
    }
    const closeModal = () => setBase(null);


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
            <ButtonsPanel createLabel={"Create base"} onCreate={onCreate} onDelete={onDeleteBases} />
            {base && <BaseModal base={base} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, name, location} = record;
                    return {
                        onClick: event => setBase({
                            id,
                            name,
                            location,
                        }), // click row
                    };
                }}
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

const BaseModal: FC<{ closeModal: () => void; base: Partial<Base> }> = memo(({closeModal, base}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submit = (values: {
        name: string, latitude: number
        longitude: number
    }) => {
        const {latitude, name, longitude} = values;
        if (base.id) {
            dispatch(updateBase({id: base.id, name, location: {latitude, longitude}}))
        } else {
            dispatch(createBase({name, location: {latitude, longitude}}))
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
            <Form form={form} initialValues={base ? {
                name: base.name,
                latitude: base.location?.latitude,
                longitude: base.location?.longitude
            } : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Latitude' name='latitude' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Longitude' name='longitude' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})
