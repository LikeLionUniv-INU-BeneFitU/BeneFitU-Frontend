import styled from 'styled-components';

const CategoryBar = styled.div`
  display: flex;

  background-color: #f7f6ff;
  border-bottom: 1px solid #d9d9d9;
`;

const CategoryButton = styled.button`
  flex: 1;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 10px 4px;
  font-size: 12px;
  letter-spacing: -1px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  color: ${(props) => (props.active ? '#584FEA' : '#4A4A4A')};
  font-weight: ${(props) => (props.active ? 'bold' : '500')};

  border-bottom: ${(props) => (props.active ? '3px solid #584FEA' : '3px solid transparent')};
`;

const categories = [
  { label: '전체', value: '전체' },
  { label: '국가장학금', value: '국가장학금' },
  { label: '기업·재단 장학금', value: '기업·재단 장학금' },
  { label: '지역장학금', value: '지역장학금' },
  { label: '조건별장학금', value: '조건별장학금' },
];

export default function CategoryButtonBar({
  currentCategory,
  setCurrentCategory,
}) {
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
