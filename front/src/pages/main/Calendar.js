import React, { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import * as Api from '../../api';
import changeUtc from '../../utils/changeUtc';

const Calendar = () => {
  const navigate = useNavigate();
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  let calendar = [];
  const endWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const [calendarList, setCalendarList] = useState([]);
  const [counter, setCounter] = useState('');
  const [year, setYear] = useState(today.format('YYYY'));
  const [month, setMonth] = useState(today.format('MM').replace(/(^0+)/, ''));

  useEffect(() => {
    getCalendarList();
  }, [month]);

  useEffect(() => {
    setMonth(today.format('MM').replace(/(^0+)/, ''));
    setYear(today.format('YYYY'));
  }, [today]);

  const clickDiary = (e) => {
    const diaryId = e.currentTarget.id;
    navigate(`/diary/${diaryId}`, { state: diaryId });
  };

  const getCalendarList = async () => {
    try {
      const res = await Api.get(`calendar/${year}/${month}`);
      setCalendarList(res.data);
      setCounter(res.data.length);
    } catch (err) {
      alert('달력 에러 발생');
    }
  };

  const addMonth = async () => {
    setMoment(getMoment.clone().add(1, 'month'));
  };

  const subtractMonth = async () => {
    setMoment(getMoment.clone().subtract(1, 'month'));
  };

  const calendarArr = () => {
    for (let week = firstWeek; week <= endWeek; week++) {
      calendar.push(
        <Week key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = today
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');

              let isSelected =
                moment().format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'true'
                  : '';

              let isGrayed =
                current.format('MM') !== today.format('MM') ? 'true' : '';

              let diary = '';
              let diaryId = '';
              let emotion = '';
              if (calendar.list !== 0) {
                for (let i = 0; i < counter; i++) {
                  const { checkDate } = changeUtc(calendarList[i].date);
                  diary =
                    checkDate === current.format('YYYYMMDD') ? 'ok' : 'no';

                  if (diary === 'ok') {
                    diaryId = calendarList[i].id;
                    emotion = calendarList[i].emotion;
                    break;
                  }
                }
              }

              let disabled = diaryId === '' ? true : false;

              return (
                <Day
                  key={i}
                  isSelected={isSelected}
                  isGrayed={isGrayed}
                  diary={diary}
                  disabled={disabled}
                  onClick={clickDiary}
                  emotion={emotion}
                  id={diaryId}
                >
                  <div>{current.format('D')}</div>
                </Day>
              );
            })}
        </Week>
      );
    }
    return calendar;
  };

  return (
    <>
      <CalendarContainer>
        <ControlContainer>
          <button onClick={subtractMonth}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="user" />
          </button>
          <span>{today.format('YYYY년 MM월')}</span>
          <button onClick={addMonth}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="user" />
          </button>
        </ControlContainer>

        <CalendarHead>
          {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
            <div key={el}>
              <span sunday={el === '일' ? true : false}>{el}</span>
            </div>
          ))}
        </CalendarHead>
        {calendarArr()}
      </CalendarContainer>
    </>
  );
};

const CalendarContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 100px;
  gap: 10px;
  margin: 10px 0px;
`;

const Day = styled.button`
  color: ${(props) => (props.isGrayed === 'true' ? 'gray' : 'black')};
  width: 90px;
  height: 70px;
  border-radius: 50px;
  div {
    font-size: 12px;
    margin-bottom: 40px;
    margin-right: 20px;
  }
  background-color: ${(props) => {
    switch (props.emotion) {
      case '행복':
        return '#fcc419';
      case '슬픔':
        return '#339af0';
      case '불안':
        return '#f06595';
      case '혐오':
        return '#adb5bd';
      case '분노':
        return '#ff6b6b';
      case '놀람':
        return '#ff922b';
      case '평범':
        return '#94d82d';
      default:
        return '#EFF0F2';
    }
  }};
`;

const CalendarHead = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 70px;
  margin: 10px;
  font-family: 'EliceDigitalBaeum';
  font-size: 20px;
  div {
    padding: 2px 2px;
  }
  span {
    color: ${(props) => (props.sunday === true ? 'red' : 'black')};
  }
`;

const ControlContainer = styled.div`
  font-size: 22px;
  font-family: 'InfinitySans-RegularA1';
  margin-bottom: 15px;
  button {
    font-size: 20px;
    margin: 0px 20px;
    color: pink;
  }
`;

export default Calendar;
