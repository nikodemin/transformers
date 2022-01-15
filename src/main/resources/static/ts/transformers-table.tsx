import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridSelectionModel, GridCallbackDetails } from '@mui/x-data-grid';
import { useState } from 'react';
import { deleteTransformersByIdIn } from './api';


const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id'
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
    editable: true
  },
  {
    field: 'weight',
    headerName: 'Weight',
    editable: true
  },
  {
    field: 'baseId',
    headerName: 'Base ID',
    editable: true
  }
]


export default function (data: any[], pageSize: number = 10) {

  const [rows, setRows] = useState(data)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  function deleteRows(e: any) {
    setRows(rows.filter(r => !selectedRows.map(x => x.id).includes(r.id)))
    deleteTransformersByIdIn(selectedRows.map(r => r.id), resp => setSelectedRows([]))
  }

  function handleSelected(model: GridSelectionModel, details: GridCallbackDetails) {
    setSelectedRows(rows.filter(r => model.includes(r.id)))
  }

  return (
    <Stack spacing={1}>
      <Container maxWidth={false}><Button onClick={deleteRows}>Delete selected</Button></Container>
      <DataGrid rows={rows} columns={columns} pageSize={pageSize} onSelectionModelChange={handleSelected} />
    </Stack>
  );
}
