import { Cloud, CloudLightning, Clouds, CloudSnow, Fog, Rain, Sun } from "../../assets/svgs/weather";

interface Props {
  weatertType: string,
}

const WeatherIcon = ({weatertType}: Props) => {
  switch(weatertType) {
    case 'Clear': return <Sun />;
    case 'Cloud': return <Cloud />;
    case 'Clouds': return <Clouds />;
    case 'Rain': return <Rain />;
    case 'Thunderstorm': return <CloudLightning />;
    case 'Snow': return <CloudSnow />;
    default: return <Fog />;
  }
};

export default WeatherIcon;