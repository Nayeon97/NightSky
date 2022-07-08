import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal/Modal';
import * as Api from '../../api';
import snackBar from '../../components/snackBar';

const TagEditCover = (props) => {
  const { setBookColor, setOpenEditCover } = props;
  const [openPalette, setOpenPalette] = useState(false);
  const [rewardColor, setRewardColor] = useState([]);

  useEffect(() => {
    clickPalette();
  }, []);

  const clickPalette = async () => {
    try {
      const res = await Api.get('reward/user');
      setRewardColor(res.data);
      setOpenPalette(true);
    } catch (err) {
      snackBar('error', '다시 시도해주세요');
    }
  };

  const selectColor = (color) => {
    setBookColor(color);
    setOpenEditCover(false);
  };

  return (
    <Modal setOpen={setOpenEditCover}>
      <ColorContainer>
        {rewardColor.length === 0 ? (
          <TextWrapper>아직 사용할 수 있는 색상이 없습니다.🎨</TextWrapper>
        ) : (
          rewardColor.map((it) => (
            <ColorWrapper onClick={() => selectColor(it)} color={it} />
          ))
        )}
      </ColorContainer>
    </Modal>
  );
};

const ColorWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const ColorContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 50px;
`;

const TextWrapper = styled.div`
  width: 500px;
  margin-left: 40px;
  font-family: 'EliceDigitalBaeum';
  color: #228be6;
`;

export default TagEditCover;
