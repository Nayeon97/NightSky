import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Api from '../../api';
import TagBook from './TagBook';
import snackBar from '../../components/snackBar';

const TagList = () => {
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    getTagList();
  }, []);

  const getTagList = async () => {
    try {
      const res = await Api.get('book/list');
      setTagList(res.data);
    } catch (err) {}
  };

  return (
    <TagContainer>
      <p>해당 태그의 일기 리스트는 책 태그를 클릭해주세요.</p>
      <TagListContainer>
        {tagList.map((it) => {
          if (it.name.length !== 0) {
            return <TagBook it={it} key={it.id} />;
          }
        })}
      </TagListContainer>
    </TagContainer>
  );
};

const TagListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  cursor: pointer;
`;

const TagContainer = styled.div`
  color: gray;
`;

export default TagList;
