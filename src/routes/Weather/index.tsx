import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CloudWind, DegreesCelCius, Marker, RainDrop } from '../../assets/svgs/weather';
import { currentDateState, currentWeatherState, fiveDayWeatherState } from '../../recoil/weather/atoms';
import { getCurrentWeather } from '../../services/weather';
import styles from './Weather.module.scss';
import WeatherIcon from './WeatherIcon';

interface ILocation {
  latitude: number,
  longitude: number,
}

const Weather = () => {

  const [location, setLocation] = useState<ILocation>({} as ILocation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((positon: GeolocationPosition) => {
      const latitude = positon.coords.latitude || 37.2221658;
      const longitude = positon.coords.longitude || 127.1875067;
      setLocation({ latitude, longitude });
    });
  }, []);

  const [currentWeather, setCurrentWeather] = useRecoilState(currentWeatherState);

  useEffect(() => {
    if(location.latitude && location.longitude) {
      const getInitData = async () => {
        const currentWeatherRes = await getCurrentWeather(location);
        setCurrentWeather(currentWeatherRes.data);
      };
      getInitData();
    }
  }, [location, setCurrentWeather]);


  return(
    <section className={styles.mainSec}>
      <header className={styles.header}>
        <Marker className={styles.marker} />
        <h3 className={styles.locationBtn} >{currentWeather.name}</h3>
      </header>
      <main className={styles.main}>
        <div className={styles.weatherIcon}>
          <WeatherIcon weatertType={currentWeather.weather[0].main} />
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
      {/* <footer>
        <FiveDayList />
      </footer> */}
    </section>
  );
};

export default Weather;
