import { useEffect, useState } from 'react';
import { ExplainContext } from '../../styles/CommonStyle';
import GetDayExplain from './GetDayExplain';
import getDay from '../../utils/getDay';

const Text = () => {
  const [day, setGetDay] = useState('');

  useEffect(() => {
    const day = new Date();
    setGetDay(GetDayExplain(getDay(day)));
  }, []);

  return (
    <ExplainContext>
      <span>오늘은 벌써 {day}이네요. </span>
      <br />
      혹시 오늘 하루는 너무 평범해서 쓸 일기가 없으신가요? <br />
      원래 일기는 소소한 것에서 시작한다고 생각해요. <br />
      <span>
        오늘 있었던 기분 좋은 일을 두 가지만 떠올려서 적어보시는 건 어떠신가요?{' '}
      </span>
      <br />
    </ExplainContext>
  );
};

export default Text;
