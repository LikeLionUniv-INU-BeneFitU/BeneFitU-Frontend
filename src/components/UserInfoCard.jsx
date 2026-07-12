import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userIcon from '../assets/images/user.png';

const PageWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 전체 박스 (보라색)
const Card = styled.div`
  width: 90%;

  background-color: #584FEA;
  
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);

  padding: 12px 20px;
  margin: 14px;
  gap: 10px;

  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameText = styled.p`
  font-size: 20px;
  letter-spacing: -1px;
  color: #FFFFFF;
`;

// 마이페이지 이동 버튼
const MyButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  padding: 0;

  background-image: url(${userIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;


// 태그 관련 스타일
const TagRow = styled.div`
  display: flex;
  gap: 0 6px;
`;

const Tag = styled.span`
  font-size: 12px;
  letter-spacing: -1px;
  background-color: #FFFFFF;
  color: #000000;
  padding: 4px 8px;
  margin-top: 9px;
  border-radius: 7px;
`;

export default function UserInfoCard({ name, gpa, incomeLevel, onMyClick }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Card>
        <TopRow>
          <NameText>{name}님의 정보</NameText>
          <MyButton onClick={() => navigate('/my-page')/*마이페이지로 바꾸기*/ }></MyButton>
        </TopRow>
        <TagRow>
          <Tag>성적 {gpa}</Tag>
          <Tag>소득분위 {incomeLevel}</Tag>
        </TagRow>
      </Card>
    </PageWrapper>
  );
}