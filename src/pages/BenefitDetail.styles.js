import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #E9E6FF;
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 공통 박스 스타일 (3개 박스가 다 흰색 + 둥근 모서리 + 그림자)
export const InfoBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const ReasonBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const ProbabilityBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;

export const Tag = styled.span`
  background-color: #EEEEEF;
  color: #4A4A4A;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 1rem;
`;

export const Amount = styled.p`
  color: #2578B0;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 10px 0 10px;
`;

export const Rowbox = styled.div`
  display: flex;
  margin-bottom: 5px;

  
`;

export const Deadline = styled.p`
  color: #4A4A4A;
  font-size: 1.2rem;
  margin-right: 10px;
`;

export const Deadlinenum = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const RequirementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RequirementItem = styled.div`
  font-size: 0.8rem;
  color: #333333;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;

  input {
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

export const ReasonTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const ReasonText = styled.p`
  font-size: 0.875rem;
  color: #4A4A4A;
`;

export const ProbabilityLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

export const ProbabilityBarBg = styled.div`
  width: 100%;
  height: 10px;
  background-color: #EEEEEF;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProbabilityBarFill = styled.div`
  width: ${(props) => props.$percent}%;
  height: 100%;
  background-color: #68B978;
`;

export const ProbabilityPercent = styled.p`
  text-align: right;
  font-size: 0.85rem;
  color: #584FEA;
  margin-top: 4px;
`;

export const ProbabilityPlaceholder = styled.p`
  text-align: center;
  color: #828282;
  font-size: 0.9rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;