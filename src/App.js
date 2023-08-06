import './App.scss';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth, provider} from "./config/firebase";
import {SingInBtn} from "./components/UI/SingInBtn/SingInBtn";
import {Logo} from "./components/UI/Logo/Logo";
import {useEffect, useRef, useState} from "react";
import {SingInLayout} from "./layouts/SingInLayout/SingInLayout";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "./store/registration/registrationSlice";
import {USER_LOGOUT} from "./store";
import {LoadGroup} from "./components/UI/LoadGroup/LoadGroup";
import {getTrips, setIsDeleting} from "./store/trips/tripsSlice";

import 'react-calendar/dist/Calendar.css';
import {MainLayout} from "./layouts/MainLayout/MainLayout";
import {Alert} from "./components/UI/Alert/Alert";


function App() {

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.registration.userData)
  const isDataLoading = useSelector((state) => state.trips.isDataLoading)
  const idDeleting = useSelector((state) => state.trips.idDeleting)


  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoaded(true)
        dispatch(setUserData({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }))

        dispatch(getTrips(user.uid))
      } else {
        setIsLoaded(true)
        console.log('User is signed out')
      }
    });
  }, [])


  const hideAlert = () => {
    dispatch(setIsDeleting(false))
  };



  return (
    <>
      <Alert
        show={idDeleting}
        onClose={hideAlert}
        message="Deleting trip"
      />
      {/*<button >Addddd</button>*/}
      {
        !isLoaded || isDataLoading
        ?
          <div className='singInLayout'>
            <LoadGroup />
          </div>
        :
          <div className={userData ? 'mainLayout' : 'singInLayout'}>
            {
              userData
                ? <MainLayout />
                : <SingInLayout />
            }
          </div>
      }
    </>
  );
}

export default App;

