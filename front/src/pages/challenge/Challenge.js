import { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav';
import { MainContainer } from '../../styles/CommonStyle';
import ChallengeCard from './ChallengeCard';
import {
  TitleWrap,
  ChallengeBtn,
  ChallengeTitle,
} from '../../styles/ChallengeStyle';
import * as Api from '../../api';
import { useNavigate } from 'react-router-dom';
import ChallengeInfo from './ChallengeInfo';
import snackBar from '../../components/snackBar';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

const Challenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [openCompletedChallenge, setOpenCompletedChallenge] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length === 0) {
      snackBar('error', '로그인 후 사용해주세요');
      navigate('/login');
    } else {
      getChallenge();
    }
  }, [isLoaded]);

  useEffect(() => {
    getChallenge();
  }, [currentChallenge]);

  const getChallenge = async () => {
    try {
      const res = await Api.get('challenge');
      if (res.data === false) {
        snackBar('error', '로그인 후 사용해주세요');
        navigate('/login');
      } else {
        setChallengeList(res.data.challenge);
        setDisabled(res.data.log.isRunning === true ? true : false);

        if (res.data.log.isRunning === true) {
          const indexFalse = res.data.log.completed.indexOf(false);
          setCurrentChallenge(res.data.log.challenge[indexFalse]);
        }
        if (res.data.log.completed.indexOf(true) !== -1) {
          let idx = res.data.log.completed.indexOf(true);
          let indices = [];
          while (idx !== -1) {
            indices.push(res.data.log.challenge[idx]);
            idx = res.data.log.completed.indexOf(true, idx + 1);
          }

          let filterCompletedChallenge = res.data.challenge.filter(
            (acc, cur) => {
              return acc.name === indices[cur];
            },
            []
          );
          setCompletedChallenge(filterCompletedChallenge); // 성공한 챌린지 이름 저장
        }
      }
    } catch (err) {
      snackBar('error', err.response);
    }
  };

  const clickCompleteCard = () => {
    setOpenCompletedChallenge((prev) => !prev);
  };

  return (
    <>
      <Nav />
      <div style={{ marginTop: '5rem' }}>
        <MainContainer>
          <TitleWrap>
            <ChallengeTitle>🎯챌린지</ChallengeTitle>
            <ChallengeBtn onClick={clickCompleteCard}>
              진행한 챌린지
            </ChallengeBtn>
          </TitleWrap>
          {openCompletedChallenge ? (
            <ChallengeInfo completedChallenge={completedChallenge} />
          ) : (
            challengeList.map((it) => {
              let sucess = completedChallenge.map((c) =>
                c.name === it.name ? 'true' : 'false'
              );
              return (
                <ChallengeCard
                  it={it}
                  key={it.id}
                  disabled={disabled}
                  currentChallenge={currentChallenge}
                  completedChallenge={completedChallenge}
                  setIsLoaded={setIsLoaded}
                  setCurrentChallenge={setCurrentChallenge}
                  sucess={sucess}
                />
              );
            })
          )}
        </MainContainer>
      </div>
    </>
  );
};

export default Challenge;
