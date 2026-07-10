import styled from 'styled-components';


export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #F7F6FF;
  padding-bottom: 40px;
`;

export const ScrollArea = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 총 금액 텍스트
export const TotalAmountText = styled.p`
  text-align: center;
  color: #584FEA;
  font-weight: 700;
  font-size: 2rem;
  margin: 20px 0;
`;
