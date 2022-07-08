import { useState } from 'react';
import SocialLogin from './SocialLogin';
import {
  LoginText,
  LoginInput,
  SocialLoginContainer,
} from '../../styles/LoginStyle';
import styled from 'styled-components';
import Btn from '../../components/Btn';
import { validateEmail } from '../../utils/validation';
import * as Api from '../../api';
import LandingNav from '../../components/nav/LandingNav';
import { useNavigate } from 'react-router-dom';
import snackBar from '../../components/snackBar';
import { WarningText } from '../../styles/RegisterStyle';

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
`;

const LoginMainContainer = styled.div`
  display: grid;
  place-items: center;
  align-items: center;
  margin-top: 150px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const navigate = useNavigate();

  const openEmail = email.length === 0 ? false : true;

  const clickLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post('login/local', {
        email,
        pw: password,
      });
      if (res.data === true) {
        navigate('/usermain');
      } else {
        snackBar('error', '로그인에 실패하였습니다.');
      }
    } catch (error) {
      if (error.response) {
        snackBar('error', '로그인에 실패하였습니다.');
        navigate('/');
      }
    }
  };

  return (
    <Container>
      <LandingNav />
      <div>
        <LoginMainContainer>
          <div style={{ marginTop: '1rem' }}>
            <LoginText>이메일 주소</LoginText>
            <LoginInput
              type="email"
              id="email-input"
              label="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {openEmail && !isEmailValid && (
              <WarningText>이메일 형식이 올바르지 않습니다.</WarningText>
            )}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <LoginText>비밀번호</LoginText>
            <LoginInput
              type="password"
              id="password-input"
              label="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ margin: '0 auto', width: '100px' }}>
            <Btn
              text={'로그인'}
              type={'sub'}
              onClick={clickLogin}
              disabled={!isFormValid}
            />
          </div>
          <SocialLoginContainer>
            <SocialLogin />
          </SocialLoginContainer>
        </LoginMainContainer>
      </div>
    </Container>
  );
};

export default Login;
