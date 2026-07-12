import styled from 'styled-components';

const CategoryBar = styled.div`
  display: flex;

  background-color: #F7F6FF;
  border-bottom: 1px solid #D9D9D9;
`;

const CategoryButton = styled.button`
  flex: 1;                 /* 5개 버튼이 CategoryBar 너비를 정확히 5등분 */
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 10px 4px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  color: ${props => props.active ? '#584FEA' : '#4A4A4A'};
  font-weight: ${props => props.active ? 'bold' : '500'};

  border-bottom: ${props => props.active ? '3px solid #584FEA' : '3px solid transparent'};
`;

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