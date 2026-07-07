import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #E9E6FF;
`;

export const ContentWrapper = styled.div`
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
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
`;

export const Amount = styled.p`
  color: #2578B0;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 10px 0 4px;
`;

export const Deadline = styled.p`
  color: #4A4A4A;
  font-size: 0.85rem;
  margin-bottom: 20px;
`;

export const RequirementBox = styled.div`
  background-color: #F8F7FF;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const RequirementItem = styled.p`
  font-size: 0.85rem;
  margin: 6px 0;
`;

export const ReasonTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const ReasonText = styled.p`
  font-size: 0.875rem;
  color: #4A4A4A;
  margin-bottom: 20px;
`;

export const ProbabilityLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 8px;
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
  background-color: #584FEA;
`;

export const ProbabilityPercent = styled.p`
  text-align: right;
  font-size: 0.85rem;
  color: #584FEA;
  margin: 4px 0 30px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;