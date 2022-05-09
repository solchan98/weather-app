import axios from "axios"
// eslint-disable-next-line import/extensions
import { ICurrentWeather, IWeatherList } from "../types/weather";

const API_KEY = '6067a6c0adf35a4ee4f60e194a087744';

interface Params {
  lat: number,
  lon: number,
}


const GET_CURRENT_WEATHER_URL = (params: Params) => `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}`;
const GET_FIVE_DAY_WEATHER_URL = (params: Params) => `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=6067a6c0adf35a4ee4f60e194a087744`;


export const getCurrentWeather = (parms: Params) => axios.get<ICurrentWeather>(GET_CURRENT_WEATHER_URL(parms));

export const getFiveDayWeather = (params: Params) => axios.get<IWeatherList>(GET_FIVE_DAY_WEATHER_URL(params));