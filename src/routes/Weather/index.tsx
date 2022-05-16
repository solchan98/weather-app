import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import styles from './Weather.module.scss';
import WeatherIcon from './WeatherIcon';
import { ICurrentWeather } from '../../types/weather/index.d';
import { getCurrentWeather } from '../../services/weather';
import { CloudWind, DegreesCelCius, Marker, RainDrop } from '../../assets/svgs/weather';
import { ILocation } from '../../types/location/index.d';

const Weather = () => {

  const [location, setLocation] = useState<ILocation>({} as ILocation);

  const { data } = useQuery<ICurrentWeather, Error>(
    'currentWeather',
    () => getCurrentWeather(location).then(res => res.data),
    { enabled: !!location.latitude }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((positon: GeolocationPosition) => {
      const latitude = positon.coords.latitude || 37.2221658;
      const longitude = positon.coords.longitude || 127.1875067;
      setLocation({ latitude, longitude });
    });
  }, []);

  if(!data) return(<section className={styles.mainSec} />);

  return(
    <section className={styles.mainSec}>
      <header className={styles.header}>
        <Marker className={styles.marker} />
        <h3 className={styles.locationBtn} >{data.name}</h3>
      </header>
      <main className={styles.main}>
        <div className={styles.weatherIcon}>
          <WeatherIcon weatertType={data.weather[0].main} />
        </div>
        <h3>{data.weather[0].description}</h3>
        <div className={styles.temperatureInfo}>
          <span>{(data.main.temp - 273.15).toFixed(0)}<DegreesCelCius className={styles.degrees}/></span>
        </div>
        <div className={styles.subWeatherInfo}>
          <span className={styles.subInfoItem}>
            <CloudWind />
            {`${(data.wind.speed * 1.609344).toFixed(2)}km/h`}
          </span>
          <span className={styles.subInfoItem}>
            <RainDrop />
            {`${data.main.humidity}%`}
          </span>
        </div>
      </main>
    </section>
  );
};

export default Weather;
