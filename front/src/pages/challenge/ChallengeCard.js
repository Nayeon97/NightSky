import { useEffect, useState } from 'react';
import images from '../../assets/images';
import {
  CardsContainer,
  CardTitle,
  CardWrapper,
  ExplainContext,
  TargetImg,
  StartBtn,
} from '../../styles/ChallengeStyle';
import * as Api from '../../api';
import snackBar from '../../components/snackBar';
import ChallengeCancle from './ChallengeCancle';
import styled from 'styled-components';

const ChallengeCard = ({
  it,
  disabled,
  currentChallenge,
  setIsLoaded,
  setCurrentChallenge,
  sucess,
}) => {
  const { name, id, description, descriptionOne, descriptionTwo } = it;
  const lock = false;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, []);

  const clickStart = async (e) => {
    try {
      await Api.get(`challenge/start/${e.target.id}`);
      setIsLoaded((prev) => !prev);
    } catch (err) {
      snackBar('error', '다시 시도해주세요.');
    }
  };

  const clickStop = async (e) => {
    setModalOpen(true);
  };

  return (
    <CardsContainer>
      {lock ? (
        <>
          <CardWrapper>
            <div>
              <CardTitle lock={true}>🚧 공개 예정 🚧</CardTitle>
            </div>
          </CardWrapper>
          <ExplainContext lock={true}>
            <h1>👷🏻‍♂️현재 준비 중인 챌린지 입니다.</h1>
            <div style={{ marginTop: '35px' }}></div>
          </ExplainContext>
        </>
      ) : (
        <>
          <CardWrapper>
            <TargetImg src={images.Calendar} alt="Calendar" />
            <div>
              <CardTitle lock={false}>{name}</CardTitle>
            </div>
          </CardWrapper>
          <ExplainContext lock={false}>
            <h1>{description}</h1>
            {descriptionOne} <br />
            {descriptionTwo}
            <br />
            <div style={{ marginTop: '35px' }}>
              {sucess == 'true' ? (
                <CompletedWrapper>
                  이미 완료한 챌린지 입니다.👍
                </CompletedWrapper>
              ) : name === currentChallenge ? (
                <StartBtn onClick={clickStop} id={id}>
                  포기할래요🥲
                </StartBtn>
              ) : (
                <StartBtn onClick={clickStart} id={id} disabled={disabled}>
                  {disabled ? '도전 중인 챌린지가 있어요.' : '도전하기🏁'}
                </StartBtn>
              )}
            </div>
          </ExplainContext>
        </>
      )}
      {modalOpen && (
        <ChallengeCancle
          id={id}
          setCurrentChallenge={setCurrentChallenge}
          setModalOpen={setModalOpen}
        />
      )}
    </CardsContainer>
  );
};

export default ChallengeCard;

const CompletedWrapper = styled.div`
  height: 50px;
  width: 300px;
  color: #228be6;
  background-color: #e9ecef;
  text-align: center;
  line-height: 50px;
  border-radius: 10px;
  font-family: 'EliceDigitalBaeum';
`;
