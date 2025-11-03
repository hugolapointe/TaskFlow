import { useId } from 'react';
import styles from './FilterSelect.module.css';

const FilterSelect = ({ label, value, onChange, options }) => {
  const id = useId();
  return (
    <div className={styles.filterGroup}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <select 
        className={styles.select}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
