import axios from 'axios';
import { useEffect } from 'react';
import { CloudWind, DegreesCelCius, Marker, RainDrop } from '../../assets/svgs/weather';
import { getCurrentWeather, getFiveDayWeather } from '../../services/weather';
import styles from './Weather.module.scss';

const Weather = () => {

  useEffect(() => {
    getFiveDayWeather({lat: 37.2284122, lon: 127.1892561})
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    })
  }, []);

  return(
    <section className={styles.section}>
      <header className={styles.header}>
        <Marker className={styles.marker} />
        <h3 className={styles.locationBtn} >San Francisco</h3>
      </header>
      <main className={styles.main}>
        <div className={styles.weatherIcon}>
          <CloudWind />
        </div>
        <h3>Cloudy</h3>
        <div className={styles.temperatureInfo}>
          <span>28<DegreesCelCius className={styles.degrees}/></span>
        </div>
        <div className={styles.subWeatherInfo}>
          <span className={styles.subInfoItem}>
            <CloudWind />
            8km/h
          </span>
          <span className={styles.subInfoItem}>
            <RainDrop />
            47%
          </span>
        </div>
      </main>
      <footer >
        <ul className={styles.dayList}>
          <li><div>Mon 19, Sep</div></li>
          <li><div style={{opacity: 0.5}}>Mon 19, Sep</div></li>
          <li><div style={{opacity: 0.5}}>Mon 19, Sep</div></li>
          <li><div style={{opacity: 0.5}}>Mon 19, Sep</div></li>
          <li><div style={{opacity: 0.5}}>Mon 19, Sep</div></li>
          <li><div style={{opacity: 0.5}}>Mon 19, Sep</div></li>
        </ul>
        <ul>
          <li>
            <div className={styles.dayWeatherItem}>
              <time>09:00 AM</time>
              <CloudWind />
              <span>28<DegreesCelCius className={styles.degrees}/></span>
            </div>
          </li>
          <li>
            <div className={styles.dayWeatherItem}>
              <time>09:00 AM</time>
              <CloudWind />
              <span>28<DegreesCelCius className={styles.degrees}/></span>
            </div>
          </li>
          <li>
            <div className={styles.dayWeatherItem}>
              <time>09:00 AM</time>
              <CloudWind />
              <span>28<DegreesCelCius className={styles.degrees}/></span>
            </div>
          </li>
          <li>
            <div className={styles.dayWeatherItem}>
              <time>09:00 AM</time>
              <CloudWind />
              <span>28<DegreesCelCius className={styles.degrees}/></span>
            </div>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default Weather;