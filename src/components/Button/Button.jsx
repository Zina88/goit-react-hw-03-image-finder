import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="submit" className={css.buttonLoadMore} onClick={() => onClick()}>
      <span className={css.spanLoadMore}>Load more</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
