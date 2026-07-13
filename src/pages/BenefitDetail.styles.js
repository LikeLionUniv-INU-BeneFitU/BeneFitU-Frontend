import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #F1F0FF;
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 설명박스
export const InfoBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
// 장학금이름
export const Title = styled.h1`
  font-size: 24px;
  letter-spacing: -1px;
  font-weight: 600;
  letter-spacing: -1px;
  word-break: keep-all;
`;

export const Amount = styled.p`
  color: #2578b0;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -1px;
  margin: 16px 0 20px 0;
`;

export const Rowbox = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

// 마감기한
export const Deadline = styled.p`
  color: #4a4a4a;
  font-size: 18px;
  letter-spacing: -1px;
  margin: 0 10px 20px 0;
`;
export const Deadlinenum = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -1px;
  margin-bottom: 20px;
`;

export const RequirementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RequirementItem = styled.div`
  font-size: 14px;
  letter-spacing: -1px;
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

// 추천이유 박스
export const ReasonBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
export const ReasonTitle = styled.h3`
  font-size: 24px;
  letter-spacing: -1px;
  font-weight: 700;
  margin-bottom: 16px;
`;
export const ReasonText = styled.p`
  font-size: 18px;
  letter-spacing: -1px;
  color: #4A4A4A;
`;

// 지원가능성 박스
export const ProbabilityBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
`;
export const ProbabilityTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const ProbabilityLabel = styled.p`
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: 700;
  color: #4a4a4a;
`;
export const ProbabilityBarBg = styled.div`
  width: 100%;
  height: 10px;
  background-color: #eeeeef;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 18px;
`;
export const ProbabilityBarFill = styled.div`
  width: ${(props) => props.$percent}%;
  height: 100%;
  background-color: #68b978;
`;
export const ProbabilityPercent = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;
export const ProbabilityPlaceholder = styled.p`
  text-align: center;
  color: #828282;
  font-size: 14px;
`;

// 버튼
export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

// 사이트로 이동, 신청 완료 버튼
export const DetailButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.disabled
      ? '#9d9d9d'
      : props.$variant === 'white'
        ? '#ffffff'
        : 'rgb(88, 79, 234)'};
  color: ${(props) =>
    props.disabled
      ? '#ffffff'
      : props.$variant === 'white'
        ? '#584FEA'
        : 'rgb(255, 255, 255)'};
  border: ${(props) =>
    props.disabled
      ? '1px solid #9d9d9d'
      : props.$variant === 'white'
        ? '1px solid #584FEA'
        : '1px solid rgb(88, 79, 234)'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
