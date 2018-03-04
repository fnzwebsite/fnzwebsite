import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoneyTable from './components/MoneyTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MoneyTable />
      </div>
    );
  }
}

export default App;
