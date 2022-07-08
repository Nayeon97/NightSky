import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import * as Api from '../../api';
import styled from 'styled-components';
import {
  RegisterInput,
  RegisterText,
  WarningText,
} from '../../styles/RegisterStyle';
import { validateEmail } from '../../utils/validation';
import LandingNav from '../../components/nav/LandingNav';
import snackBar from '../../components/snackBar';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const openEmail = email.length === 0 ? false : true;
  const openPassword = password.length === 0 ? false : true;
  const openName = name.length === 0 ? false : true;

  const isEmailDuplicate = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        const post = await Api.post('user/signup/check', {
          email,
        });
        if (post.data === false) {
          snackBar('sucess', '사용 가능한 이메일 입니다. ');
          setCheckEmail(true);
        } else {
          snackBar('warning', '중복된 이메일입니다');
        }
      } catch (error) {
        if (error.response) {
          snackBar('error', '중복체크 중 에러가 발생했습니다.');
        }
      }
    } else {
      snackBar('warning', '올바른 이메일 형식을  입력해주세요!');
    }
  };

  const handleSubmit = async () => {
    if (checkEmail) {
      try {
        const response = await Api.post('user/signup', {
          email,
          pw: password,
          name,
        });
        if (response.data === true) {
          snackBar('sucess', '회원가입에 성공하였습니다.');
          navigate('/login');
        } else {
          snackBar('error', '회원가입에 실패하였습니다.');
        }
      } catch (err) {
        snackBar('sucess', '회원가입에 성공하였습니다.');
      }
    } else {
      snackBar('warning', '이메일 중복  확인해주세요.');
    }
  };

  return (
    <Container>
      <LandingNav />
      <RegisterContainer id="RC">
        <div onSubmit={handleSubmit}>
          <EmailContainer>
            <div style={{ marginBottom: '30px' }}>
              <RegisterText>📧 이메일 주소 </RegisterText>
              <RegisterInput
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {openEmail && !isEmailValid && (
                <WarningText>이메일 형식이 올바르지 않습니다.</WarningText>
              )}
            </div>
            {checkEmail ? (
              <IconWrapper>
                <FontAwesomeIcon icon={faCircleCheck} className="user" />
              </IconWrapper>
            ) : (
              <EmailBtn onClick={isEmailDuplicate}>
                <p>중복 체크</p>
              </EmailBtn>
            )}
          </EmailContainer>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText>🔑 비밀번호</RegisterText>
            <RegisterInput
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {openPassword && !isPasswordValid && (
              <WarningText>
                비밀번호는 4글자 이상으로 설정해 주세요.
              </WarningText>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText> ✅ 비밀번호 재확인</RegisterText>
            <RegisterInput
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordSame && (
              <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText> 🔖 닉네임</RegisterText>
            <RegisterInput
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {openName && !isNameValid && (
              <WarningText>닉네임은 2글자 이상으로 설정해 주세요.</WarningText>
            )}
          </div>

          <div style={{ textAlign: 'center', marginRight: '130px' }}>
            <Btn
              text={'회원가입'}
              type={'sub'}
              disabled={!isFormValid}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </RegisterContainer>
    </Container>
  );
};

export default Register;

const RegisterContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 100px;
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
`;

const EmailBtn = styled.button`
  font-size: 15px;
  background-color: white;
  padding: 10px;
  height: 40px;
  width: 80px;
  border-radius: 10px;
  margin-top: 30px;
  margin-left: 20px;
`;

const EmailContainer = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  font-size: 30px;
  padding: 10px;
  height: 40px;
  width: 80px;
  color: pink;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 10px;
`;
