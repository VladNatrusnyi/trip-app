import styles from './NewTripForm.module.scss'
import {InputWrapper} from "../UI/InputWrapper/InputWrapper";
import {Select} from "../Select/Select";
import {DatePicker} from "../DatePicker/DatePicker";
import {CITIES} from "../../mocks/cities";
import {useEffect, useState} from "react";
import {formatDateForApi} from "../../helpers/formatDate";
import {useDispatch} from "react-redux";
import {setIsValidated} from "../../store/trips/tripsSlice";
import { useWindowSize } from "@uidotdev/usehooks";

const options = CITIES.map(city => ({value: city.id, label: city.name}))

export const NewTripForm = ({setTripData}) => {
  const dispatch = useDispatch()
  const windowSize = useWindowSize();

  const inputSize = windowSize.width <= 480 ? 280 : 400

  const [cityId, setCityId] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleSelect = (option) => {
    setCityId(option.value)
  }

  const handleStartDate = (date) => {
    setStartDate(formatDateForApi(date))
  }

  const handleEndDate = (date) => {
    setEndDate(formatDateForApi(date))
  }

  useEffect(() => {
    if (cityId && startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        alert('The end date cannot be earlier than the initial date')
      } else {
        dispatch(setIsValidated(true))
        setTripData({
          cityId, startDate, endDate,
          id: Date.now().toString(),
        })
      }
    }
  }, [cityId, startDate, endDate])


  return (
    <div className={styles.wrapper}>
      <InputWrapper title={'City'}>
        <Select options={options} onSelect={handleSelect} width={inputSize}/>
      </InputWrapper>

      <InputWrapper title={'Start date'}>
        <DatePicker getDate={handleStartDate} placeholder='Select date' width={inputSize} />
      </InputWrapper>

      <InputWrapper title={'End date'}>
        <DatePicker getDate={handleEndDate} placeholder='Select date' width={inputSize} />
      </InputWrapper>
    </div>
  )
}
