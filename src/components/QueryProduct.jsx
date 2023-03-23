import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../styles/queryproducts.css';

class QueryProduct extends React.Component {
  state = {
    inputValue: '',
    productsArray: [],
    cartArray: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getApiProducts = async (search) => {
    const getProducts = await getProductsFromCategoryAndQuery(search);
    this.setState({
      productsArray: getProducts.results,
    });
  };

  addToCart = (productId) => {
    const { productsArray } = this.state;
    const productFiltered = productsArray
      .find((product) => product.id === productId);

    const objProduct = { product: productFiltered, quantity: 1 };
    this.setState((prevState) => ({
      cartArray: [...prevState.cartArray, objProduct],
    }), () => {
      console.log(objProduct.product.id);
      const { cartArray } = this.state;
      localStorage.setItem('cartArray', JSON.stringify(cartArray));
      const repeated = cartArray
        .find((item) => item.product.id === objProduct.product.id);
      if (repeated) {
        objProduct.quantity += 1;
      }
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
        <section className="product-table">
          {
            productsArray.length > 0
              ? productsArray.map((product) => (
                <div
                  className="singleProduct-table"
                  data-testid="product"
                  key={ product.id }
                >
                  <h1>{ product.title }</h1>
                  <img
                    className="img-product"
                    src={ product.thumbnail }
                    alt={ product.title }
                  />
                  <p>{ product.price }</p>
                  <Link
                    data-testid="product-detail-link"
                    to={ `/productdetails/${product.id}` }
                  >
                    Detail
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addToCart(product.id) }
                  >
                    Adicionar ao carrinho

                  </button>
                </div>
              )) : <p>Nenhum produto foi encontrado</p>
          }
        </section>
      </>
    );
  }
}

export default QueryProduct;
