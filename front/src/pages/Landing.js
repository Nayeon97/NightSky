import React, { useEffect, useState } from 'react';
import * as style from '../styles/LandingStyle';
import LandingNav from '../components/nav/LandingNav';
import MainFooter from '../components/footer';
import DiaryGraph from '../components/graph/diaryGraph';
import SocialGraph from '../components/graph/socialGraph';
import Btn from '../components/Btn';
import images from '../assets/images';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Penciltext = `하루끝의 일기를 작성해보세요.`;
const Emotiontext = `오늘의 감정을 확인해보세요.`;
const Sporttext = `나에게 맞는 활동을 추천받으세요.`;
const socialText = `일기는 일기장에만?
언제 어디서나 밤하늘에 접속하세요.
33%의 사람들이 웹서비스를 이용해
일기를 작성하고 있습니다.
여러분도 동참해보세요!`;

const snsText = `SNS에 피로감을 느끼시나요?
여러분만 그런 게 아닙니다.
시간이 흐르면 흐를수록
SNS에 피로감을 느끼는 MZ세대가 
증가하는 추세입니다.`;
const quotation = `"당신의 내일을 밤하늘이 응원합니다."

-엘리스 12팀 일동-`;
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <style.MainContainer>
        <LandingNav />
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.StarFalling></style.StarFalling>
        <style.LogoContainer>
          <style.Title>밤 하 늘</style.Title>
          <style.MoonIcon />
          <img
            src={images.Title}
            style={{ marginTop: '350px', position: 'absolute', left: '-90px' }}
            alt="logo"
          />
        </style.LogoContainer>
        <style.WhyWe>서비스 밤하늘</style.WhyWe>
        <style.PencilIcon />
        <style.PencilText>{Penciltext}</style.PencilText>
        <style.SportIcon />
        <style.SportText>{Sporttext}</style.SportText>
        <style.HeartIcon />
        <style.EmotionText>{Emotiontext}</style.EmotionText>
        <style.JustifyContainer>
          <style.HeartEmotion HeartColor="#FFEC99" Top="40px" Left="70px" />
          <style.HeartText Top="60px" Left="-200px">
            행복
          </style.HeartText>
          <style.HeartText Top="131px" Left="-200px">
            슬픔
          </style.HeartText>
          <style.HeartText Top="80px" Left="310px">
            불안
          </style.HeartText>
          <style.HeartEmotion HeartColor="#A5D8FF" Top="160px" Left="70px" />
          <style.HeartText Top="-89px" Left="50px">
            평범
          </style.HeartText>
          <style.HeartEmotion HeartColor="#FFD6A5" Top="160px" Left="550px" />
          <style.HeartText Top="-139px" Left="310px">
            분노
          </style.HeartText>
          <style.HeartEmotion HeartColor="#D8F5A2" Top="40px" Left="310px" />
          <style.HeartText Top="-71px" Left="50px">
            놀람
          </style.HeartText>
          <style.HeartEmotion HeartColor="#FFADAD" Top="40px" Left="550px" />
          <style.HeartEmotion HeartColor="#BDB2FF" Top="160px" Left="310px" />
        </style.JustifyContainer>
        <style.ButtonDiv>
          <Btn
            text={'일기 쓰기 바로가기'}
            onClick={() => {
              navigate('/login');
            }}
          />
        </style.ButtonDiv>
        <style.SocietyProblem>왜 밤하늘일까?</style.SocietyProblem>
        <style.GraphContainer>
          <DiaryGraph />
          <style.REmotionText>{socialText}</style.REmotionText>
          <SocialGraph /> <style.RSocialText>{snsText}</style.RSocialText>
        </style.GraphContainer>
        <style.ButtonDiv>
          <Btn
            text={'밤하늘 서비스 바로가기'}
            onClick={() => {
              navigate('/login');
            }}
          />
        </style.ButtonDiv>
        <style.Quotation>{quotation}</style.Quotation>
      </style.MainContainer>
      <MainFooter />
    </>
  );
};

export default Landing;
