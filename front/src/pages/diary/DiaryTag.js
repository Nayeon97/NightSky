import React, { useState } from 'react';
import { TagBox, TagItem, TagInput } from '../../styles/TagStyle';
import { WaringText } from '../../styles/DiaryStyle';

const Tag = (props) => {
  const [tagItem, setTagItem] = useState('');
  const { inputTag, setInputTag } = props;
  const [warningOpen, setWarningOpen] = useState(false);

  const checkTagLength = (event) => {
    if (event.target.value.length > 5) {
      setWarningOpen(true);
    } else {
      setWarningOpen(false);
      setTagItem(event.target.value);
    }
  };

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      addTagItem();
    }
  };

  const addTagItem = (e) => {
    setInputTag(tagItem);
    setTagItem('');
  };

  const deleteTagItem = (e) => {
    setInputTag('');
  };

  return (
    <>
      <TagBox>
        {inputTag && (
          <TagItem onClick={deleteTagItem}>
            <span>{inputTag}</span>
          </TagItem>
        )}
        <TagInput
          type="text"
          placeholder={
            inputTag
              ? '태그는 한개만 작성 가능합니다. ㅠㅡㅠ'
              : '태그를 작성해주세요😊'
          }
          tabIndex={2}
          onChange={checkTagLength}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
      </TagBox>
      {warningOpen && <WaringText>태그는 5자 제한이에요 ㅠ-ㅠ </WaringText>}
    </>
  );
};

export default Tag;
