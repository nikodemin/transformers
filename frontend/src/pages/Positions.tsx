import React, {FC, memo, useEffect, useState} from "react";
import {useAppSelector} from "../redux/store";
import {batch, useDispatch} from "react-redux";
import {Location, Position, Squad} from "../client/types";
import {
    createPositions,
    deletePositions, getBattleFields, getEnergon,
    getPositions,
    getTransformers, getWeapons,
    updatePositions
} from "../redux/thunk";
import {appActions} from "../redux/action-creators";
import {ButtonsPanel} from "../components/buttonsPanel";
import {Form, InputNumber, Modal, Select, Table} from "antd";

const squads = [
    "AIR",
    "GROUND"
]

const columns = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Location",
        dataIndex: "location",
        render: (location: Location) => <span>{location.latitude + ", " + location.longitude}</span>,
    },
    {
        title: "Squad",
        dataIndex: "squad",
    },
    {
        title: "Energon Id",
        dataIndex: "energonId",
    },
    {
        title: "Battle Field Id",
        dataIndex: "battleFieldId",
    },
    {
        title: "Transformer Id",
        dataIndex: "transformerId",
    },
    {
        title: "Weapon Id",
        dataIndex: "weaponId",
    },
];

export const Positions: FC = memo(() => {
    const {positions} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const [modal, setModal] = useState<null | Partial<Position>>(null);
    const [selectedEntities, setSelectedEntities] = useState<number[]>([])

    const onCreate = () => setModal({});
    const onDeleteBases = () => {
        if (selectedEntities.length) {
            dispatch(deletePositions(selectedEntities))
        }
    }
    const closeModal = () => setModal(null);


    useEffect(() => {
        dispatch(getPositions());
        dispatch(getTransformers());
        dispatch(getBattleFields());
        dispatch(getWeapons());
        dispatch(getEnergon());
        return () => {
            batch(() => {
                dispatch(appActions.setPositions(null));
                dispatch(appActions.setTransformers(null));
                dispatch(appActions.setBattleFields(null));
                dispatch(appActions.setWeapons(null));
                dispatch(appActions.setEnergon(null));
            })
        }
    }, []);

    if (!positions) {
        return null;
    }

    return (
        <>
            <ButtonsPanel createLabel={"Create position"} onCreate={onCreate} onDelete={onDeleteBases} />
            {modal && <PositionModal modal={modal} closeModal={closeModal} />}
            <Table
                onRow={(record, rowIndex) => {
                    const {id, transformerId, location, battleFieldId, energonId, squad, weaponId} = record;
                    return {
                        onClick: event => setModal({
                            id,
                            transformerId,
                            location,
                            battleFieldId,
                            energonId,
                            squad,
                            weaponId
                        }), // click row
                    };
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: ((selectedRowKeys, selectedRows) => setSelectedEntities(selectedRows.map(row => row.id)))
                }}
                columns={columns}
                dataSource={positions.map(elem => ({...elem, key: elem.id}))}
            />
        </>
    );
});

const PositionModal: FC<{ closeModal: () => void; modal: Partial<Position> }> = memo(({closeModal, modal}) => {
    const [form] = Form.useForm();
    const {transformers, weapons, energon, battleFields} = useAppSelector(state => state.app)
    const dispatch = useDispatch();
    const submit = (values: {
        latitude: number
        longitude: number
        squad: Squad
        energonId: number
        battleFieldId: number
        transformerId: number
        weaponId: number
    }) => {
        const {latitude, longitude, ...restValues} = values;
        if (modal.id) {
            dispatch(updatePositions({id: modal.id, location: {latitude, longitude}, ...restValues}))
        } else {
            dispatch(createPositions({location: {latitude, longitude}, ...restValues}))
        }
    };
    return (
        <Modal title='Position' visible={true} onCancel={closeModal} okText='Submit'
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
            <Form form={form} initialValues={modal.id ? {
                latitude: modal.location?.latitude,
                longitude: modal.location?.longitude,
                ...modal
            } : undefined}>
                <Form.Item label='Latitude' name='latitude' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Longitude' name='longitude' rules={[{required: true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Transformer' name='transformerId' rules={[{required: true}]}>
                    <Select>
                        {transformers && transformers.map(transformer => <Select.Option key={transformer.id}
                                                                                        value={transformer.id}>{transformer.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='BattleFieldId' name='battleFieldId' rules={[{required: true}]}>
                    <Select>
                        {battleFields && battleFields.map(battleField => <Select.Option key={battleField.id}
                                                                                        value={battleField.id}>{battleField.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='WeaponId' name='weaponId' rules={[{required: true}]}>
                    <Select>
                        {weapons && weapons.map(weapon => <Select.Option key={weapon.id}
                                                                         value={weapon.id}>{weapon.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='EnergonId' name='energonId' rules={[{required: true}]}>
                    <Select>
                        {energon && energon.map(energonItem => <Select.Option key={energonItem.id}
                                                                              value={energonItem.id}>{energonItem.id}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='Squad' name='squad' rules={[{required: true}]}>
                    <Select>
                        {squads.map(squad => <Select.Option key={squad}
                                                            value={squad}>{squad}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
