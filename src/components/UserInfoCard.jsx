import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 90%;

  background-color: #D9D9D9;
  
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);

  padding: 15px;
  margin: 15px;
  gap: 10px;

  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const NameText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const MyButton = styled.button`
  background-color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 10px;
  cursor: pointer;
`;

const TagRow = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.span`
  font-size: 10px;
  background-color: #FFFFFF;
  color: #000000;
  padding: 4px 8px;
  border-radius: 5px;
`;

export default function UserInfoCard({ name, grade, incomeLevel, onMyClick }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Card>
        <TopRow>
          <NameText>{name}님의 정보</NameText>
          <MyButton onClick={() => navigate('/login-home')/*마이페이지로 바꾸기*/ }>MY Page</MyButton>
        </TopRow>
        <TagRow>
          <Tag>성적 {grade}</Tag>
          <Tag>소득분위 {incomeLevel}</Tag>
        </TagRow>
      </Card>
    </PageWrapper>
  );
}