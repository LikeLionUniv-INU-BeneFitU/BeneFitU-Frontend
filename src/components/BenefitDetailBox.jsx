import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 90%;

  background-color: #FFFFFF;
  
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);

  padding: 15px;
  gap: 10px;

  display: flex;
  flex-direction: column;
`;

const Rowbox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Columnbox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoveButton = styled.button`
  width: 100%;

  background-color: #D9D9D9;

  border-radius: 12px;
  padding: 15px;
`;

const BenefitIcon = styled.button`
  width: 50px;
  height: 50px;

  background-color: #D9D9D9;

  border-radius: 50%;
  padding: 20px;
  margin-right: 15px;
`;



export default function DetailBox({ children, buttonText, to }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Box>
        <Rowbox>
        <BenefitIcon></BenefitIcon>
        <Columnbox>{children}</Columnbox>
        </Rowbox>
        <MoveButton onClick={() => navigate(to)}>{buttonText}</MoveButton>
      </Box>
    </PageWrapper>
  );
}