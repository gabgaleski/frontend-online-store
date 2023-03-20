import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class QueryProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      productsArray: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  getApiProducts = async (search) => {
    const getProducts = await getProductsFromCategoryAndQuery(search);
    this.setState({
      productsArray: getProducts.results,
    });
  };

  render() {
    const { inputValue, productsArray } = this.state;
    return (
      <>
        <label htmlFor="inputValue">
          <input
            type="text"
            data-testid="query-input"
            name="inputValue"
            id="inputValue"
            value={ inputValue }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="query-button"
          onClick={ () => this.getApiProducts(inputValue) }
        >
          Pesquisar
        </button>
        {
          productsArray.length > 0
            ? productsArray.map((product) => (
              <div
                data-testid="product"
                key={ product.id }
              >
                <Link
                  data-testid="product-detail-link"
                  to={ `/productdetails/${product.id}` }
                >
                  Detail
                </Link>
                <h1>{ product.title }</h1>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.price }</p>
              </div>
            )) : <p>Nenhum produto foi encontrado</p>
        }
      </>
    );
  }
}

export default QueryProduct;
