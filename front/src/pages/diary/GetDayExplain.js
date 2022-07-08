const GetDayExplain = (props) => {
  let answer = '';
  switch (props) {
    case '월':
      answer = '일주일의 시작 월요일';
      break;
    case '화':
      answer = '화요일';
      break;
    case '수':
      answer = '수요일';
      break;
    case '목':
      answer = '목요일';
      break;
    case '금':
      answer = '드디어 평일의 마지막 금요일';
      break;
    case '토':
      answer = '주말의 시작 토요일';
      break;
    case '일':
      answer = '주말의 끝 일요일 ';
      break;
    default:
  }
  return answer;
};

export default GetDayExplain;
