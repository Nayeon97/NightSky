import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activityState,
  countEmotionState,
  emotionState,
  fortuneState,
  openEmotionState,
} from '../../atoms';
import ActivityInfo from './ActivityInfo';
import * as Api from '../../api';

const MainEmotionInfo = () => {
  const emotion = useRecoilValue(emotionState);
  const [emotionColor, setEmotionColor] = useRecoilState(openEmotionState);
  const [getFortune, setGetFortune] = useRecoilState(fortuneState);
  const [getActivity, setGetActivity] = useRecoilState(activityState);
  const [openEmotion, setOpenEmotion] = useState(false);
  const [countEmotion, setCountEmotion] = useRecoilState(countEmotionState);

  useEffect(() => {}, []);

  const clickBell = async () => {
    console.log(emotion.length);
    if (getActivity.length === 0) {
      const res = await Api.post('confirmed/submit', {
        emotion,
      });
      const fortune = await Api.get('confirmed/fortune');
      setGetFortune(fortune.data);
      setGetActivity(res.data);
      setCountEmotion(0);
      setOpenEmotion(true);
      setEmotionColor(false);
    } else {
      setOpenEmotion(true);
    }
  };

  return (
    <>
      <MoveBtn
        onClick={clickBell}
        disabled={emotion.length === 0}
        emotionColor={emotionColor}
        countEmotion={countEmotion}
      >
        <Badge badgeContent={countEmotion} color="primary">
          <FontAwesomeIcon icon={faEnvelope} className="user" />
        </Badge>
      </MoveBtn>
      {openEmotion && (
        <ActivityInfo
          setEmotion={setOpenEmotion}
          getFortune={getFortune}
          getActivity={getActivity}
          emotion={emotion}
        />
      )}
    </>
  );
};

export default MainEmotionInfo;

const MoveBtn = styled.button`
  color: ${(props) =>
    props.countEmotion === 0
      ? '#adb5bd'
      : props.countEmotion === 1
      ? '#ffd43b'
      : '#91a7ff'};
  font-size: 25px;
  margin-top: 20px;
`;
