import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import QueryProduct from './QueryProduct';
import '../styles/home.css';
import Header from './Header';
import ShoppingCart from './ShoppingCart';

export default class Home extends Component {
  state = {
    categories: [],
    fetchCategoriesData: [],
    itemByCategoriesArray: [],
  };

  async componentDidMount() {
    const result = await this.getApiCategory();
    this.setState({
      categories: result,
    });
  }

  getApiCategory = async () => {
    const categories = await getCategories();
    return categories;
  };

  getCategoriesId = ({ target }) => {
    const { categories } = this.state;
    const categoryId = categories.find((category) => target.id === category.id);
    this.fetchCategoriesID(categoryId);
  };

  fetchCategoriesID = async (targetId) => {
    const URL = (`https://api.mercadolibre.com/sites/MLB/search?category=${targetId.id}`);
    const result = await fetch(URL);
    const data = await result.json();
    this.setState({
      fetchCategoriesData: data.results,
    });
  };

  addToCart = ({ target }) => {
    const { fetchCategoriesData } = this.state;
    const productFiltered = fetchCategoriesData
      .filter((product) => product.id === target.id);
    this.setState((prevState) => ({
      itemByCategoriesArray: [...prevState.itemByCategoriesArray, ...productFiltered],
    }), () => {
      const { itemByCategoriesArray } = this.state;
      localStorage
        .setItem('cartArray', JSON.stringify(itemByCategoriesArray));
    });
  };

  render() {
    const { categories, fetchCategoriesData } = this.state;
    const { history } = this.props;
    return (
      <section>
        <Header />
        <section className="principal">
          <div className="category-container">
            {
              categories.map((category) => (
                <div key={ category.id }>
                  <label data-testid="category" htmlFor={ category.id }>
                    <input
                      name="select-radio"
                      type="radio"
                      id={ category.id }
                      onChange={ this.getCategoriesId }
                    />
                    { category.name }
                  </label>
                </div>
              ))
            }
          </div>
          <main className="main-container">
            <div className="main-content">
              <h1
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
            </div>
            <div />
            <QueryProduct />
            { fetchCategoriesData.map((itemByCategory) => (
              <div key={ itemByCategory.id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/productdetails/${itemByCategory.id}` }
                >
                  Detail
                </Link>
                <p
                  data-testid="product"
                  key={ itemByCategory.id }
                >
                  {itemByCategory.title}
                </p>
                <button
                  id={ itemByCategory.id }
                  data-testid="product-add-to-cart"
                  onClick={ this.addToCart }
                >
                  Adicionar ao carrinho

                </button>
              </div>
            )) }
          </main>
          <aside className="shopping-cart">
            <button
              onClick={ () => history.push('/shoppingcart') }
              className="cart-btn"
              to="/shoppingcart"
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
            </button>
            <ShoppingCart />
          </aside>
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};
