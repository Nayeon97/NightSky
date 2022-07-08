import React, { useEffect } from 'react';
import Nav from '../../components/nav/Nav';
import styled from 'styled-components';
import Calendar from './Calendar';
import MainDiaryList from './MainDiaryList';
import { useNavigate } from 'react-router-dom';
import MainIChallengeInfo from './MainIChallengeInfo';
import * as Api from '../../api';
import { userState, challengeState } from '../../atoms';
import { useSetRecoilState } from 'recoil';
import MainUserInfo from './MainUserInfo';
import MainEmotionInfo from './MainEmotionInfo';
import snackBar from '../../components/snackBar';

const UserMain = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const setChallengeState = useSetRecoilState(challengeState);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await Api.get('user/info');
      setUserState(res.data);
      setChallengeState(res.data.user_challenge);
    } catch (err) {
      snackBar('error', '로그인 후 서비스 이용 가능합니다.');
      navigate('/login');
    }
  };

  return (
    <>
      <Nav />
      <UserMainContainer>
        <ContentsContainer>
          <MainEmotionInfo />
          <MainUserInfo />
          <MainIChallengeInfo />
          <MainDiaryList />
        </ContentsContainer>
        <Calendar />
      </UserMainContainer>
    </>
  );
};

export default UserMain;

const UserMainContainer = styled.div`
  position: relative;
  margin-top: 90px;
  display: grid;
  grid-template-columns: 400px 2fr;
  place-items: center;
`;

const ContentsContainer = styled.div`
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 460px;
  width: 400px;
`;
