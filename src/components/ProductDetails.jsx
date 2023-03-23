import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Avaliation from './Avaliation';

export class ProductDetails extends React.Component {
  state = {
    productsObj: {},
    arrayObj: [],
  };

  componentDidMount() {
    this.getApiProducts();
  }

  changePage = () => {
    const { history } = this.props;
    return history.push('/shoppingcart');
  };

  getApiProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const getProducts = await getProductById(id);
    this.setState({
      productsObj: getProducts,
    });
  };

  addProduct = () => {
    const { productsObj } = this.state;
    this.setState((prevState) => ({
      arrayObj: [...prevState.arrayObj, productsObj],
    }), () => {
      const { arrayObj } = this.state;
      localStorage.setItem('cartArray', JSON.stringify(arrayObj)); // localStorage.setItem('detailsItem', JSON.stringify(arrayObj));
    });
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { productsObj } = this.state;
    const { title, thumbnail, price } = productsObj;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt="Imagem do produto"
        />
        <p data-testid="product-detail-price">{price}</p>
        <button
          onClick={ this.changePage }
          data-testid="shopping-cart-button"
        >
          Ir para o carrinho

        </button>
        <button
          onClick={ this.addProduct }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho

        </button>
        <Avaliation id={ id } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  history: PropTypes.shape().isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
