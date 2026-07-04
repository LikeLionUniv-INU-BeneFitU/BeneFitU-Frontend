import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid #828282;
  border-radius: 5px;
  font-size: 0.875rem;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 20px;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #5c4ff2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  // 아이디, 비밀번호를 각각 기억하는 상자
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 눌렀을 때 실행할 함수
  const handleLogin = () => {
    // TODO: 여기에 실제 로그인 API 요청 코드 넣을 예정
    console.log('아이디:', userId, '비밀번호:', password);
  };

  return (
  <PageWrapper>
    <Header title="로그인" onBack={() => navigate(-1)} />
    <ContentWrapper>
      <Label>아이디</Label>
      <Input
        placeholder="아이디를 입력해주세요"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
      </ContentWrapper>
  </PageWrapper>
  );
}