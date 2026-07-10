import styled from 'styled-components';

// 카테고리 버튼 4개를 가로로 예쁘게 정렬해주는 상자
const CategoryBar = styled.div`
  display: flex;

  background-color: #F7F6FF;
  border-bottom: 1px solid #D9D9D9;
`;

// 카테고리 버튼 디자인
const CategoryButton = styled.button`
  flex: 1;                 /* 5개 버튼이 CategoryBar 너비를 정확히 5등분 */
  min-width: 0;             /* 긴 텍스트가 있어도 flex 축소가 정상 작동하도록 */

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 10px 4px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;      /* 텍스트 줄바꿈 방지 (필요시 조정) */
  transition: all 0.2s ease;

  color: ${props => props.active ? '#584FEA' : '#4A4A4A'};
  font-weight: ${props => props.active ? 'bold' : '500'};

  border-bottom: ${props => props.active ? '3px solid #584FEA' : '3px solid transparent'};
`;

  // 화면에 보여줄 카테고리 이름 4개 배열
  const categories = [
    { label: '전체', value: '전체' },
    { label: '국가장학금', value: 'SCHOLARSHIP' },
    { label: '기업·재단 장학금', value: 'FOUNDATION' },
    { label: '지역 장학금', value: 'LOCAL' },
    { label: '조건별 장학금', value: 'CONDITIONAL' },
  ];

export default function CategoryButtonBar({ currentCategory, setCurrentCategory }) {
  return (
    <CategoryBar>
      {categories.map((category) => (
        <CategoryButton
          key={category.value}
          active={currentCategory === category.value}
          onClick={() => setCurrentCategory(category.value)}
        >
          {category.label}
        </CategoryButton>
      ))}
    </CategoryBar>
  );
}


