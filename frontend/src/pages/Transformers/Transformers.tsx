import React, {FC, memo, useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../../redux/store";
import {createTransformer, deleteTransformers, getBases, getTransformers, updateTransformer} from "../../redux/thunk";
import {useDispatch} from "react-redux";
import {Modal, Form, DatePicker, Input, Select, InputNumber} from "antd";
import {Base, Transformer} from "../../client/types";
import {appActions} from "../../redux/action-creators";
import {ButtonsPanel} from "../../components/buttonsPanel";
import {TransTable} from "./TransTable";

const transformerPosts = [
    "GENERAL",
    "ADMIRAL",
    "LIEUTENANT",
    "COLONEL",
    "MAJOR"
]
export const Transformers: FC = memo(() => {
    const {transformers, bases} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [editableTransformer, setTransformer] = useState<null | Partial<Transformer>>(null);
    const [selectedTrans, setSelectedTrans] = useState<number[]>([])

    const handleCreateTransformer = () => setTransformer({});
    const handleUpdate = useCallback((transformer: Transformer) => setTransformer(transformer), [setTransformer]);

    const handleDeleteTransformers = () => {
        if (selectedTrans.length) {
            dispatch(deleteTransformers(selectedTrans))
        }
    };

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
            <ButtonsPanel createLabel={"Create transformer"} onCreate={handleCreateTransformer}
                          onDelete={handleDeleteTransformers} />
            {editableTransformer &&
                <TransformerModalForm editableTransformer={editableTransformer} setTransformer={setTransformer}
                                      bases={bases} />}
            <TransTable transformers={transformers} setSelectedTrans={setSelectedTrans} handleUpdate={handleUpdate} />
        </>
    );
});

interface Props {
    setTransformer: (value: null | Partial<Transformer>) => void;
    editableTransformer: Partial<Transformer>;
    bases: Base[] | null;
}

const TransformerModalForm: FC<Props> = memo(({setTransformer, editableTransformer, bases}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const closeModal = () => {
        setTransformer(null);
        form.resetFields();
    }
    const submit = (values: Transformer) => {
        if (editableTransformer?.id) {
            dispatch(updateTransformer({...values, id: editableTransformer.id}))
        } else {
            dispatch(createTransformer(values))
        }
    };
    return (
        <Modal title='Transformer' visible={!!editableTransformer} onCancel={closeModal} okText='Submit'
               onOk={() => {
                   form
                       .validateFields()
                       .then(values => {
                           form.resetFields();
                           submit(values);
                           setTransformer(null);
                       })
                       .catch(info => {
                           console.log("Validate Failed:", info);
                       });
               }}>
            <Form form={form} initialValues={editableTransformer?.id ? editableTransformer : undefined}>
                <Form.Item label='Name' name='name' rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Date of build' name='dateOfBuild' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Date of hiring' name='hiringDate' rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Base' name='baseId' rules={[{required: true}]}>
                    <Select>
                        {bases && bases.map(base => <Select.Option key={base.id}
                                                                   value={base.id}>{base.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='Post' name='post' rules={[{required: true}]}>
                    <Select>
                        {transformerPosts.map(post => <Select.Option key={post}
                                                                     value={post}>{post}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='Height' name='height' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Weight' name='weight' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
})
