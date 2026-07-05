import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  
  background-color: #EEEEFF;

  display: flex;
  flex-direction: column;
`;

export const Rowbox = styled.div`
  
  display: flex;
  justify-content: space-between;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  span {color: #584FEA;}
`;

export const ScrollArea = styled.div`
  flex: 1;              /* 헤더를 제외한 나머지 화면 높이를 다 차지 */
  overflow-y: auto;     /* 내용이 화면보다 많아지면 세로 스크롤을 자동으로 생성 */
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SortWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SortButton = styled.button`
  background-color: #EEEEFF;
  

  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 10px;
  
  background-color: #EEEEFF;
  
  border-radius: 5px;  
`;

export const SortOption = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  border: 1px solid #584FEA;
  border-radius: 5px; 
  &:hover {
    background-color: #000000;
  }
`;
