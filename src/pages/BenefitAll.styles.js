import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  
  background-color: #F8F7FF;

  display: flex;
  flex-direction: column;
`;

export const Rowbox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  span {
    color: #3b82f6;
  }
`;

export const ScrollArea = styled.div`
  flex: 1;              /* 헤더를 제외한 나머지 화면 높이를 다 차지 */
  overflow-y: auto;     /* 내용이 화면보다 많아지면 세로 스크롤을 자동으로 생성 */
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
