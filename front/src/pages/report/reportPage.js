import { useState, useEffect } from 'react';
import * as style from '../../styles/ReportStyle';
import EmotionGraph from '../../components/graph/emotionGraph';
import TimeGraph from '../../components/graph/timeGraph';
import Nav from '../../components/nav/Nav';
import TagRanking from '../../components/graph/allTagCount';
import { Background } from '../../styles/ModalStyle';
import { ClassicSpinner } from 'react-spinners-kit';
import * as Api from '../../api';
import snackBar from '../../components/snackBar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

export const emotionText = (e) => {
  switch (e) {
    case 'happy':
      return '행복';
    case 'sad':
      return '슬픔';
    case 'normal':
      return '평범';
    case 'angry':
      return '분노';
    case 'scunner':
      return '혐오';
    case 'surprised':
      return '놀람';
    case 'unrest':
      return '불안';
    default:
      return '';
  }
};

const Report = () => {
  const [diaryEmotion, setDiaryEmotion] = useState({});
  const [diaryTime, setdiaryTime] = useState({});
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const navigate = useNavigate();
  const [getEmotion, setGetEmotion] = useState('');
  const user = useRecoilValue(userState);
  const today = moment();

  useEffect(() => {
    if (user.length === 0) {
      snackBar('error', '로그인 후 사용해주세요.');
      navigate('/login');
    } else {
      allFunction();
    }
  }, []);

  const allFunction = async () => {
    try {
      const data = await Api.get('report');

      setDiaryEmotion(() => data.data.emotion);
      setdiaryTime(() => data.data.time);
      setTags(() => data.data.userTag);
      setAllTags(() => data.data.allTag);
      setChallenge(() => data.data.challenge);
      let arr = Object.entries(data.data.emotion);
      let sort = arr.sort((a, b) => b[1] - a[1]);
      setGetEmotion(sort);
    } catch (err) {
      snackBar('error', '에러가 발생하였습니다. ');
      navigate('/login');
    }
  };

  if (allTags.length === 0) {
    return (
      <Background>
        <ClassicSpinner size={100} color="pink" />
      </Background>
    );
  }

  let reportDate = today.format('MM 월 DD 일');

  let DiaryText = `
${emotionText(getEmotion[0][0])} 감정 일기 작성은 ${getEmotion[0][1]}개
${emotionText(getEmotion[1][0])} 감정 일기 작성은 ${getEmotion[1][1]}개
${emotionText(getEmotion[2][0])} 감정 일기 작성은 ${getEmotion[2][1]}개
한달동안 작성해 주신 일기에서 
가장 많이 나타난 감정은 ${emotionText(getEmotion[0][0])}입니다.
  `;

  let TimeText = ` 
  이번 달에는 총 ${
    diaryTime.morning + diaryTime.dawn + diaryTime.night + diaryTime.afternoon
  }개의 일기 중
  ${diaryTime.morning}개를 아침에,  
  ${diaryTime.afternoon}개를 점심에
  ${diaryTime.night}개를 저녁에,  
  ${diaryTime.dawn}개를 새벽에 
  작성하셨네요, 훌륭합니다!
  `;

  let ChallengeText = challenge.challenge.map((it, index) => {
    let name = it;
    let state = challenge.completed[index]
      ? '완료하였습니다.'
      : '진행 중 입니다.';
    return (
      <p>
        🎯 {name}를 {state}
      </p>
    );
  });

  return (
    <>
      <Nav />
      <style.BackGroundContainer>
        <style.MainContainers>
          <DateWrapper>
            📅 {reportDate}을 기준으로 한 달 동안 작성한 일기 통계입니다.{' '}
          </DateWrapper>
          <style.RTitleWrap>
            <style.ReportTitle>🏁 한달 리포트 🏁</style.ReportTitle>
          </style.RTitleWrap>
          <style.DescTitle>
            이번 달에는 어떤 감정을 많이 느꼈을까요?
          </style.DescTitle>
          <style.ReportContainer>
            <EmotionGraph data={diaryEmotion} />
            <style.RDiaryText>{DiaryText}</style.RDiaryText>
          </style.ReportContainer>
          <style.DescTitle>
            이번 달에 내가 가장 많이 쓴 태그는 무엇일까요?
          </style.DescTitle>
          <style.ReportContainer>
            <TagRanking data={tags} />
          </style.ReportContainer>
          <style.DescTitle>
            이번 달은 어느 시간대에 일기를 작성했을까요?
          </style.DescTitle>
          <style.ReportContainer>
            <TimeGraph data={diaryTime} />
            <style.RTimeText>{TimeText}</style.RTimeText>
          </style.ReportContainer>
          <style.DescTitle>
            이번 달에 전체 사용자가 가장 많이 쓴 태그는 무엇일까요?
          </style.DescTitle>
          <style.ReportContainer>
            <TagRanking data={allTags} />
          </style.ReportContainer>
          <style.DescTitle>현재까지의 도전과제 진행상황입니다.</style.DescTitle>
          <style.ChallengeContainer>
            {challenge.challenge.length === 0 ? (
              <p>도전 / 완료한 챌린지가 없습니다. 🥲</p>
            ) : (
              <p>{ChallengeText}</p>
            )}
          </style.ChallengeContainer>
          <style.Quotation>당신의 내일을 응원합니다</style.Quotation>
          <style.Quotation>-밤하늘-</style.Quotation>
        </style.MainContainers>
      </style.BackGroundContainer>
    </>
  );
};
export default Report;

const DateWrapper = styled.div`
  margin-top: 20px;
  color: #228be6;
`;
