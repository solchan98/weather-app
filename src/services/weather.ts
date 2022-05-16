import axios from "axios";
import { ICurrentWeather, IWeatherList } from "../types/weather/index.d";

interface ILocation {
  latitude: number,
  longitude: number,
}


const GET_CURRENT_WEATHER_URL = (params: ILocation) => `https://api.openweathermap.org/data/2.5/weather?lat=${params.latitude}&lon=${params.longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
const GET_FIVE_DAY_WEATHER_URL = (params: ILocation) => `https://api.openweathermap.org/data/2.5/forecast?lat=${params.latitude}&lon=${params.longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`;


export const getCurrentWeather = (parms: ILocation) => axios.get<ICurrentWeather>(GET_CURRENT_WEATHER_URL(parms));

export const getFiveDayWeather = (params: ILocation) => axios.get<IWeatherList>(GET_FIVE_DAY_WEATHER_URL(params));