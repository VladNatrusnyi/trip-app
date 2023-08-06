import styles from './MainPart.module.scss'
import {TripsList} from "./TripsList/TripsList";
import {useDispatch, useSelector} from "react-redux";
import {ModalFC} from "../Modal/Modal";
import {NewTripForm} from "../NewTripForm/NewTripForm";
import {SearchInput} from "../SearchInput/SearchInput";
import {useMemo, useState} from "react";
import {CITIES} from "../../mocks/cities";
import {AddTripBtn} from "../UI/AddTripBtn/AddTripBtn";
import {setIsOpenModal} from "../../store/trips/tripsSlice";

export const MainPart = () => {
  const dispatch = useDispatch()

  const trips = useSelector((state) => state.trips.trips)

  const [searchText, setSearchText] = useState('')


  const tripsArr = useMemo(() => {
    if (trips) {
      if (searchText.trim()) {
        return trips.filter(trip => CITIES.find(el => el.id === trip.cityId).name.toUpperCase()
          .includes(searchText.trim().toUpperCase()))
      } else {
        return [...trips]
      }
    }
  }, [searchText, trips])

  return (
    <>
      <ModalFC >
        <NewTripForm />
      </ModalFC>

      <SearchInput
        onChange={(text) => setSearchText(text) }
        value={searchText}
        placeholder='Search your trip'
        clearInput={() => setSearchText('')}
      />

      {
        trips
          ? <TripsList
            trips={[...tripsArr].sort((a,b) => new Date(a.startDate) - new Date(b.startDate))}
          />
          :
          <div className={styles.noExistTrips}>
            <h4>
              Sorry, no available trips were found
            </h4>
            <AddTripBtn onClick={() => dispatch(setIsOpenModal(true))}/>
          </div>
      }

    </>
  )
}
