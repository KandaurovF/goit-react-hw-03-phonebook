import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange, contacts }) => {
  return (
    <div className={css.filterWrapper} onClick={e => e.stopPropagation()}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Search contact from ${contacts.length} contacts`}
        className={css.searchInput}
      />
    </div>
  );
};

Filter.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
