import React from 'react';

import logo from './../../logo.svg';
import { useAppState } from './hooks';

import './App.css';

const App = () => {
  const {
    isLoading,
    downloadExcel
  } = useAppState();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button disabled={isLoading} onClick={downloadExcel}>{isLoading ? 'Loading..' : 'Download Excel'}</button>
      </header>
    </div>
  );
}

export default App;
