import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
`;

const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
`;

// 키워드 박스 스타일
const KwordBox = styled.div`
  padding: 2px 12px;

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

  background-color: #DCDAFF;

  border-radius: 50%;
  padding: 20px;
  margin-right: 15px;
`;



export default function DetailBox({ children, buttonText, to, tags }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Box>
        <Rowbox>
          <BenefitIcon></BenefitIcon>
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