import { useEffect, useState } from 'react';
import images from '../../assets/images';
import {
  CardsContainer,
  CardTitle,
  CardWrapper,
  ExplainContext,
  TargetImg,
} from '../../styles/ChallengeStyle';
import styled from 'styled-components';

const ChallengeInfo = ({ completedChallenge }) => {
  return (
    <>
      {completedChallenge.length === 0 ? (
        <CompletedWrapper>아직 완료한 챌린지가 없어요...💦</CompletedWrapper>
      ) : (
        completedChallenge.map((it) => (
          <CardsContainer>
            <CardWrapper>
              <TargetImg src={images.Calendar} alt="Calendar" />
              <div>
                <CardTitle lock={false}>{it.name}</CardTitle>
              </div>
            </CardWrapper>
            <ExplainContext lock={false}>
              <h1>{it.description}</h1>
              {it.descriptionOne} <br />
              {it.descriptionTwo}
              <br />
            </ExplainContext>
          </CardsContainer>
        ))
      )}
    </>
  );
};

export default ChallengeInfo;

const CompletedWrapper = styled.div`
  color: #228be6;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  font-family: 'EliceDigitalBaeum';
  font-size: 20px;
  margin-top: 100px;
`;
