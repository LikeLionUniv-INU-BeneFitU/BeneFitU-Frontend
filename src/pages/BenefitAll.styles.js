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


// 정렬순서 버튼 관련 스타일
export const SortWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SortButton = styled.button`
  background-color: #EEEEFF;
  border: 1px solid #4A4A4A;

  display: flex;
  align-items: center;

  gap: 6px;
  padding: 5px 10px;
  margin-bottom: 2px;

  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;



  overflow: hidden; /* 안쪽 모서리도 둥글게 잘리도록 */
  border-radius: 5px;  
`;

export const SortOption = styled.div`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  border: 1px solid #4A4A4A;
  border-radius: 5px; 

  /* 선택된 항목만 보라색 배경 + 흰 글씨 */
  background-color: ${(props) => (props.$isActive ? '#584FEA' : '#EEEEFF')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#111111')};

  &:hover {
    background-color: #584FEA;
    color: #EEEEFF;
  }
`;
