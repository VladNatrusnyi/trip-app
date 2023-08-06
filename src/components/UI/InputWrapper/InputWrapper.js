import styles from './InputWrapper.module.scss'
export const InputWrapper = ({children, title}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <i className="bi bi-asterisk"></i>  <div>{title}</div>
      </div>
      {children}
    </div>
  )
}
