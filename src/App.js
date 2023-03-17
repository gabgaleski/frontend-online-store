import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
      </div>
    );
  }
}

export default App;
