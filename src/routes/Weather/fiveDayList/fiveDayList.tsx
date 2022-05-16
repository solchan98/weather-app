import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DegreesCelCius } from '../../../assets/svgs/weather';
import { currentDateState } from '../../../recoil/weather/atoms';
import { todayWeatherListValue, fiveDateListValue } from '../../../recoil/weather/selector';
import WeatherIcon from '../WeatherIcon';
import cs from './fiveDayList.module.scss';

const FiveDayList = () => {

  const [curDate, setCurDate] = useRecoilState(currentDateState);
  const [selecteDate, setSelectDate] = useState(curDate);

  const todayWeatherList = useRecoilValue(todayWeatherListValue);
  const fiveDateList = useRecoilValue(fiveDateListValue);

  const onDateClick = (date: string) => {
    setSelectDate(date);
    setCurDate(date);
  };

  return(
    <>
      <ul className={cs.dayList}>
        {fiveDateList.map((date, index) => 
          <li key={`date_${index + 1}`}>
            <button type='button' style={{opacity: !dayjs(date).isSame(selecteDate) ? 0.5 : 1}} onClick={() => onDateClick(date)}>
              {dayjs(date).format('D MMMM')}
            </button>
          </li>)}
      </ul>
      <ul>
        { todayWeatherList.length !== 0 && todayWeatherList.map((value, index) => 
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