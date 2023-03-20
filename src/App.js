import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import { ProductDetails } from './components/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route
          exact
          path="/productdetails/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </div>
    );
  }
}

export default App;
