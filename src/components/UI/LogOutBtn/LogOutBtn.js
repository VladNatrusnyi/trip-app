import styles from './LogOutBtn.module.scss'
export const LogOutBtn = ({onClick}) => {
  return <i onClick={onClick} title={'log out'} className={`bi bi-box-arrow-right ${styles.icon}`}></i>
}
