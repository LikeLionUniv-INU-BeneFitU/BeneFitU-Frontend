import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Logo from '../assets/images/Logo.png';
import mailIcon from '../assets/images/mailIcon.png';
import lockIcon from '../assets/images/lockIcon.png';
import api from '../api/axios';

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #e9e6ff;
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

const LogoImg = styled.img`
  width: 80%;
  height: auto;
  margin: 65px 0 65px 0;
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

const Input = styled.input`
  height: 45px;
  padding: 0 16px 0 40px;

  margin-bottom: 12px; // 회원가입 화면이랑 통일
  margin-left: 15px;
  margin-right: 15px;

  background-color: #ffffff;
  border: 1px solid #828282;
  border-radius: 6px;
  outline: none;
  font-size: 0.875rem;
  box-sizing: border-box;
  background-image: url(${(props) => props.$icon});
  background-repeat: no-repeat;
  background-position: 12px center;
  background-size: 18px 18px;

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
  border-radius: 12px;
  font-size: 18px;
  letter-spacing: -1px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 65px;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    opacity: 0.9;
  }
`;

// 새로 만들기 버튼
const NewLoginButton = styled.button`
  height: 50px;
  background-color: #ffffff;
  color: #5c4ff2;
  border: 1px solid #5c4ff2;
  border-radius: 12px;
  font-size: 18px;
  letter-spacing: -1px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 13px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 70px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://benefitu-api.duckdns.org/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userId,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (data.isSuccess) {
        const newAccessToken = data.result.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;

        if (data.result.hasDetails) {
          alert('로그인 성공!');
          navigate('/home');
        } else {
          alert('로그인 성공! 필수 정보 입력 페이지로 이동합니다.');
          navigate('/info-intro');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return (
    <PageWrapper>
      <Header color={'#E9E6FF'} onBack={() => navigate(-1)} />
      <ContentWrapper>
        <LogoImg src={Logo} alt="BeneFitU 로고" />
        <Label>아이디</Label>
        <Input
          $icon={mailIcon}
          placeholder="아이디를 입력해주세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <Label>비밀번호</Label>
        <Input
          $icon={lockIcon}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <NewLoginButton onClick={() => navigate('/signup')}>
          새 계정 만들기
        </NewLoginButton>
      </ContentWrapper>
    </PageWrapper>
  );
}
