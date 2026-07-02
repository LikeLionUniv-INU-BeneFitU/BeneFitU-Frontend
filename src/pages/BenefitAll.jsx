import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import BenefitDetailBox from '../components/BenefitDetailBox';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;


export default function BenefitAll() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header></Header>
      <BenefitDetailBox buttonText="신청하러 가기" to="/">
      <h2>내용</h2>
      <p>내용</p>
      </BenefitDetailBox>
    </PageWrapper>
  );
}