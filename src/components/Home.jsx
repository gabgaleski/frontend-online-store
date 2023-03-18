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

  render() {
    const { categories } = this.state;
    return (
      <section>
        <Header />
        <section className="principal">
          <div className="category-container">
            {
              categories.map((category) => (
                <div key={ category.id }>
                  <label data-testid="category" htmlFor={ category.id }>
                    <input type="radio" id={ category.id } />
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
