import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 60px;
  gap: 60px; 
`;

const LogoBoxOut = styled.div`
  width: 70%;
  height: 50%;
  background-color: #D9D9D9;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoBoxInner = styled.div`
  width: 80%;
  height: 40%;
  background-color: #FFFFFF;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.div`
  width: 70%;
  height: 7%;
  background-color: #D9D9D9;
  border-radius: 12px;
  padding: 14px 40px;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default function Splash() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <LogoBoxOut>
        <LogoBoxInner>BeneFitU</LogoBoxInner>
      </LogoBoxOut>
      <StartButton onClick={() => navigate('/login-home') }>시작하기</StartButton>
    </PageWrapper>
  );
}