import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Logo from '../assets/images/Logo.png';
import mailIcon from '../assets/images/mailIcon.png';
import lockIcon from '../assets/images/lockIcon.png';

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100dvh;
  
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
  margin-top: 6.87vh;
  
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background-color: #ffffff;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
`;

// 로고 사진
const LogoImg = styled.img`
  width: 80%;
  height: auto;
  margin: 5.15vh 0 2.4vh 0;
  display: block;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 24px;
  letter-spacing: -1px;
  font-weight: 700;
  color: #111111;
  margin-left: 15px;
`;

const SubTitle = styled.p`
  font-size: 12px;
  color: #000000;
  margin-top: 5px;
  margin-bottom: 2.29vh;
  margin-left: 15px;
`;

const SubTitlehighlight = styled.span`
  font-size: 12px;
  color: #5c4ff2;
`;

export const Rowbox = styled.div`
  display: flex;
  align-items: center;
`;

// 아이디, 비밀번호, 비밀번호 확인 텍스트
const Label = styled.label`
  font-size: 14px;
  letter-spacing: -1px;
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
  border-radius: 6px;

  font-size: 0.875rem;

  background-color: #ffffff;
  background-image: url(${(props) => props.$icon});
  background-repeat: no-repeat;
  background-position: 12px center; /* 왼쪽에서 12px 떨어진 위치 */
  background-size: 18px 18px; /* 아이콘 크기 */

  outline: none;
  box-sizing: border-box;

  margin-bottom: 1.37vh; // 회원가입 화면이랑 통일
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
  color: #ff4d4d;
  font-size: 0.75rem;
  margin: 0 0 2.29vh 15px;
`;

// 회원가입 버튼
const SubmitButton = styled.button`
  height: 50px;
  background-color: #5c4ff2;
  color: #ffffff;

  border: none;
  border-radius: 12px;

  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  margin-top: 8.01vh;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 4vh;

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
  const isPasswordMismatch =
    passwordConfirm.length > 0 && password !== passwordConfirm;

  const handleSignup = async () => {
    if (isPasswordMismatch) return;

    try {
      const response = await fetch(
        'https://benefitu-api.duckdns.org/api/auth/signup',
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
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 실패');
    }
  };

  return (
    <PageWrapper>
      
        <Header color={'#E9E6FF'} onBack={() => navigate(-1)} />
        <ContentWrapper>
          <LogoImg src={Logo} alt="BeneFitU 로고" />
          <Title>회원가입</Title>
          <Rowbox>
            <SubTitle>
              <SubTitlehighlight>BeneFitU</SubTitlehighlight>와 함께 더 많은
              혜택을 만나보세요!
            </SubTitle>
          </Rowbox>
          <Label>아이디</Label>
          <Input
            $icon={mailIcon} // 아이디 입력창 메일 아이콘
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <Label>비밀번호</Label>
          <Input
            $icon={lockIcon} // 비번 입력창 자물쇠 아이콘
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label>비밀번호 확인</Label>
          <Input
            $icon={lockIcon} // 비번 입력창 자물쇠 아이콘
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
