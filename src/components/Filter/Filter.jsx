// import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={css.filterWrapper} onClick={e => e.stopPropagation()}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search contacts"
        className={css.searchInput}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
