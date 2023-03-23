import React, { Component } from 'react';
import '../styles/shoppingcart.css';

export default class ShoppingCart extends Component {
  state = {
    cartArrayTotal: [],
    finalCartArray: [],
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
    }), this.newCart);
  };

  newCart = () => {
    this.setState({ finalCartArray: [] });
    // const cartArray = JSON.parse(localStorage.getItem('cartArray'));
    const { cartArrayTotal } = this.state;
    const idArray = cartArrayTotal.map(({ id }) => id);
    const idArrayReduced = [...new Set(idArray)];
    idArrayReduced.forEach((id) => {
      const product = cartArrayTotal.filter((item) => item.id === id);

      console.log(product, product.length);

      this.setState((prevState) => ({
        finalCartArray: [...prevState.finalCartArray,
          {
            product: product[0],
            quantity: product.length,
          }],
      }));
    });
  };

  handleDelete = (productId) => {
    const { cartArrayTotal } = this.state;
    const cartTotalCPY = cartArrayTotal.filter(({ id }) => id !== productId);
    this.setState({ cartArrayTotal: cartTotalCPY }, this.localStorageRefresh);
  };

  handleClickPlus = (product) => {
    this.setState((prevState) => ({
      cartArrayTotal: [...prevState.cartArrayTotal, product],
    }), this.localStorageRefresh);
  };

  localStorageRefresh = () => {
    const { cartArrayTotal } = this.state;
    localStorage.setItem('cartArray', JSON.stringify(cartArrayTotal));
    this.newCart();
  };

  handleClickMinus = (productId, quantity) => {
    if (quantity === 1) return;
    const { cartArrayTotal } = this.state;
    const cartArrayIds = cartArrayTotal.map(({ id }) => id);
    const finalPosition = cartArrayIds.lastIndexOf(productId);
    const cartTotalCPY = cartArrayTotal
      .filter((_product, index) => index !== finalPosition);
    this.setState({ cartArrayTotal: cartTotalCPY }, this.localStorageRefresh);
  };

  render() {
    const { finalCartArray } = this.state;
    return (
      <ul>
        { !finalCartArray.length && (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        )}
        {finalCartArray
          .map(({ product, quantity }, index) => (
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
                  onClick={ () => this.handleDelete(product.id) }
                >
                  X
                </button>
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.handleClickMinus(product.id, quantity) }
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
                  onClick={ () => this.handleClickPlus(product) }
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
