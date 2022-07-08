import Modal from '../../components/modal/Modal';
import styled from 'styled-components';

const ActivityInfo = (props) => {
  const { setEmotion, getActivity, getFortune } = props;

  return (
    <Modal setOpen={setEmotion}>
      <ActivityContainer>
        오늘의 감정에 맞는 음악과 활동 추천드려요..!
        <br />
        🎵 추천 음악 :{' '}
        <span>
          {' '}
          {getActivity.music[0].title} - {getActivity.music[0].artist}
        </span>{' '}
        <br />
        🔥 추천 활동 : <span> {getActivity.activity[0].title}</span> <br />
        ✒️ <span>{getFortune[0].text}</span>
      </ActivityContainer>
    </Modal>
  );
};

export default ActivityInfo;

const ActivityContainer = styled.div`
  margin-top: 30px;
  margin-left: 5px;
  padding: 10px 40px;
  width: 500px;
  font-family: 'EliceDigitalBaeum';
  font-size: 18px;
  text-align: left;
  line-height: 25px;
  span {
    background-image: linear-gradient(transparent 20%, #d0ebff 20%);
    white-space: pre-line;
  }
`;
