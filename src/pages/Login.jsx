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
  background-color: #E9E6FF;  
`;

// 전체 박스 (흰색)
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
const LogoBox = styled.div`
  width: 100%;
  height: 50px;
  margin: 70px 0;

  background-image: url('/BeneFitU로고.png');
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
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
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;

  background-color: #ffffff;
  border: 1px solid #828282;
  border-radius: 5px;
  
  outline: none;
  font-size: 0.875rem;
  box-sizing: border-box;
  
  background-image: url(${(props) => props.$icon});
  background-repeat: no-repeat;
  background-position: 12px center; /* 왼쪽에서 12px 떨어진 위치 */
  background-size: 18px 18px; /* 아이콘 크기 */

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2;
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
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

// 새 계정 만들기 버튼
const NewLoginButton = styled.button`
  height: 50px;
  background-color: #ffffff;
  color: #5c4ff2;
  border: 1px solid #5c4ff2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    background-color: #f0f0f0;
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
      <LogoBox />
      <Label>아이디</Label>
      <Input
        img="/user.png" // 나중에 이미지 변경 필요
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

      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <NewLoginButton onClick={() => navigate('/signup')}>새 계정 만들기</NewLoginButton>
    </ContentWrapper>
  </PageWrapper>
  );
}