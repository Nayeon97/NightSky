import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { challengeState } from '../../atoms';
import changeUtc from '../../utils/changeUtc';

const MainIChallengeInfo = () => {
  const challenge = useRecoilValue(challengeState);
  const [open, setOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState({
    id: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (challenge.length === 0) {
      setOpen(false);
    } else {
      const challengeName =
        challenge[0].challenge_id === 4 ? '5일 매일쓰기' : '50일 매일쓰기';
      setCurrentChallenge({
        id: challengeName,
        start_date: changeUtc(challenge[0].start_date).viewDate,
        end_date: changeUtc(challenge[0].end_date).viewDate,
      });
      setOpen(true);
    }
  }, [challenge]);

  return (
    <ChallengeContainer>
      🎯 챌린지
      <InfoContainer>
        <SubContext>
          {open ? (
            <div>
              현재 <span>{currentChallenge.id} 챌린지</span> 를 진행 중입니다.{' '}
              <br />
              <DayWrapper>
                시작일 {currentChallenge.start_date} - 종료일{' '}
                {currentChallenge.end_date}
              </DayWrapper>
            </div>
          ) : (
            '현재 진행 중인 챌린지는 없습니다.'
          )}
        </SubContext>
      </InfoContainer>
    </ChallengeContainer>
  );
};

export default MainIChallengeInfo;

const SubContext = styled.div`
  font-size: 18px;
  line-height: 25px;
  margin-top: 10px;
  padding: 20px 20px;
  span {
    background-image: linear-gradient(transparent 60%, pink 40%);
  }
`;

const InfoContainer = styled.div`
  font-family: 'EliceDigitalBaeum';
  background-color: white;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const DayWrapper = styled.div`
  font-family: 'EliceDigitalBaeum';
  font-size: 15px;
  color: #868e96;
`;

const ChallengeContainer = styled.div`
  font-family: 'EliceDigitalBaeum';
  font-size: 20px;
`;
