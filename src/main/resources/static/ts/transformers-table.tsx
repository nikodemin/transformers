import {Container, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, Stack} from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import {FormEvent, useReducer, useState} from 'react';
import {deleteTransformersByIdIn, getTransformers, Transformer} from './api';


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'id',
        type: 'number'
    },
    {
        field: 'name',
        headerName: 'Name',
        editable: true
    },
    {
        field: 'dateOfBuild',
        headerName: 'Date of build',
        editable: true
    },
    {
        field: 'height',
        headerName: 'Height',
        type: 'number',
        editable: true
    },
    {
        field: 'weight',
        headerName: 'Weight',
        type: 'number',
        editable: true
    },
    {
        field: 'baseId',
        headerName: 'Base ID',
        type: 'number',
        editable: true
    }
]


export default function () {
    const [rows, setRows] = useState<Transformer[]>([])
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [formInput, setFormInput] = useReducer(
        (state: any, newState: any) => ({...state, ...newState}),
        {
            name: "",
            weight: 0
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

    function handleInput(evt: any) {
        const name = evt.target.id;
        const newValue = evt.target.value;
        setFormInput({[name]: newValue});
    }

    function add(e: FormEvent) {
        console.log(formInput)
    }

    return (
        <Stack spacing={1} height="500px">
            <Container maxWidth={false}>
                <Button onClick={reload}>Reload</Button>
                <Button onClick={() => setShowAddDialog(true)}>Add new</Button>
                <Button onClick={deleteRows}>Delete selected</Button>
            </Container>
            <DataGrid rows={rows} columns={columns} pageSize={5} onSelectionModelChange={handleSelected}/>
            <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={add}>
                        <FormControl>
                            <InputLabel htmlFor="name">Name: </InputLabel>
                            <Input id="name" name="Name" onInput={handleInput}/>
                            <InputLabel htmlFor="weight">Weight: </InputLabel>
                            <Input id="weight" name="Weight" type="number" onInput={handleInput}/>
                            <Button type="submit">Add</Button>
                        </FormControl>
                    </form>
                </DialogContent>
            </Dialog>
        </Stack>
    );
}
