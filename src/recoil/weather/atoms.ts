import dayjs from "dayjs";
import { atom } from "recoil";
// eslint-disable-next-line import/extensions
import { IWeatherList } from "../../types/weather";

const INIT_ICURRENTWEATHER = {
  name: '',
  weather: [{description: ''}],
  main: { temp: 274, humidity: 0 },
  wind: { speed: 0 },
};

export const currentWeatherState = atom({
  key: 'currentWeatherState',
  default: INIT_ICURRENTWEATHER
});


export const fiveDayWeatherState = atom({
  key: 'fiveDayWeatherState',
  default: {} as IWeatherList,
});

export const currentDateState = atom({
  key: 'currentDateState',
  default: dayjs().format('YYYY-MM-DD'),
});