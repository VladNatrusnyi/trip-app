import styles from './Badge.module.scss'

export const Badge = ({text}) => {
  return (
    <div className={styles.wrapper}>
      {text}
    </div>
  )
}
