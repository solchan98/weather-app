import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CloudWind, DegreesCelCius, Marker, RainDrop } from '../../assets/svgs/weather';
import { currentDateState, currentWeatherState, fiveDayWeatherState } from '../../recoil/weather/atoms';
import { fiveDateListValue, todayWeatherListValue } from '../../recoil/weather/selector';
import { getCurrentWeather, getFiveDayWeather} from '../../services/weather';
import styles from './Weather.module.scss';


const BASE_LOCATION = { // YONGIN
  lat: 37.2284122,
  lon: 127.1892561,
}

const Weather = () => {

  const [currentWeather, setCurrentWeather] = useRecoilState(currentWeatherState);
  const [, setFiveDayWeather] = useRecoilState(fiveDayWeatherState);
  const todayWeatherList = useRecoilValue(todayWeatherListValue);
  const fiveDateList = useRecoilValue(fiveDateListValue);
  const [curDate, setCurDate] = useRecoilState(currentDateState);
  const [selecteDate, setSelectDate] = useState(curDate);

  useEffect(() => {
    const getInitData = async () => {
      const currentWeatherRes = await getCurrentWeather(BASE_LOCATION);
      const fiveDayWeatherRes = getFiveDayWeather(BASE_LOCATION);
      setCurrentWeather(currentWeatherRes.data);
      setFiveDayWeather((await fiveDayWeatherRes).data);
    }
    getInitData();
  }, [setCurrentWeather, setFiveDayWeather]);

  const onDateClick = (date: string) => {
    setSelectDate(date);
    setCurDate(date);
  };

  return(
    <section className={styles.section}>
      <header className={styles.header}>
        <Marker className={styles.marker} />
        <h3 className={styles.locationBtn} >{currentWeather.name}</h3>
      </header>
      <main className={styles.main}>
        <div className={styles.weatherIcon}>
          <CloudWind />
        </div>
        <h3>{currentWeather.weather[0].description}</h3>
        <div className={styles.temperatureInfo}>
          <span>{(currentWeather.main.temp - 273.15).toFixed(0)}<DegreesCelCius className={styles.degrees}/></span>
        </div>
        <div className={styles.subWeatherInfo}>
          <span className={styles.subInfoItem}>
            <CloudWind />
            {`${(currentWeather.wind.speed * 1.609344).toFixed(1)}km/h`}
          </span>
          <span className={styles.subInfoItem}>
            <RainDrop />
            {`${currentWeather.main.humidity}%`}
          </span>
        </div>
      </main>
      <footer >
        <ul className={styles.dayList}>
          {fiveDateList.map((date, index) => 
            <li key={`date_${index + 1}`}>
              <button type='button' style={{opacity: !dayjs(date).isSame(selecteDate) ? 0.5 : 1}} onClick={() => onDateClick(date)}>
                {dayjs(date).format('D MMMM')}
              </button>
            </li>)}
        </ul>
        <ul>
          {todayWeatherList.map((value, index) => 
            <li key={`today_time_${index + 1}`}>
              <div className={styles.dayWeatherItem}>
                <time>{dayjs(value.dt_txt).format('H:mm A')}</time>
                <CloudWind />
                <span>
                  {(value.main.temp - 273.15).toFixed(0)}
                  <DegreesCelCius className={styles.degrees}/>
                </span>
              </div>
            </li>)}
        </ul>
      </footer>
    </section>
  );
};

export default Weather;