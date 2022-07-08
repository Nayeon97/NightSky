import * as React from 'react';
import Modal from '../../components/modal/Modal';
import styled from 'styled-components';
import Star from '../../components/star';

const emotion = [
  { value: '행복', info: '오늘 하루는 행복', id: 1 },
  { value: '슬픔', info: '오늘 하루는 슬픔', id: 2 },
  { value: '불안', info: '오늘 하루는 불안', id: 3 },
  { value: '분노', info: '오늘 하루는 분노', id: 4 },
  { value: '놀람', info: '오늘 하루는 놀람', id: 5 },
  { value: '평범', info: '오늘 하루는 평범', id: 6 },
];

const Alerts = ({ setOpen }) => {
  return (
    <Modal setOpen={setOpen}>
      <Title>밤하늘</Title>
      <EmotionContainer>
        {emotion.map((it) => (
          <InfoWrapper>
            <Star emotion={it.value} />
            <span>{it.info}</span>
          </InfoWrapper>
        ))}
      </EmotionContainer>
    </Modal>
  );
};

const EmotionContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const InfoWrapper = styled.div`
  span {
    font-size: 15px;
    font-family: 'KyoboHand';
    color: #343a40;
  }
`;

const Title = styled.div`
  margin-top: 50px;
  font-size: 20px;
  font-family: 'KyoboHand';
  color: #343a40;
  margin: 40px 250px;
  background-image: linear-gradient(transparent 20%, #fff3bf 20%);
`;

export default Alerts;
