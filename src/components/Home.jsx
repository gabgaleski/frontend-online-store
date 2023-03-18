import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import QueryProduct from './QueryProduct';
import '../styles/home.css';
import Header from './Header';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      fetchCategoriesData: [],
    };
  }

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

  // modificação

  render() {
    const { categories, fetchCategoriesData } = this.state;
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
          <main>
            <div className="main-container">
              <h1
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
            </div>
            <div />
            <QueryProduct />
            { fetchCategoriesData.map((itemByCategory) => (
              <p
                data-testid="product"
                key={ itemByCategory.id }
              >
                {itemByCategory.title}
              </p>
            )) }
          </main>
          <Link
            className="cart-btn"
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </Link>
        </section>
      </section>
    );
  }
}
