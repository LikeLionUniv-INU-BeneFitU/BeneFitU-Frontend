import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: #f8f7ff;

  display: flex;
  flex-direction: column;
`;

export const Rowbox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  letter-spacing: -1px;
  font-weight: bold;
  span {
    color: #584fea;
    font-size: 22px;
  }
`;

export const ScrollArea = styled.div`
  flex: 1; /* 헤더를 제외한 나머지 화면 높이를 다 차지 */
  overflow-y: auto; /* 내용이 화면보다 많아지면 세로 스크롤을 자동으로 생성 */
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// 정렬순서 버튼 관련 스타일
export const SortWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SortButton = styled.button`
  background-color: #f7f6ff;
  border: 1px solid #4a4a4a;

  display: flex;
  align-items: center;

  gap: 6px;
  padding: 5px 10px;
  margin-bottom: 2px;

  border-radius: 8px;
  font-size: 14px;
  letter-spacing: -1px;
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
  letter-spacing: -1px;
  cursor: pointer;

  border: 1px solid #4a4a4a;
  border-radius: 5px;

  /* 선택된 항목만 보라색 배경 + 흰 글씨 */
  background-color: ${(props) => (props.$isActive ? '#584FEA' : '#F7F6FF')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#111111')};

  &:hover {
    background-color: #584fea;
    color: #f7f6ff;
  }
`;

// 페이지네이션 스타일
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2vw;
  padding: 15px 0 25px 0;
  background-color: #f8f7ff;
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
