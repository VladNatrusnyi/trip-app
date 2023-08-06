import styles from './CustomBtn.module.scss'
export const CustomBtn = ({ children, onClick, type = 'primary', disabled = false, tooltip }) => {

  const tooltipContent = tooltip || null;

  return (
    <button className={type === 'primary' ? styles.primary : styles.light } disabled={disabled} onClick={onClick}>
      {children}
      {disabled && <span className={styles.tooltipText}>{tooltipContent}</span>}
    </button>
  );
}
