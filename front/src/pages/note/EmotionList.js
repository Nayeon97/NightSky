import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputLabel, FormControl, NativeSelect } from '@mui/material';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Api from '../../api';
import {
  EmotionCard,
  Title,
  DiaryDate,
  DateWrapper,
} from '../../styles/NoteStyle';
import { handleScroll } from '../../utils/handleScroll';
import styled from 'styled-components';
import snackBar from '../../components/snackBar';
import changeUtc from '../../utils/changeUtc';

const SEARCH = [
  { value: 'title', name: '⭐️ 제목', id: 1 },
  { value: 'tag', name: '🔖 태그 ', id: 2 },
  { value: 'text', name: '🗒 내용', id: 3 },
  { value: 'all', name: '📓 통합', id: 4 },
];

const EmotionList = () => {
  const navigate = useNavigate();
  const [diaryList, setDiaryList] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoaded, setIsLoaded] = useState(true); // Load 중인지 판별
  const [stop, setStop] = useState(false);
  const [select, setSelect] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isLoaded && !stop) {
      getList();
    }
  }, [isLoaded]);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      function (event) {
        const res = handleScroll(event);
        if (res === true) {
          setIsLoaded(true);
        }
      },
      false
    );
  }, []);

  const getList = async () => {
    if (isLoaded === true) {
      try {
        const res = await Api.get(`diary/list/?cursor=${cursor}`);
        if (diaryList.length !== 0 && diaryList[9].id === res.data[0].id) {
          return snackBar('warning', '잘못된 요청입니다.');
        }
        const length = res.data.length;
        const sliceData = res.data.slice(0, length - 1);
        setCursor(res.data.slice(-1)[0].cursor);
        setDiaryList((data) => [...data, ...sliceData]);
        setIsLoaded(false);
        if (length < 10) {
          setStop(true);
        }
      } catch (err) {
        snackBar('info', '작성한 일기가 없습니다. ');
      }
    }
  };

  const openCard = (e) => {
    const diaryId = e.currentTarget.value;
    navigate(`/diary/${diaryId}`, { state: diaryId });
  };

  const handleChange = (e) => {
    console.log('select');
    setSelect(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      clickSearch();
    }
  };

  const clickSearch = async () => {
    if (select.length !== 0) {
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
    } else {
    }
  };

  return (
    <>
      <SearchContainer>
        <FormControl>
          <InputLabel>선택</InputLabel>
          <NativeSelect onChange={handleChange}>
            <option value=""></option>
            {SEARCH.map((it) => {
              return (
                <option value={it.value} key={it.index}>
                  {it.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <SearchWrapper>
          <input
            type="text"
            placeholder="검색어 입력"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={onKeyPress}
          />
          <IconWrapper onClick={clickSearch}>
            <FontAwesomeIcon icon={faSearch} className="user" />
          </IconWrapper>
        </SearchWrapper>
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
    </>
  );
};

export default EmotionList;

const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 20px;
  input {
    display: inline-flex;
    width: 300px;
    height: 50px;
    color: black;
    background: white;
    padding: 0px 30px;
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 1rem;
    cursor: text;
    &:focus::-webkit-input-placeholder {
      color: #748ffc;
    }
  }
`;

const IconWrapper = styled.div`
  color: #808080;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 10px;
  left: 10px;
  width: 10px;
  cursor: pointer;
`;

const EmotionCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`;
