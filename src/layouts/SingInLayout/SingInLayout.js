import styles from './SingInLayout.module.scss'
import {SingInBtn} from "../../components/UI/SingInBtn/SingInBtn";
import {Logo} from "../../components/UI/Logo/Logo";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, provider} from "../../config/firebase";
export const SingInLayout = () => {

  const  signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

      }).catch((error) => {
      const errorMessage = error.message;
      console.log('Error', errorMessage)
    });
  }

  return (
    <div className={styles.container}>
        <Logo/>
        <SingInBtn onClick={signIn}/>
    </div>
  )
}
