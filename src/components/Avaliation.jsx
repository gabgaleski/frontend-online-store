import React from 'react';
import PropTypes from 'prop-types';

class Avaliation extends React.Component {
  state = {
    email: '',
    rating: '',
    message: '',
    comments: [],
    error: false,
  };

  componentDidMount() {
    const { id } = this.props;
    if (!JSON.parse(localStorage.getItem(id))) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    const arrayComments = JSON.parse(localStorage.getItem(id));
    this.setState((prev) => ({
      comments: [...prev.comments, ...arrayComments],
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  sendReview = () => {
    const { email, rating, message } = this.state;
    const { id } = this.props;
    if (email && rating && email.includes('@')) {
      const obj = {
        email,
        rating,
        message,
      };
      this.setState((prev) => ({
        comments: [...prev.comments, obj],
        email: '',
        rating: '',
        message: '',
        error: false,
      }), () => {
        const { comments } = this.state;
        localStorage.setItem(id, JSON.stringify(comments));
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const { email, message, comments, error } = this.state;
    return (
      <div>
        <form>
          <label>
            <input
              required
              data-testid="product-detail-email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <div>
            <label>
              1
              <input
                onChange={ this.handleChange }
                value="1"
                name="rating"
                data-testid="1-rating"
                type="radio"
                required
              />
            </label>
            <label>
              2
              <input
                onChange={ this.handleChange }
                value="2"
                name="rating"
                data-testid="2-rating"
                type="radio"
              />
            </label>
            <label>
              3
              <input
                onChange={ this.handleChange }
                value="3"
                name="rating"
                data-testid="3-rating"
                type="radio"
              />
            </label>
            <label>
              4
              <input
                onChange={ this.handleChange }
                value="4"
                name="rating"
                data-testid="4-rating"
                type="radio"
              />
            </label>
            <label>
              5
              <input
                onChange={ this.handleChange }
                value="5"
                name="rating"
                data-testid="5-rating"
                type="radio"
              />
            </label>
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            value={ message }
            name="message"
          />
          <button
            type="button"
            onClick={ this.sendReview }
            data-testid="submit-review-btn"
          >
            Avaliar

          </button>
        </form>
        {error && <span data-testid="error-msg">Campos inválidos</span>}
        {comments.map((comment, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{comment.email}</p>
            <p data-testid="review-card-rating">{comment.rating}</p>
            <p data-testid="review-card-evaluation">{comment.message}</p>
          </div>))}
      </div>
    );
  }
}

Avaliation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Avaliation;
