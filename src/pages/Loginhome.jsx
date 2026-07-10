import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import loginhome1 from '../assets/images/loginhome1.png'
import loginhome2 from '../assets/images/loginhome2.png'

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
  width: 75%;
  height: 90px;
  margin-top: 70px;

  display: flex;
  flex-direction: column;
`;

// 로고 이미지
const LogoimgBox = styled.div`
  width: 60%;
  height: 50%;
  margin: 80px;

  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  font-size: clamp(1rem, 3vw, 1.5rem);
`;

const Highlight = styled.span`
  color: #584FEA;
`;

const TermsAgreement = styled.div`
  width: 50%;
  margin: 5px 0;
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 20px;
`;


export default function LoginHome() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <LogoBox>
        <img src={loginhome2} />
      </LogoBox>
      <Subtitle>내가 맞는 혜택을 찾고, 놓치지 않도록 도와드릴게요!</ Subtitle>
      <LogoimgBox>
        <img src={loginhome1} />
      </LogoimgBox>

      <ButtonWrapper>
        <LoginButton onClick={() => navigate('/login') }>로그인</LoginButton>
        <SignupButton onClick={() => navigate('/signup') }>회원가입</SignupButton>
      </ButtonWrapper>
      <TermsAgreement>로그인 또는 회원가입 시 <Highlight>BeneFitU 이용약관 및 개인정보 처리 방침</Highlight>에 동의한 것으로 간주됩니다.</TermsAgreement>
    </PageWrapper>
  );
}