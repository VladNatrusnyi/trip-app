import styles from './WeatherGridItem.module.scss'
import {formatNameDayOfWeek} from "../../../../helpers/formatDate";
export const WeatherGridItem = ({itemData}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dayName}>
        {
          formatNameDayOfWeek(itemData.datetime)
        }
      </div>
      <div className={styles.imgWrapper}>
        <img src={require(`./../../../../assets/weather-icons/${itemData.icon}.png`)} alt={itemData.icon}/>
      </div>
      <div className={styles.temp}>
        {itemData.tempmax}°/{itemData.tempmin}°
      </div>
    </div>
  )
}
