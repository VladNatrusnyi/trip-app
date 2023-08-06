import styles from './SingInBtn.module.scss'
export const SingInBtn = ({onClick}) => {
  return (
    <div onClick={onClick} className={styles.googleBtn}>
      <div className={styles.googleIconWrapper}>
        <img className={styles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p className={styles.btnText}><b>Sign in with google</b></p>
    </div>
  )
}
