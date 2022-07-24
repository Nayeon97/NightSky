import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import {
  EmotionCard,
  Title,
  DiaryDate,
  DateWrapper,
} from '../../styles/NoteStyle';
import styled from 'styled-components';
import snackBar from '../../components/snackBar';
import changeUtc from '../../utils/changeUtc';
import SearchBar from '../../components/searchBar';

const SEARCH = [
  { value: 'all', name: ' 전체', id: 1 },
  { value: 'tag', name: '태그 ', id: 2 },
  { value: 'text', name: '내용', id: 3 },
  { value: 'title', name: '제목', id: 4 },
];

const EmotionList = () => {
  const navigate = useNavigate();
  const [diaryList, setDiaryList] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);
  const [select, setSelect] = useState('');
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState(null); // target

  //  확인...
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(getList, {
        threshold: 0.7,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const getList = async ([entry]) => {
    if (entry.isIntersecting && !stop) {
      try {
        setLoading(true);
        const res = await Api.get(`diary/list/?cursor=${cursor}`);
        if (res.data.length === 0) {
          setStop(true);
          setLoading(false);
        } else {
          const length = res.data.length;
          const sliceData = res.data.slice(0, length - 1);
          setCursor(res.data.slice(-1)[0].cursor);
          setDiaryList((data) => [...data, ...sliceData]);
          setLoading(false);
        }
      } catch (err) {
        snackBar('info', '더 이상 작성한 일기가 없습니다. ');
      }
    }
  };

  const openCard = (e) => {
    const diaryId = e.currentTarget.value;
    navigate(`/diary/${diaryId}`, { state: diaryId });
  };

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (select.length === 0 || search.length === 0) {
        snackBar('info', '검색어를  선택/입력 해주세요.');
      } else {
        getSearchResult();
      }
    }
  };

  const getSearchResult = async () => {
    try {
      const res = await Api.get(`diary/search/?${select}=${search}`);
      if (res.data.length === 0) {
        snackBar('warning', '검색 키워드와 일치하는 결과가 없습니다.');
      } else {
        setDiaryList(res.data);
      }
    } catch (err) {
      snackBar('error', '에러가 발생하였습니다.');
    }
  };

  return (
    <>
      <SearchContainer>
        <SelectBar onChange={handleChange}>
          <option value="">선택</option>
          {SEARCH.map((it) => {
            return (
              <option value={it.value} key={it.index}>
                {it.name}
              </option>
            );
          })}
        </SelectBar>
        <SearchBar
          setSearch={setSearch}
          search={search}
          onKeyPress={onKeyPress}
        />
      </SearchContainer>
      <EmotionCardContainer>
        {diaryList.map((it) => {
          let date = changeUtc(it.date).viewDate;
          return (
            <EmotionCard
              onClick={openCard}
              key={it.id}
              emotion={it.emotion}
              value={it.id}
            >
              <Title>{it.title}</Title>
              <DateWrapper>
                <DiaryDate>{date}</DiaryDate>
              </DateWrapper>
            </EmotionCard>
          );
        })}
      </EmotionCardContainer>
      {isLoading ? <div>loading</div> : stop ? '' : <div ref={setTarget}></div>}
    </>
  );
};

export default EmotionList;

const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

const EmotionCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`;

const SelectBar = styled.select`
  width: 100px;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: transparent;
  font-size: 15px;
  outline: none !important;
`;
