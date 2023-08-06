import styles from './LoadGroup.module.scss'
import {Preloader} from "../Preloader/Preloader";
import {Logo} from "../Logo/Logo";

export const LoadGroup = () => {

  return (
    <div className={styles.container}>
      <img src={require('./../../../assets/img/partly_sunny.png')} alt="partly_sunny"/>
      <Logo size={30}/>
      <Preloader width={40}/>
    </div>
  )
}
