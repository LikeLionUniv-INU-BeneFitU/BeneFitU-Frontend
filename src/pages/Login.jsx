import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Logo from '../assets/images/Logo.png'
import mailIcon from '../assets/images/mailIcon.png'
import lockIcon from '../assets/images/lockIcon.png'


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
const LogoImg = styled.img`
  width: 80%;
  height: auto;
  margin: 70px 0 60px 0;
  display: block;
  align-self: center;
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
  margin-bottom: 10px;
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
  margin-bottom: 20px;

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
  const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://43.201.77.120:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (data.isSuccess) {
      // 토큰 저장
      localStorage.setItem("accessToken", data.result.accessToken);

      alert("로그인 성공!");
      navigate("/home"); // 원하는 페이지로 변경 가능
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("로그인 실패");
  }
};

  return (
  <PageWrapper>
    <Header title="로그인" onBack={() => navigate(-1)} />
    <ContentWrapper>
      <LogoImg src={Logo} alt="BeneFitU 로고" />
      <Label>아이디</Label>
      <Input
        img="/mailIcon.png" // 아이디 입력창 메일 아이콘
        placeholder="아이디를 입력해주세요"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Label>비밀번호</Label>
      <Input
        img="/lockIcon.png" // 비번 입력창 자물쇠 아이콘
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