import styles from './SearchInput.module.scss'
export const SearchInput = ({onChange, placeholder, value, clearInput}) => {
  return (
    <div className={styles.customInput}>
      <span className={styles.inputIcon}>
        <i className="bi bi-search"></i>
      </span>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        value={value}
        placeholder={placeholder}
        className={styles.formControl}
      />
      {
        value
        &&
        <span onClick={clearInput} className={styles.inputIconDelete}>
          <i className="bi bi-x-circle"></i>
        </span>
      }
    </div>
  )
}
