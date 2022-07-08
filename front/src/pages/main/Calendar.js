import React, { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import * as Api from '../../api';
import changeUtc from '../../utils/changeUtc';
import Alerts from './Alerts';
import Star from '../../components/star';

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
  const [open, setOpen] = useState(false);

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

  const clickOpen = () => {
    setOpen(true);
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

              return diary === 'ok' ? (
                <Star
                  key={i}
                  diary={diary}
                  disabled={disabled}
                  onClick={clickDiary}
                  emotion={emotion}
                  diaryId={diaryId}
                />
              ) : (
                <Day
                  disabled={disabled}
                  isGrayed={isGrayed}
                  isSelected={isSelected}
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
          <MoveBtn onClick={subtractMonth}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="user" />
          </MoveBtn>
          <span>{today.format('YYYY년 MM월')}</span>
          <MoveBtn onClick={addMonth}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="user" />
          </MoveBtn>
          <QBtn onClick={clickOpen}>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </QBtn>
        </ControlContainer>
        {open && <Alerts setOpen={setOpen} />}
        <CalendarHead>
          {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
            <HeadDiv key={el} day={el}>
              <span>{el}</span>
            </HeadDiv>
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
  align-self: start;
  align-items: center;
  flex-direction: column;
  margin-left: 100px;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 100px;
  gap: 10px;
  margin: 10px 0px;
`;

const Day = styled.button`
  font-size: 20px;
  color: ${(props) =>
    props.isGrayed === 'true'
      ? '#adb5bd'
      : props.isSelected === 'true'
      ? '#862e9c'
      : 'black'};
  width: 80px;
  height: 70px;
  border-radius: 50px;
  font-family: 'KyoboHand';
  background-color: transparent;
`;

const CalendarHead = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 70px;
  margin: 10px;
  font-family: 'KyoboHand';
  font-size: 20px;
  color: ${(props) => (props.key === '일' ? 'red' : 'black')};
  div {
    padding: 2px 2px;
  }
`;

const ControlContainer = styled.div`
  font-size: 22px;
  font-family: 'KyoboHand';
  margin-bottom: 15px;
`;

const HeadDiv = styled.div`
  color: ${(props) =>
    props.day === '일' ? '#ff6b6b' : props.day === '토' ? ' #339af0' : 'black'};
  background-image: linear-gradient(transparent 60%, #a5d8ff 40%);
`;

const MoveBtn = styled.button`
  color: #365885;
  font-size: 20px;
  margin: 0px 20px;
`;

const QBtn = styled.button`
  color: #868e96;
  font-size: 20px;
`;

export default Calendar;
