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
`;

const LoginButton = styled.div`
  width: 70%;
  height: 7%;
  background-color: #D9D9D9;
  border-radius: 12px;
  padding: 14px 40px;
  margin: 5px 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupButton = styled.div`
  width: 70%;
  height: 7%;
  background-color: #D9D9D9;
  border-radius: 12px;
  padding: 14px 40px;
  margin: 5px 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoBox = styled.div`
  width: 50%;
  height: 20%;
  background-color: #D9D9D9;
  border-radius: 60px;
  margin: 60px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Highlight = styled.span`
  color: #584FEA;
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
`;

const TermsAgreement = styled.div`
  width: 60%;
  margin: 30px 0;
`;


export default function LoginHome() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Title>BeneFitU</Title><br/>
      내가 맞는 혜택을 찾고, 놓치지 않도록 도와드릴게요!
      <LogoBox>로고박스</LogoBox>
      <LoginButton onClick={() => navigate('/login') }>로그인</LoginButton>
      <SignupButton onClick={() => navigate('/signup') }>회원가입</SignupButton>
      <TermsAgreement>로그인 또는 회원가입 시<Highlight>BeneFitU 이용약관 및 개인정보 처리 방침</Highlight>에 동의한 것으로 간주됩니다.</TermsAgreement>
    </PageWrapper>
  );
}