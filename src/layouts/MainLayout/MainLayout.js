import styles from './MainLayout.module.scss'
import {Logo} from "../../components/UI/Logo/Logo";
import {MainPart} from "../../components/MainPart/MainPart";
import {Footer} from "../../components/Footer/Footer";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {LogOutBtn} from "../../components/UI/LogOutBtn/LogOutBtn";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";
import {USER_LOGOUT} from "../../store";
import { useWindowSize } from "@uidotdev/usehooks";
export const MainLayout = () => {
  const dispatch = useDispatch()
  const windowSize = useWindowSize();

  const currentTrip = useSelector((state) => state.trips.currentTrip)

  const logOut = () => {
    signOut(auth).then(() => {
      console.log('Sign-out successful.')
      dispatch({type: USER_LOGOUT})
    }).catch((error) => {
      console.log('Sign-out An error happened.')
    });
  }

  return (
    <>
      <header className={styles.header}>
        <Logo size={windowSize.width <=300 ? 20 : 26}/>
        <LogOutBtn onClick={logOut}/>
      </header>
      <main className={styles.main}>
        <MainPart />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
      <aside className={styles.sidebar}>
        {currentTrip && <Sidebar currentTrip={currentTrip}/>}
      </aside>
    </>
  )
}
