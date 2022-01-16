import {Container, Dialog, DialogContent, DialogTitle, MenuItem, Select, Stack, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import {FormEvent, useReducer, useState} from 'react';
import {addTransformer, Base, deleteTransformersByIdIn, getBases, getTransformers, Transformer} from './api';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
        type: 'number',
        width: 100
    },
    {
        field: 'name',
        headerName: 'Name',
        editable: true,
        flex: 0.8
    },
    {
        field: 'dateOfBuild',
        headerName: 'Date of build',
        editable: true,
        flex: 1
    },
    {
        field: 'height',
        headerName: 'Height',
        type: 'number',
        editable: true,
        flex: 0.6
    },
    {
        field: 'weight',
        headerName: 'Weight',
        type: 'number',
        editable: true,
        flex: 0.6
    },
    {
        field: 'baseId',
        headerName: 'Base ID',
        type: 'number',
        editable: true,
        width: 100
    }
]


export default function () {
    const [rows, setRows] = useState<Transformer[]>([])
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [addDate, setAddDate] = useState<Date | null>(null);
    const [addBaseId, setAddBaseId] = useState<number | null>(null)
    const [addBases, setAddBases] = useState<Base[]>([])
    const [formInput, setFormInput] = useReducer(
        (state: any, newState: any) => ({...state, ...newState}),
        {
            name: "",
            weight: 0,
            height: 0
        }
    );

    function reload(e: any) {
        getTransformers(resp => setRows(resp.data))
    }

    function deleteRows(e: any) {
        setRows(rows.filter(r => !selectedRows.map(x => x.id).includes(r.id)))
        deleteTransformersByIdIn(selectedRows.map(r => r.id), resp => setSelectedRows([]))
    }

    function handleSelected(model: GridSelectionModel, details: GridCallbackDetails) {
        setSelectedRows(rows.filter(r => model.includes(r.id)))
    }

    function handleInput(evt: any, isNumber: boolean = false) {
        const name = evt.target.name;
        const newValue = isNumber ? +evt.target.value : evt.target.value;
        setFormInput({[name]: newValue});
    }

    function updateBases() {
        getBases(resp => setAddBases(resp.data))
    }

    function addTransformerHandler(e: FormEvent) {
        e.preventDefault()
        let transformer = {...formInput, ...{baseId: addBaseId, dateOfBuild: addDate?.toISOString()}} as Transformer
        console.log(transformer)
        addTransformer(transformer, () => null)
    }

    return (
        <Stack spacing={1} height="500px" maxWidth={1200}>
            <Container maxWidth={false}>
                <Button onClick={reload}>Reload</Button>
                <Button onClick={() => setShowAddDialog(true)}>Add new</Button>
                <Button onClick={deleteRows}>Delete selected</Button>
            </Container>
            <DataGrid rows={rows} columns={columns} pageSize={5} onSelectionModelChange={handleSelected}
                      checkboxSelection={true}/>
            <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
                <DialogTitle>Add transformer</DialogTitle>
                <DialogContent>
                    <form onSubmit={addTransformerHandler}>
                        <Stack spacing={1}>
                            <TextField name="name" label="Name" onInput={handleInput}/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={addDate}
                                    label="Date of build"
                                    onChange={(newValue) => setAddDate(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField name="height" label="Height" type="number" onInput={e => handleInput(e, true)}/>
                            <TextField name="weight" label="Weight" type="number" onInput={e => handleInput(e, true)}/>
                            <Select value={addBaseId} onOpen={updateBases}
                                    onChange={e => setAddBaseId(e.target.value as number)}>
                                {addBases.map(base => <MenuItem value={base.id}>{base.name}</MenuItem>)}
                            </Select>
                            <Button type="submit">Add</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </Stack>
    );
}
