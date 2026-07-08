import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Logo from '../assets/images/Logo.png'

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #E9E6FF;  
`;

const ContentWrapper = styled.div`
  width: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  margin-top: 60px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background-color: #ffffff;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
`;

// 로고 사진
const LogoImg = styled.img`
  width: 80%;
  height: auto;
  margin: 70px 0 60px 0;
  display: block;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111111;
  margin-left: 15px;
`;

const SubTitle = styled.p`
  font-size: 0.8125rem;
  color: #5c4ff2;
  margin-top: 5pcx;
  margin-bottom: 30px;
  margin-left: 15px;
`;

const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
  display: block;
  margin-bottom: 8px;
  margin-left: 15px;
`;

// 입력창
const Input = styled.input`
  height: 45px;
  padding: 0 16px 0 40px;

  border: 1px solid ${(props) => (props.hasError ? '#FF4D4D' : '#828282')};
  border-radius: 5px;

  font-size: 0.875rem;

  background-color: #ffffff;
  background-image: url(${(props) => props.$icon});
  background-repeat: no-repeat;
  background-position: 12px center; /* 왼쪽에서 12px 떨어진 위치 */
  background-size: 18px 18px; /* 아이콘 크기 */

  outline: none;
  box-sizing: border-box;

  margin-bottom: 1px;
  margin-left: 15px;
  margin-right: 15px;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
  border-color: ${(props) => (props.hasError ? '#FF4D4D' : '#5c4ff2')};
  }
`;

const ErrorText = styled.p`
  color: #FF4D4D;
  font-size: 0.75rem;
  margin: 0 0 20px 15px;
`;

// 회원가입 버튼
const SubmitButton = styled.button`
  height: 50px;
  background-color: #5c4ff2;
  color: #ffffff;

  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  margin-top: 40px;
  margin-left: 15px;
  margin-right: 15px;

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
      <LogoImg src={Logo} alt="BeneFitU 로고" />
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
        <ErrorText>ⓘ 입력한 비밀번호와 동일하지 않습니다.</ErrorText>
      )}

      <SubmitButton onClick={handleSignup}>회원가입</SubmitButton>
    </ContentWrapper>
  </PageWrapper>
);
}