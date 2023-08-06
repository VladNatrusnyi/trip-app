import styles from './TripCard.module.scss'
import {CITIES} from "../../../../mocks/cities";
import {formatTripPeriod} from "../../../../helpers/formatDate";
import {useDispatch, useSelector} from "react-redux";
import {deleteTrip, setCurrentTrip} from "../../../../store/trips/tripsSlice";
import {Badge} from "../../../UI/Badge/Badge";
export const TripCard = ({tripData}) => {
  const dispatch = useDispatch()

  const currentTrip = useSelector((state) => state.trips.currentTrip)

  const cityData = CITIES.find(el => el.id === tripData.cityId)

  const isTripStarted = new Date(tripData.startDate) <= new Date()
  const isTripFinished = isTripStarted && new Date(tripData.endDate) <= new Date()

  const chooseCard = () => {
    dispatch(setCurrentTrip(tripData))
  }

  const deleteCard = (e) => {
    e.stopPropagation()
    dispatch(deleteTrip(tripData.id))
  }


  return (
      <div
        onClick={chooseCard}
        className={`${styles.wrapper} ${currentTrip.id === tripData.id && styles.active}`}
      >
        <div onClick={deleteCard} className={styles.deleteBtn}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className={styles.imgWrapper}>
          <div className={styles.badge}>
            { isTripStarted && !isTripFinished && <Badge text={'Trip started'} /> }
            { isTripFinished && <Badge text={'Trip finished'} /> }
          </div>
          <img
            src={require(`./../../../../assets/city-img/${tripData.cityId}.webp`)}
            alt="cityImg"
          />
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.title}>{cityData.name}</div>
          <div className={styles.dates}>
            {formatTripPeriod(tripData.startDate, tripData.endDate)}
          </div>
        </div>
      </div>
  )
}
