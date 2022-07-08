import React from 'react';
import { TextInput } from '../../styles/CommonStyle';
import { useState } from 'react';
import { WaringText } from '../../styles/DiaryStyle';

const Title = (props) => {
  const { title, setTitle } = props;
  const [open, setOpen] = useState(false);

  const checkInputTitle = (event) => {
    if (event.target.value.length > 21) {
      setOpen(true);
    } else {
      setTitle(event.target.value);
      setOpen(false);
    }
  };

  return (
    <>
      <TextInput
        type="text"
        size={2}
        onChange={checkInputTitle}
        placeholder="제목을 입력해주세요"
        value={title}
      />
      {open && <WaringText>제목은 20자 제한이에요 ㅠ-ㅠ </WaringText>}
    </>
  );
};

export default Title;
