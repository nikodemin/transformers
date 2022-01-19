import React, {FC, memo, useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../../redux/store";
import {createTransformer, deleteTransformers, getBases, getTransformers} from "../../redux/thunk";
import {useDispatch} from "react-redux";
import {Modal, Form, DatePicker, Input, Select, InputNumber} from "antd";
import {Transformer} from "../../client/types";
import {appActions} from "../../redux/action-creators";
import {ButtonsPannel} from "../../components/buttonsPanel";

export const Transformers: FC = memo(() => {
    const {transformers, bases} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [editableTransformer, setTransformer] = useState<null | Partial<Transformer>>(null);
    const [form] = Form.useForm();

    const handleCreateTransformer = () => setTransformer({});
    const handleUpdate = useCallback((transformer: Transformer) => setTransformer(transformer), [setTransformer]);
    const closeModal = () => setTransformer(null);
    const submit = (values: Transformer) => dispatch(createTransformer(values));
    const handleDeleteTransformers = () => dispatch(deleteTransformers([]));

    useEffect(() => {
        dispatch(getTransformers());
        dispatch(getBases());
        return () => {
            dispatch(appActions.setTransformers(null));
            dispatch(appActions.setBases(null));
        }
    }, [])

    if (!transformers) {
        return null;
    }

    return (
        <>
            <ButtonsPannel createLabel={"Create transformer"} onCreate={handleCreateTransformer}
                           onDelete={handleDeleteTransformers} />
            <Modal title='Transformer' visible={!!editableTransformer} onCancel={closeModal} okText='Submit'
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
                    <Form.Item label='Date of build' name='dateOfBuild'>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label='Select' name='baseId'>
                        <Select>
                            {bases && bases.map(base => <Select.Option key={base.id}
                                                                       value={base.id}>{base.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Height' name='height'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Weight' name='weight'>
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
            TRANS
        </>
    );
});
