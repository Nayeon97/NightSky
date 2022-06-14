import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from './Btn';
import * as Api from '../api';
import styled from 'styled-components';

const RegisterInput = styled.input`
  width: 680px;
  height: 73px;
  top: 270px;
  left: 343px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.35));
`;

const RegisterLabel = styled.label``;

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);

  const isPasswordValid = password.length >= 4;

  const isPasswordSame = password === confirmPassword;

  const isNameValid = name.length >= 2;

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.post('user/signup', {
        email,
        password,
        name,
      });

      navigate('/login');
    } catch (err) {
      console.log('회원가입 실패', err);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <div>
        <RegisterLabel>이메일 주소</RegisterLabel>
        <RegisterInput
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && (
          <text className="text-success">이메일 형식이 올바르지 않습니다.</text>
        )}
      </div>

      <div>
        <RegisterLabel>비밀번호</RegisterLabel>
        <RegisterInput
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && (
          <text className="text-success">
            비밀번호는 4글자 이상으로 설정해 주세요.
          </text>
        )}
      </div>

      <div>
        <RegisterLabel>비밀번호 재확인</RegisterLabel>
        <RegisterInput
          type="password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!isPasswordSame && (
          <text className="text-success">비밀번호가 일치하지 않습니다.</text>
        )}
      </div>

      <div>
        <RegisterLabel>닉네임</RegisterLabel>
        <RegisterInput
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!isNameValid && (
          <text className="text-success">
            닉네임은 2글자 이상으로 설정해 주세요.
          </text>
        )}
      </div>

      <div>
        <Btn
          text={'회원가입'}
          type={'sub'}
          disabled={!isFormValid}
          onClick={() => navigate('/login')}
        />
      </div>
    </div>
  );
}

// css 수정 예정
// 이메일, 닉네임 중복 검사 추가 예정

export default RegisterForm;