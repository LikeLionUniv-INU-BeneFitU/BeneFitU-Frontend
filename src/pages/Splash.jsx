import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import splash from '../assets/images/splash.png'


const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 60px;
  

  background: linear-gradient(180deg, #2B23AA, #927BFD);
`;

// 로고 텍스트 사진
const LogoBox = styled.div`
  width: 75%;
  height: 90px;
  

  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: #FFFFFF;
`;


export default function Splash() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <LogoBox>
        <img src={splash} />
      </LogoBox>
      <Subtitle>내가 맞는 혜택을 찾고, 놓치지 않도록 도와드릴게요!</Subtitle>
    </PageWrapper>
  );
}