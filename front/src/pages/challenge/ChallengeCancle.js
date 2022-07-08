import Modal from '../../components/modal/Modal';
import styled from 'styled-components';
import Btn from '../../components/Btn';
import snackBar from '../../components/snackBar';
import * as Api from '../../api';

const ChallengeCancle = ({ setModalOpen, setCurrentChallenge, id }) => {
  const clickCancle = async () => {
    try {
      await Api.get(`challenge/stop/${id}`);
      setCurrentChallenge('');
      setModalOpen(false);
    } catch (err) {
      snackBar('error', '다시 시도해주세요.');
    }
  };

  return (
    <Modal setOpen={setModalOpen}>
      <TextContainer>
        <p>포기하시겠어요..?🥲</p>
        <Btn text={'포기'} onClick={clickCancle} />
      </TextContainer>
    </Modal>
  );
};

export default ChallengeCancle;

const TextContainer = styled.div`
  margin-top: 50px;
  p {
    font-family: 'EliceDigitalBaeum';
    font-size: 20px;
    margin-bottom: 10px;
    color: #228be6;
  }
`;
