import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import Btn from '../../components/Btn';
import axios from 'axios';
import { Background } from '../../styles/ModalStyle';
import { ClassicSpinner } from 'react-spinners-kit';
import DiaryModal from './DiaryModal';
import * as Api from '../../api';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { emotionState, countEmotionState } from '../../atoms';
import snackBar from '../../components/snackBar';

const DiaryEditor = (props) => {
  const editorRef = useRef();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const setEmotion = useSetRecoilState(emotionState);
  const [countEmotion, setCountEmotion] = useRecoilState(countEmotionState);
  const { title, tag } = props;

  const uploadImage = async (blob) => {
    const name = blob.name;
    const imgName = name.replace(/(\s*)/g, '');
    const res = await Api.get(`upload/${imgName}`);

    await axios({
      method: 'put',
      url: res.data.url,
      data: blob,
    });
    return res.data.imageUrl;
  };

  const handleClick = async () => {
    const editorInstance = editorRef.current.getInstance();
    const temp = editorInstance.getMarkdown();
    const deleteImg = temp.replace(
      /\!\[inputImg]\(https:\/\/(.*?).[(png)|(jpeg)|(jpg)]\)/g,
      ''
    );
    const diary = deleteImg.replace(/<([^>]+)>/g, '');
    if (title.length > 0 && temp.length > 0) {
      try {
        const res = await Api.postDiary({
          diary: diary,
        });
        if (res.data.length !== 0) {
          setEmotion(res.data);
          await Api.post('diary', {
            tag,
            text: temp,
            title,
            emotion: res.data,
          });
          setSubmit((prev) => !prev);
          setLoading((prev) => !prev);
          setCountEmotion(1);
          setTimeout(() => setLoading((prev) => !prev), 3500);
        } else {
          snackBar('error', '일기 전송에 실패했습니다. ㅠ-ㅠ');
        }
      } catch (err) {
        snackBar('error', '일기 전송에 실패했습니다. ㅠ-ㅠ');
      }
    } else if (title.length === 0 || temp.length === 0) {
      snackBar('info', '제목, 내용은 필수로 작성 부탁드립니다!');
    }
  };

  return (
    <>
      <Editor
        initialValue={'✏️'}
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        plugins={[colorSyntax]}
        useCommandShortcut={true}
        ref={editorRef}
        hooks={{
          addImageBlobHook: async (e, callback) => {
            const imgUrl = await uploadImage(e);
            callback(imgUrl, 'inputImg');
            return false;
          },
        }}
      />
      <div style={{ float: 'right' }}>
        <Btn text={'저장하기'} type={'main'} onClick={handleClick} />
      </div>
      {submit &&
        (loading ? (
          <Background>
            <ClassicSpinner size={100} color="pink" />
          </Background>
        ) : (
          <DiaryModal />
        ))}
    </>
  );
};

export default DiaryEditor;
