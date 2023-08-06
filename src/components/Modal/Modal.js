import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React, {useState} from "react";
import {CustomBtn} from "../UI/CustomBtn/CustomBtn";

import styles from './Modal.module.scss'
import {createNewTrip, setIsOpenModal, setIsValidated} from "../../store/trips/tripsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../UI/Preloader/Preloader";


export const ModalFC = ({children}) => {
  const dispatch = useDispatch()

  const isValidated = useSelector((state) => state.trips.isValidated)
  const isNewTripCreating = useSelector((state) => state.trips.isNewTripCreating)
  const isOpenModal = useSelector((state) => state.trips.isOpenModal)


  const [tripData, setTripData] = useState(null);


  const onOpenModal = () => dispatch(setIsOpenModal(true));
  const onCloseModal = () => {
    dispatch(setIsOpenModal(false))
    dispatch(setIsValidated(false))
  };


  const cancel = () => {
    onCloseModal()
  }

  const createTrip = () => {
    tripData && dispatch(createNewTrip(tripData))
  }

  return (
    <div >
      <Modal open={isOpenModal} onClose={onCloseModal} center>
        {
        isNewTripCreating
        ? <div className={styles.preloaderWrapper}> <Preloader /> </div>
        : <>
          <div style={{overflow: 'auto', padding: '0px'}}>
            <h2>Create trip</h2>
            {/*{children}*/}
            {React.cloneElement(children, { setTripData: setTripData })}
          </div>

          <div className={styles.btnBlock}>
            <CustomBtn onClick={cancel} type={'light'}>Cancel</CustomBtn>
            <CustomBtn onClick={createTrip} disabled={!isValidated} tooltip="Not all fields are filled">Save</CustomBtn>
          </div>
        </>
        }
      </Modal>
    </div>
  );
};
