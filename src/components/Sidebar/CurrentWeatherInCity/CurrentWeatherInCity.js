import styles from './CurrentWeatherInCity.module.scss'
import {TemperatureDisplay} from "../../UI/TemperatureDisplay/TemperatureDisplay";

export const CurrentWeatherInCity = ({data}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img src={require(`./../../../assets/weather-icons/${data.icon}.png`)} alt={data.icon}/>
      </div>
      <div className={styles.weatherWrapper}>
        <div className={styles.day}>{data.day}</div>
        <div >
          <TemperatureDisplay temp={data.temp} />
        </div>
        <div className={styles.city}>{data.cityName}</div>
      </div>

    </div>
  )
}
