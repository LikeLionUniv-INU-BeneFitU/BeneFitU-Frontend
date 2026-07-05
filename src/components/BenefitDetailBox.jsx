import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 98%;

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

const KwordBox = styled.div`
  width: 50px;
  height: 20px;

  background-color: #D9D9D9;

  border-radius: 5px;
  padding: 10px;
  margin-right: 5px;
  margin-top: 5px;
`;

const MoveButton = styled.button`
  width: 100%;
  height: 40px;

  background-color: #DFFFFFF;
  border: 1px solid #584FEA;

  border-radius: 5px;
  padding: 10px;
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
          <Columnbox>
            {children}
            <Rowbox>
              <KwordBox />
              <KwordBox />
            </Rowbox>
          </Columnbox>
        </Rowbox>
        
        <MoveButton onClick={() => navigate(to)}>{buttonText}</MoveButton>
      </Box>
    </PageWrapper>
  );
}