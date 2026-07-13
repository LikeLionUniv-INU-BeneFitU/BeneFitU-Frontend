import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import state2 from '../assets/images/state2.png';
import corporate2 from '../assets/images/corporate2.png';
import region2 from '../assets/images/region2.png';
import requirement2 from '../assets/images/requirement2.png';

const PageWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 전체 박스 (흰색)
const Box = styled.div`
  width: 98%;

  font-size: 18px;
  letter-spacing: -1px;

  background-color: #ffffff;

  border-radius: 12px; /* 전체 박스 모서리 */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4); /* 전체 박스 그림자 */

  padding: 15px;

  display: flex;
  flex-direction: column;
`;

const Rowbox = styled.div`
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
`;

const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  min-width: 0;
  letter-spacing: -1px;
  word-break: keep-all;
`;

// 상세보기 버튼 스타일
const MoveButton = styled.button`
  width: 100%;
  height: 40px;

  font-size: 18px;
  letter-spacing: -1px;

  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 선택된 항목만 보라색 배경 + 흰 글씨 */
  background-color: ${(props) => (props.$isActive ? '#584FEA' : '#ffffff')};
  border: 1px solid #584fea;
  border-radius: 12px;

  color: ${(props) => (props.$isActive ? '#ffffff' : '#111111')};
`;

// 혜택 아이콘 스타일
const BenefitIcon = styled.button`
  width: 72px;
  height: 72px;
  margin-right: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

const categoryIconMap = {
  국가장학금: state2,
  '기업·재단 장학금': corporate2,
  지역장학금: region2,
  조건별장학금: requirement2,
};

export default function DetailBox({
  children,
  buttonText,
  to,
  tags,
  category,
}) {
  const navigate = useNavigate();
  const iconSrc = categoryIconMap[category];
  return (
    <PageWrapper>
      <Box>
        <Rowbox>
          <BenefitIcon>
            {iconSrc && (
              <img
                src={iconSrc}
                alt={category}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </BenefitIcon>
          <Columnbox>{children}</Columnbox>
        </Rowbox>
        <MoveButton onClick={() => navigate(to)}>{buttonText}</MoveButton>
      </Box>
    </PageWrapper>
  );
}
