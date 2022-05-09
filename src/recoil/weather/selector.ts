import dayjs from "dayjs";
import { selector } from "recoil";
import { currentDateState, fiveDayWeatherState } from "./atoms";

export const todayWeatherListValue = selector({
  key: 'todayWeatherListValue',
  get: ({get}) => {
    const data = get(fiveDayWeatherState);
    const today = get(currentDateState);
    const date = dayjs(today);
    return Object.keys(data).length !== 0 ? data.list.filter((val) => date.isSame(dayjs(val.dt_txt).format('YYYY-MM-DD'))) : [];
  }
});

export const fiveDateListValue = selector({
  key: 'fiveDateListValue',
  get: ({get}) => {
    const data = get(fiveDayWeatherState);
    const list = Object.keys(data).length !== 0 ? data.list.map((value) => dayjs(value.dt_txt).format('YYYY-MM-DD')) : [];
    return list.filter((value, index) => list.indexOf(value) === index);
  }
});