import { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav';
import EmotionList from './EmotionList';
import TagList from './TagList';
import {
  BoardContainer,
  EmotionBtn,
  TagBtn,
  BtnContainer,
} from '../../styles/NoteStyle';
import snackBar from '../../components/snackBar';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

const Note = () => {
  const navigate = useNavigate();
  const [tagOpen, setTagOpen] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.length === 0) {
      snackBar('error', '로그인 후 사용해주세요.');
      navigate('/login');
    }
  }, []);

  const clickEmotion = () => {
    setTagOpen(false);
  };

  const clickTag = () => {
    setTagOpen(true);
  };

  return (
    <>
      <Nav />
      <BtnContainer>
        <EmotionBtn onClick={clickEmotion} state={tagOpen}>
          전체글
        </EmotionBtn>
        <TagBtn onClick={clickTag} state={tagOpen}>
          태그
        </TagBtn>
      </BtnContainer>
      <BoardContainer>{tagOpen ? <TagList /> : <EmotionList />}</BoardContainer>
    </>
  );
};

export default Note;
