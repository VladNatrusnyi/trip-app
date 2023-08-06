import styles from './Sidebar.module.scss'
import {CurrentWeatherInCity} from "./CurrentWeatherInCity/CurrentWeatherInCity";
import {CITIES} from "../../mocks/cities";
import {useGetTodayWeatherQuery} from "../../store/queries/weatherApi";
import {Preloader} from "../UI/Preloader/Preloader";
import {formatNameDayOfWeek} from "../../helpers/formatDate";
import {Timer} from "../Timer/Timer";
export const Sidebar = ({currentTrip}) => {


  const cityData = CITIES.find(el => el.id === currentTrip.cityId)


  const { weather, isFetching, isError } = useGetTodayWeatherQuery(
    currentTrip && cityData.coordinates,
    {
      skip: !currentTrip,
      selectFromResult: ({data}) => {
        return {
          weather: data?.weather
        }
      },

    })

  return (
    <div className={styles.wrapper}>
      {isFetching && <Preloader width={150}/> }
      {
        weather &&
        <div style={{marginLeft: '-64px'}}>
          <CurrentWeatherInCity data={{
            cityName: cityData.name,
            temp: weather[0].temp,
            day: formatNameDayOfWeek(weather[0].datetime),
            icon: weather[0].icon
          }}/>
        </div>
      }

      <Timer targetDate={currentTrip.startDate} />

    </div>
  )
}
