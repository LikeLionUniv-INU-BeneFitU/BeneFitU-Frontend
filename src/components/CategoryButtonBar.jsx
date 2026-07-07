import styled from 'styled-components';

// 카테고리 버튼 4개를 가로로 예쁘게 정렬해주는 상자
const CategoryBar = styled.div`
  display: flex;
  justify-content: space-around;

  background-color: #EEEEFF;
  border-bottom: 1px solid #D9D9D9; /* 전체 밑에 깔리는 연한 회색 줄 */
`;

// 카테고리 버튼 디자인
const CategoryButton = styled.button`
  background: none;
  border: none;
  padding: 10px 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease; /* 색상이 부드럽게 변하는 효과 */

  /* active가 true면 파란색(보라색), false면 흐린 회색 */
  color: ${props => props.active ? '#584FEA' : '#4A4A4A'}; 
  font-weight: ${props => props.active ? 'bold' : '500'};
  
  /* active가 true일 때만 아래에 3픽셀짜리 진한 밑줄 생성 */
  border-bottom: ${props => props.active ? '2px solid #584FEA' : '3px solid transparent'};
`;

  // 화면에 보여줄 카테고리 이름 4개 배열
  const categories = ['전체', '국가장학금', '기업·재단 장학금', '지역 장학금', '조건별 장학금'];

export default function CategoryButtonBar({ currentCategory, setCurrentCategory }) {
  return (
    <CategoryBar>
      {categories.map((CButton) => (
        <CategoryButton key={CButton} active={currentCategory === CButton} onClick={() => setCurrentCategory(CButton)}>
          {CButton}
        </CategoryButton>
      ))}
    </CategoryBar>
  );
}


