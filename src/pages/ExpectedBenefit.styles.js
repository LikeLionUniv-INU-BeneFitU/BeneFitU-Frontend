import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f7f6ff;
  padding-bottom: 40px;
`;

export const ScrollArea = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px 26px;
`;

// 총 금액 텍스트
export const TotalAmountText = styled.p`
  text-align: center;
  color: #584fea;
  font-weight: 700;
  font-size: 28px;
  margin: 20px 0;
`;

// 페이지네이션 스타일
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2vw;
  padding: 15px 0 25px 0;
  background-color: #ffffff;
`;

export const BlockArrowBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #5c59f0;
  cursor: pointer;
  padding: 0 6px;

  &:disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const NumButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$isCurrent ? '700' : '400')};
  color: ${(props) => (props.$isCurrent ? '#5c59f0' : '#888888')};
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
