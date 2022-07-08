import React, { useState, useRef, useEffect } from 'react';
import * as Api from '../../api';
import axios from 'axios';
import {
  ImgIconWrapper,
  EditIconWrapper,
  ColorIconWrapper,
  TagContainer,
  ContenstContainer,
  ImageWrapper,
  TitleWrapper,
} from '../../styles/BookStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faFileImage,
  faPalette,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import TagEditCover from './TagEditCover';
import TagDiaryList from './TagDiaryList';
import snackBar from '../../components/snackBar';

const TagBook = (props) => {
  const [openEditCover, setOpenEditCover] = useState(false);
  const [bookColor, setBookColor] = useState();
  const [inputImage, setInputImage] = useState();
  const [openEditBtn, setOpenEditBtn] = useState(false);
  const [openTagList, setOpenTagList] = useState(false);
  const [tagList, setTagList] = useState([]);
  const hiddenInput = useRef();
  const { it } = props;

  useEffect(() => {
    setBookColor(it.color);
    setInputImage(it.image);
  }, []);

  const clickSubmit = async () => {
    await axios
      .all([
        Api.post(`book/images/${it.id}`, {
          image: inputImage,
        }),
        Api.post(`book/colors/${it.id}`, {
          color: bookColor,
        }),
      ])
      .catch(() => {
        snackBar('error', '에러가 발생하였습니다.');
      });
    setOpenEditBtn(false);
  };

  const openEdit = () => {
    setOpenEditBtn(true);
  };

  const clickEditImage = () => {
    hiddenInput.current.click();
  };

  const openEditColor = () => {
    setOpenEditCover(true);
  };

  const clickBook = async () => {
    const res = await Api.get(`book/diarys?tag=${it.name}`);
    setTagList(res.data);
    setOpenTagList(true);
  };

  const onChangeImage = async (event) => {
    const image = event.target.files[0];
    const imgName = image.name.replace(/(\s*)/g, '');
    const res = await Api.get(`upload/${imgName}`);
    await axios({
      method: 'put',
      url: res.data.url,
      data: image,
    });
    setInputImage(res.data.imageUrl);
  };

  return (
    <>
      <TagContainer color={bookColor}>
        <ContenstContainer>
          <TitleWrapper onClick={clickBook}>
            <span>#{it.name}</span>
          </TitleWrapper>
          <ImageWrapper image={inputImage}>
            {openEditBtn && (
              <>
                <ImgIconWrapper onClick={clickEditImage} image={inputImage}>
                  <FontAwesomeIcon icon={faFileImage} className="fileImage" />
                </ImgIconWrapper>
                <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  name="profile_img"
                  style={{ display: 'none' }}
                  ref={hiddenInput}
                  onChange={onChangeImage}
                />
              </>
            )}
          </ImageWrapper>
        </ContenstContainer>
        {openEditBtn && (
          <ColorIconWrapper onClick={openEditColor}>
            <FontAwesomeIcon icon={faPalette} className="color" />
          </ColorIconWrapper>
        )}
        {openEditBtn ? (
          <EditIconWrapper onClick={clickSubmit}>
            <FontAwesomeIcon icon={faCircleCheck} className="user" />
          </EditIconWrapper>
        ) : (
          <EditIconWrapper onClick={openEdit}>
            <FontAwesomeIcon icon={faGear} className="user" />
          </EditIconWrapper>
        )}
        {openEditCover && (
          <TagEditCover
            setBookColor={setBookColor}
            setOpenEditCover={setOpenEditCover}
          />
        )}
      </TagContainer>
      {openTagList && (
        <TagDiaryList setOpenTagList={setOpenTagList} tagList={tagList} />
      )}
    </>
  );
};

export default TagBook;
