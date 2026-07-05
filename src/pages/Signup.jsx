import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111111;
`;

const SubTitle = styled.p`
  font-size: 0.8125rem;
  color: #5c4ff2;
  margin: 4px 0 30px 0;
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
  border: 1px solid ${(props) => (props.hasError ? '#FF4D4D' : '#828282')};
  border-radius: 5px;
  font-size: 0.875rem;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 4px;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2;
  }
`;

const ErrorText = styled.p`
  color: #FF4D4D;
  font-size: 0.75rem;
  margin: 0 0 20px 0;
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

export default function Signup() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  // passwordConfirm에 뭔가 입력된 상태에서만 에러 체크 (빈 값일 땐 에러 안 보여줌)
  const isPasswordMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;

  const handleSignup = () => {
    if (isPasswordMismatch) {
      return; // 비밀번호가 다르면 회원가입 진행 안 함
    }
    // 여기에 실제 회원가입 API 요청 코드 넣을 예정
    console.log('회원가입:', userId, password);
  };

  return (
    <PageWrapper>
    <Header title="회원가입" onBack={() => navigate(-1)} />

    <ContentWrapper>
      <Title>회원가입</Title>
      <SubTitle>BeneFit와 함께 더 많은 혜택을 만나보세요!</SubTitle>

      <Label>아이디</Label>
      <Input
        placeholder="아이디를 입력해주세요"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div style={{ marginBottom: '20px' }} />

      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ marginBottom: '20px' }} />

      <Label>비밀번호 확인</Label>
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        hasError={isPasswordMismatch}
      />
      {isPasswordMismatch && (
        <ErrorText>입력한 비밀번호와 동일하지 않습니다.</ErrorText>
      )}

      <SubmitButton onClick={handleSignup}>회원가입</SubmitButton>
    </ContentWrapper>
  </PageWrapper>
);
}