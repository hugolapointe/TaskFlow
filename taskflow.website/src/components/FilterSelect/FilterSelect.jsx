import styles from './FilterSelect.module.css';

const FilterSelect = ({ label, value, onChange, options }) => {
  return (
    <div className={styles.filterGroup}>
    <label className={styles.label}>{label}</label>
      <select 
        className={styles.select}
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
