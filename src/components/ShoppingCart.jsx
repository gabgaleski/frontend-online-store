import React, { Component } from 'react';
import '../styles/shoppingcart.css';

export default class ShoppingCart extends Component {
  state = {
    cartArrayTotal: [],
    quantity: 0,
  };

  componentDidMount() {
    this.updateShoppingCart();
  }

  // experimentar um estado para repetidos e um estado para itens diferentes
  updateShoppingCart = () => {
    if (!JSON.parse(localStorage.getItem('cartArray'))) {
      localStorage.setItem('cartArray', JSON.stringify([]));
    }
    const cartArray = JSON.parse(localStorage.getItem('cartArray'));

    this.setState((prevState) => ({
      cartArrayTotal: [...prevState.cartArrayTotal, ...cartArray],
    }));
  };

  handleDelete = (index) => {
    const { cartArrayTotal } = this.state;
    const cartTotalCPY = cartArrayTotal.slice();
    cartTotalCPY.splice(index, 1);
    this.setState({ cartArrayTotal: cartTotalCPY });
  };

  handleClickPlus = () => {
    const { quantity } = this.state;
    let quantityCPY = quantity;
    quantityCPY += 1;
    this.setState({
      quantity: quantityCPY,
    });
  };

  handleClickMinus = () => {
    const { quantity } = this.state;
    let quantityCPY = quantity;
    quantityCPY -= 1;
    this.setState({
      quantity: quantityCPY,
    });
  };

  render() {
    const { cartArrayTotal, quantity } = this.state;
    return (
      <ul>
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        {cartArrayTotal
          .map((product, index) => (
            <li
              className="cart-item-container"
              key={ index }
            >
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p>
                Preço:
                {' '}
                R$
                {product.price}
              </p>
              <div className="cart-item">
                <button
                  data-testid="remove-product"
                  onClick={ () => this.handleDelete(index) }
                >
                  X
                </button>
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ this.handleClickMinus }
                >
                  -
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  Quantidade:
                  {' '}
                  { quantity }
                </p>
                <button
                  data-testid="product-increase-quantity"
                  onClick={ this.handleClickPlus }
                >
                  +
                </button>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}
