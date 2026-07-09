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

  background-color: #FFFFFF;
  
  border-radius: 12px; /* 전체 박스 모서리 */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4); /* 전체 박스 그림자 */

  padding: 15px;
  gap: 10px;

  display: flex;
  flex-direction: column;
`;

const Rowbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

// 키워드 박스 스타일
const KwordBox = styled.div`
  padding: 2px 12px;
  font-size: 0.8rem;

  background-color: #D9D9D9;

  border-radius: 15px;
  
  margin-right: 5px;
  margin-top: 5px;

  white-space: nowrap;     // 글자가 두 줄로 안 꺾이게
  display: inline-block;   // 내용 크기만큼만 차지하도록
`;

// 상세보기 버튼 스타일
const MoveButton = styled.button`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* 선택된 항목만 보라색 배경 + 흰 글씨 */
  background-color: ${(props) => (props.$isActive ? '#584FEA' : '#ffffff')};
  border: 1px solid #584FEA;
  border-radius: 5px;

  color: ${(props) => (props.$isActive ? '#ffffff' : '#111111')};

  &:hover {
    background-color: #584FEA;
    color: #EEEEFF;
  }
`;

// 혜택 아이콘 스타일
const BenefitIcon = styled.button`
  width: 75px;
  height: 75px;
  margin-right: 15px;

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
    SCHOLARSHIP: state2,
    CAMPUS_WORK: corporate2,
    YOUTH_SUPPORT: region2,
    EXTERNAL_ACTIVITY: requirement2,
  };

export default function DetailBox({ children, buttonText, to, tags, category }) {
  const navigate = useNavigate();
  const iconSrc = categoryIconMap[category];
  return (
    <PageWrapper>
      <Box>
        <Rowbox>
          <BenefitIcon>
            {iconSrc && <img src={iconSrc} alt={category} style={{ width: '100%', height: '100%' }} />}
          </BenefitIcon>
          <Columnbox>
            {children}
            <Rowbox>
              {tags && tags.map((tag, index) => (
              <KwordBox key={index}>{tag}</KwordBox>
              ))}
            </Rowbox>
          </Columnbox>
        </Rowbox>
        
        <MoveButton onClick={() => navigate(to)}>{buttonText}</MoveButton>
      </Box>
    </PageWrapper>
  );
}