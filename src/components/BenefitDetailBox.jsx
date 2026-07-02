import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 80%;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
`;

const MoveButton = styled.button`
  width: 100%;
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
`;

export default function DetailBox({ children, buttonText, to }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Box>{children}
      <MoveButton onClick={() => navigate(to)}>
        {buttonText}
      </MoveButton>
      </Box>
    </PageWrapper>
  );
}