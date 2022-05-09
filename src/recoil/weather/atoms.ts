import dayjs from "dayjs";
import { atom } from "recoil";
// eslint-disable-next-line import/extensions
import { IWeatherList } from "../../types/weather";

const INIT_ICURRENTWEATHER = {
  name: '',
  weather: [{description: '', main: ''}],
  main: { temp: 274, humidity: 0 },
  wind: { speed: 0 },
};

const INIT_FIVE_DAY_WEATHER = {
  list: [{
      main: { temp: 274, humidity: 0 },
      weather: [{
        main: '',
        description: ''
      }],
      dt_txt: ''
    }]
};

export const currentWeatherState = atom({
  key: 'currentWeatherState',
  default: INIT_ICURRENTWEATHER
});


export const fiveDayWeatherState = atom({
  key: 'fiveDayWeatherState',
  default: INIT_FIVE_DAY_WEATHER
});

export const currentDateState = atom({
  key: 'currentDateState',
  default: dayjs().format('YYYY-MM-DD'),
});