import { Component } from 'react';
import PropTypes from 'prop-types';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  resetForm = () => {
    this.setState({
      searchQuery: '',
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (searchQuery.trim() === '') {
      return Report.warning('Error!', 'Please enter a request', 'Close');
    }
    onSubmit(searchQuery);
    this.resetForm();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span>
              <ImSearch className={css.buttonLabel} />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={this.searchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
