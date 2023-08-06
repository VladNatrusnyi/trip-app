import styles from './AddTripBtn.module.scss'

export const AddTripBtn = ({onClick}) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      <div>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className={styles.text}>Add trip</div>
    </div>
  )
}
