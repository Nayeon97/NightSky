import React, { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import styled from 'styled-components';

const DiaryModal = () => {
  const navigate = useNavigate();

  const clickModal = () => {
    navigate(`/usermain`);
  };

  return (
    <Modal>
      <TextContainer>
        <p>메인 페이지에서 메시지를 확인해주세요.😊</p>
        <Btn text={'확인'} onClick={clickModal} />
      </TextContainer>
    </Modal>
  );
};

export default DiaryModal;

const TextContainer = styled.div`
  margin-top: 50px;
  p {
    font-family: 'EliceDigitalBaeum';
    font-size: 20px;
    margin-bottom: 10px;
    color: #228be6;
  }
`;
