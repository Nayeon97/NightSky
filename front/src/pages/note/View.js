import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/nav/Nav';
import * as Api from '../../api';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import {
  ViewContainer,
  TiteWrapper,
  TagWrapper,
  ContentWrapper,
  DiaryTag,
  DiaryTitle,
  IconWrapper,
} from '../../styles/NoteStyle';
import styled from 'styled-components';
import snackBar from '../../components/snackBar';
import changeUtc from '../../utils/changeUtc';
import { ClassicSpinner } from 'react-spinners-kit';
import { Background } from '../../styles/ModalStyle';

const View = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [diary, setDiary] = useState({});
  const viewerRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDiary();
  }, []);

  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(diary.text);
  }, [diary]);

  useEffect(() => {}, [diary]);

  const getDiary = async () => {
    try {
      const res = await Api.get(`diary/${state}`);
      setDiary(res.data);
    } catch (err) {
      snackBar('error', '일기 로딩을 실패하였습니다.');
    }
  };

  const clickPdf = async (e) => {
    snackBar('info', '잠시만 기다려주세요...');
    try {
      const res = await Api.getPdf(`pdf/${diary.id}`);
      const blob = new Blob([res.data]);
      const fileObjectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileObjectUrl;
      link.style.display = 'none';
      link.download = '밤하늘.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (err) {
      alert('pdf 다운로드에 실패하였습니다. ');
    }
  };

  let date = changeUtc(diary.date).viewDate;

  return (
    <>
      <Nav />
      <ViewContainer>
        <EmotionWrapper>
          <span>{date}</span> 에 작성하신 일기의 감정은{' '}
          <span>{diary.emotion} </span>이네요.
        </EmotionWrapper>
        <IconWrapper onClick={clickPdf}>
          <FontAwesomeIcon icon={faFilePdf} className="user" />
          pdf로 다운로드하기
        </IconWrapper>
        <TiteWrapper>
          <DiaryTitle>{diary.title}</DiaryTitle>
        </TiteWrapper>
        <TagWrapper>
          <DiaryTag>{diary.tag ? `#${diary.tag}` : ''}</DiaryTag>
        </TagWrapper>
        <ContentWrapper>
          <Viewer ref={viewerRef} />
        </ContentWrapper>
      </ViewContainer>
      {loading && (
        <Background>
          <ClassicSpinner size={100} color="pink" />
        </Background>
      )}
    </>
  );
};

export default View;

const EmotionWrapper = styled.div`
  color: #868e96;
  span {
    background-image: linear-gradient(transparent 60%, #a5d8ff 40%);
  }
`;
