import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 60px;
  gap: 5px; 

  background: linear-gradient(180deg, #E0DEFF, #FFFFFF);
`;

const ButtonWrapper = styled.div`
  width: 100%; 
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
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
  
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    opacity: 0.9;
  }
`;

// 회원가입 버튼
const SignupButton = styled.button`
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

// 로고 텍스트 사진
const LogoBox = styled.div`
  width: 85%;
  height: 90px;
  margin-top: 70px;

  background-image: url('/BeneFitU로고X.png');
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
`;

// 로고 이미지
const LogoimgBox = styled.div`
  width: 50%;
  height: 20%;
  
  margin: 60px 0;

  background-color: #000000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-size: 15px;
`;

const Highlight = styled.span`
  color: #584FEA;
  font-weight: bold;
`;

const TermsAgreement = styled.div`
  width: 50%;
  margin: 5px 0;
  font-size: 10px;
`;


export default function LoginHome() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <LogoBox />
      <Subtitle>내가 맞는 혜택을 찾고, 놓치지 않도록 도와드릴게요!</ Subtitle>
      <LogoimgBox />
      <ButtonWrapper>
        <LoginButton onClick={() => navigate('/login') }>로그인</LoginButton>
        <SignupButton onClick={() => navigate('/signup') }>회원가입</SignupButton>
      </ButtonWrapper>
      <TermsAgreement>로그인 또는 회원가입 시<Highlight>BeneFitU 이용약관 및 개인정보 처리 방침</Highlight>에 동의한 것으로 간주됩니다.</TermsAgreement>
    </PageWrapper>
  );
}