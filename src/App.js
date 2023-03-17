import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { getCategories } from './services/api';

class App extends React.Component {
  render() {
    console.log(getCategories);
    return (
      <div className="App">
        <Route exact path="/" component={ Home } />
      </div>
    );
  }
}

export default App;
