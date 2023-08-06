import styles from './TripsList.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useState} from "react";
import {TripCard} from "./TripCard/TripCard";
import {AddTripBtn} from "../../UI/AddTripBtn/AddTripBtn";
import {setIsOpenModal} from "../../../store/trips/tripsSlice";
import {useDispatch} from "react-redux";

import { useWindowSize } from "@uidotdev/usehooks";
export const TripsList = ({trips}) => {
  const dispatch = useDispatch()
  const windowSize = useWindowSize();

  const [isShowNavigation, setIsShowNavigation] = useState(false)

  const show = () => setIsShowNavigation(true)
  const hide = () => setIsShowNavigation(false)

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
    >

        <Swiper
          slidesPerView={windowSize.width <= 768 ? 2 : 3}
          spaceBetween={20}
          navigation={isShowNavigation}
          pagination={{
            clickable: true,
        }}
          modules={[ Navigation, Pagination]}
          className={styles.carousel}
          style={{
            overflow: 'hidden',
            width: '90%',
            paddingBottom: '30px',
            marginLeft: windowSize.width <= 768 ? '20px' : '10px'
        }}
        >
          {
            trips.map(trip => {
              return (
                <SwiperSlide key={trip.id}>
                  {/*<div className={styles.slide}>1</div>*/}
                  <TripCard tripData={trip} />
                </SwiperSlide>
              )
            })
          }

        </Swiper>

      <div className={styles.addTripWrapper} >
        <AddTripBtn onClick={() => dispatch(setIsOpenModal(true))}/>
      </div>
    </div>
  )
}


