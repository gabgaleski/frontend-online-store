import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import QueryProduct from './QueryProduct';

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
      <>
        <div>
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </Link>
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </div>
        {
          categories.map((category) => (
            <label data-testid="category" htmlFor={ category.id } key={ category.id }>
              { category.name }
              <input type="radio" id={ category.id } />
            </label>
          ))
        }
        <div />
        <main>
          <QueryProduct />
        </main>
      </>
    );
  }
}
