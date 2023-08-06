import {useSelector} from "react-redux";
import {CITIES} from "../../mocks/cities";
import {useGetWeatherQuery} from "../../store/queries/weatherApi";
import {WeatherGrid} from "./WeatherGrid/WeatherGrid";
import {Preloader} from "../UI/Preloader/Preloader";

export const Footer = () => {

  const currentTrip = useSelector((state) => state.trips.currentTrip)

  const { weather, isFetching, isError } = useGetWeatherQuery(
    currentTrip && {
      startDate: currentTrip.startDate,
      endDate: currentTrip.endDate,
      coordinates: CITIES.find(el => el.id === currentTrip.cityId)?.coordinates,
    },
    {
    skip: !currentTrip,
    selectFromResult: ({data}) => {
      return {
        weather: data?.weather
      }
    },

  })

  return (
    <>
      {isFetching && <Preloader />}
      {
        currentTrip && weather && weather.length
          &&
        <>
          <h3>Week</h3>
          <WeatherGrid data={weather} />
        </>
      }
    </>

  )



}
