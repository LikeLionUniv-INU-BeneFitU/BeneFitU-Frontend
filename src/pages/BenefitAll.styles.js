import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
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
  gap: 10px;
`;

// 카테고리 버튼 4개를 가로로 예쁘게 정렬해주는 상자
export const CategoryBar = styled.div`
  display: flex;
  gap: 20px; /* 버튼 사이의 간격 */
  background-color: #ffffff;
  padding: 10px 16px 0 16px;
  border-bottom: 1px solid #eee; /* 전체 밑에 깔리는 연한 회색 줄 */
`;

// 카테고리 버튼 디자인
export const CategoryButton = styled.button`
  background: none;
  border: none;
  padding: 10px 4px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease; /* 색상이 부드럽게 변하는 효과 */

  /* active가 true면 파란색(보라색), false면 흐린 회색 */
  color: ${props => props.active ? '#4f46e5' : '#9ca3af'}; 
  font-weight: ${props => props.active ? 'bold' : '500'};
  
  /* active가 true일 때만 아래에 3픽셀짜리 진한 밑줄 생성 */
  border-bottom: ${props => props.active ? '3px solid #4f46e5' : '3px solid transparent'};
`;