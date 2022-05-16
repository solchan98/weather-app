import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

import cs from './fiveDayList.module.scss';
import WeatherIcon from '../WeatherIcon';
import { ILocation } from '../../../types/location/index.d';
import { IWeatherList } from '../../../types/weather/index.d';
import { DegreesCelCius } from '../../../assets/svgs/weather';
import { getFiveDayWeather } from '../../../services/weather';

interface Props {
  location: ILocation;
}

const FiveDayList = ({ location }: Props) => {

  const [curDate, setCurDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selecteDate, setSelectDate] = useState(curDate);
  const [dateList, setDateList] = useState<string[]>([]);

  const onDateClick = (date: string) => {
    setSelectDate(date);
    setCurDate(date);
  };

  const { data } = useQuery<IWeatherList, Error>(
    'fiveDayList', 
    () => getFiveDayWeather(location).then(res => res.data),
    { enabled: !!location.latitude }
  );

  useEffect(() => {
    if(data) {
      const list = data.list.map((value) => dayjs(value.dt_txt).format('YYYY-MM-DD'));
      setDateList(list.filter((value, index) => list.indexOf(value) === index));
    }
  }, [data]);

  if(!data) return(<>...로딩중</>);

  return(
    <>
      <ul className={cs.dayList}>
        {dateList.map((date, index) => 
          <li key={`date_${index + 1}`}>
            <button type='button' style={{opacity: !dayjs(date).isSame(selecteDate) ? 0.5 : 1}} onClick={() => onDateClick(date)}>
              {dayjs(date).format('D MMMM')}
            </button>
          </li>)}
      </ul>
      <ul>
        {data.list.filter(val => dayjs(val.dt_txt).format("YYYY-MM-DD") === curDate).map((value, index) => 
          <li key={`today_time_${index + 1}`}>
            <div className={cs.dayWeatherItem}>
              <time>{dayjs(value.dt_txt).add(9, 'hour').format('H:mm A')}</time>
              <WeatherIcon weatertType={value.weather[0].main} />
              <span>
                {(value.main.temp - 273.15).toFixed(0)}
                <DegreesCelCius className={cs.degrees}/>
              </span>
            </div>
          </li>)}
      </ul>
    </>
  );
};

export default FiveDayList;