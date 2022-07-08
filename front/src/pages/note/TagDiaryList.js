import Modal from '../../components/modal/Modal';
import { DiaryDate, DateWrapper } from '../../styles/NoteStyle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TagDiaryList = (props) => {
  const navigate = useNavigate();
  const { setOpenTagList, tagList } = props;

  const openCard = (e) => {
    const diaryId = e.currentTarget.name;
    navigate(`/diary/${diaryId}`, { state: diaryId });
  };

  return (
    <Modal setOpen={setOpenTagList}>
      <EmotionContainer>
        {tagList.map((it, index) => (
          <EmotionCard
            onClick={openCard}
            key={index}
            emotion={it.emotion}
            name={it.id}
          >
            <Title>{it.title}</Title>
            <DateWrapper>
              <DiaryDate>{it.date.slice(0, 10)}</DiaryDate>
            </DateWrapper>
          </EmotionCard>
        ))}
      </EmotionContainer>
    </Modal>
  );
};

export default TagDiaryList;

const EmotionContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  place-items: center;
  overflow-x: auto;
  overflow-y: scroll;
  height: 500px;
  width: 100%;
`;

const EmotionCard = styled.button`
  height: 70px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 20px;
  margin-bottom: 20px;
  span {
    font-family: 'InfinitySans-RegularA1';
  }
  border: 7px solid;
  border-color: ${(props) => {
    switch (props.emotion) {
      case '행복':
        return '#FFEC99';
      case '슬픔':
        return '#A5D8FF';
      case '불안':
        return '#FFD6A5';
      case '분노':
        return '#FFADAD';
      case '놀람':
        return '#BDB2FF';
      case '평범':
        return '#D8F5A2';
      default:
        return 'white';
    }
  }};
`;

const Title = styled.div`
  font-family: 'EliceDigitalBaeum';
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 70px;
  background-color: #f1f3f5;
  white-space: nowrap;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;
