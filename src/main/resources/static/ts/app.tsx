import * as React from 'react';
import ReactDOM from 'react-dom';
import TransformersTable from './transformers-table';

function App() {
  return <TransformersTable/>
}

ReactDOM.render(<App />, document.querySelector('#app'));