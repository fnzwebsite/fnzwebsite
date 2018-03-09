import React, { Component } from 'react';
// import MoneyTable from './components/MoneyTable';
import DealingList from './components/DealingList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DealingList />
      </div>
    );
  }
}

export default App;
