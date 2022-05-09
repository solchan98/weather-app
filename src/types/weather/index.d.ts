interface ICity {
  id: number,
  name: string,
  coord: ICoord,
  country: string,
  sunrise: number,
  sunset: number,
}

interface ICoord {
  lat: number,
  lon: number,
}

interface IList {
  dt: number,
  main: IMain,
  weather: IWeather[],
  clouds: IClouds,
  wind: IWind,
  visibility: number,
  pop: number,
  dt_txt: string
};

interface IWind {
  speed: number,
  deg: number,
  gust: number,
}

interface IMain {
  temp: number,
  feels_like: number,
  temp_min: numberm
  temp_max: number
  pressure: number,
  humidity: number,
};

interface IWeather {
  id: number,
  main: string,
  description: string,
  icon: string,
};

interface IClouds {
  all: number,
};


export interface ICurrentWeather {
  coord: ICoord,
  weather: IWeather[],
  main: IMain,
  wind: IWind,
  clouds: IClouds,
  dt: string,
  name: string
}


export interface IWeatherList{
  cod: string,
  message: string,
  cnt: number,
  list: IList[],
  city: ICity,
};