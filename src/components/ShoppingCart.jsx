import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    cartArrayTotal: [],
    quantity: 0,
  };

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('cartArray'))) {
      localStorage.setItem('cartArray', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('detailsItem'))) {
      localStorage.setItem('detailsItem', JSON.stringify([]));
    }
    const cartArray = JSON.parse(localStorage.getItem('cartArray'));
    const itensDetails = JSON.parse(localStorage.getItem('detailsItem'));
    this.setState((prevState) => ({
      cartArrayTotal: [...prevState.cartArrayTotal, ...cartArray, ...itensDetails],
      quantity: (cartArray.length + itensDetails.length),
    }));
  }

  render() {
    const { cartArrayTotal, quantity } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        {cartArrayTotal
          .map((product, index) => (
            <div
              key={ index }
            >
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
            </div>
          ))}
      </div>
    );
  }
}
