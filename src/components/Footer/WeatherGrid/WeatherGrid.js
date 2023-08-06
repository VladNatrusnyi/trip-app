import styles from './WeatherGrid.module.scss'
import {WeatherGridItem} from "./WeatherGridItem/WeatherGridItem";
export const WeatherGrid = ({data}) => {
  return (
    <div className={styles.wrapper}>
        {
            data.map((item, idx) => <WeatherGridItem key={idx} itemData={item} />)
        }
    </div>
  )
}
