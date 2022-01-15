import * as React from 'react';
import ReactDOM from 'react-dom';
import { getTransformers, Transformer } from './api';
import transformersTable from './transformers-table';

function App() {
  const [tableData, setTableData] = React.useState<Transformer[]>([])
  getTransformers(resp => setTableData(resp.data))

  return transformersTable(tableData)
}

ReactDOM.render(<App />, document.querySelector('#app'));