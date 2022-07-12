import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Api from '../../api';
import TagBook from './TagBook';
import snackBar from '../../components/snackBar';
import SearchBar from '../../components/searchBar';

const TagList = () => {
  const [tagList, setTagList] = useState([]);
  const [searchTarget, setSearchTarget] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTagList();
  }, []);

  const getTagList = async () => {
    try {
      const res = await Api.get('book/list');
      setTagList(res.data);
      if (res.data.length === 0) {
        snackBar('info', '작성한 일기가 없습니다.');
      }
    } catch (err) {}
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (search.length === 0) {
        snackBar('info', '검색어를 입력해주세요.');
        setOpen(false);
      } else {
        getSearchResult();
      }
    }
  };

  const getSearchResult = async () => {
    const tag = tagList.filter((it) => it.name === search);
    if (tag == '') {
      snackBar('info', '키워드에 해당하는 태그가 없습니다.');
      setOpen(false);
    } else {
      setSearchTarget(tag);
      setOpen(true);
    }
  };

  return (
    <TagContainer>
      <div>
        <p>해당 태그의 일기 리스트는 책 태그를 클릭해주세요.</p>
        <SearchBar
          setSearch={setSearch}
          search={search}
          onKeyPress={onKeyPress}
          placeholder={'키워드를 입력해주세요.'}
        />
      </div>
      <TagListContainer>
        {(open ? searchTarget : tagList).map((it) => {
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
