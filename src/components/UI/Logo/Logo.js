import styles from './Logo.module.scss'
export const Logo = ({size = 22}) => {
  return (
    <div style={{fontSize: `${size}px`}} className={styles.logo}>Weather <span>Forecast</span></div>
  )
}
