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
  font-size: clamp(25.43px, calc(25.43px + (32 - 25.43) * ((100vw - 320px) / 83)), 32px);
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
  font-size: clamp(12.71px, calc(12.71px + (16 - 12.71) * ((100vw - 320px) / 83)), 16px);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: clamp(0.8rem, 4vw, 1rem);
`;

export const Amount = styled.p`
  color: #2578B0;
  font-weight: bold;
  ont-size: clamp(19.07px, calc(19.07px + (24 - 19.07) * ((100vw - 320px) / 83)), 24px);
  margin: 10px 0 10px;
`;

export const Rowbox = styled.div`
  display: flex;
  margin-bottom: 5px;

  
`;

export const Deadline = styled.p`
  color: #4A4A4A;
  font-size: clamp(15.26px, calc(15.26px + (19.2 - 15.26) * ((100vw - 320px) / 83)), 19.2px);
  margin-right: 10px;
`;

export const Deadlinenum = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: clamp(19.07px, calc(19.07px + (24 - 19.07) * ((100vw - 320px) / 83)), 24px);
`;

export const RequirementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RequirementItem = styled.div`
  font-size: clamp(10.17px, calc(10.17px + (12.8 - 10.17) * ((100vw - 320px) / 83)), 12.8px);
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
  font-size: clamp(12.71px, calc(12.71px + (16 - 12.71) * ((100vw - 320px) / 83)), 16px);
  font-weight: 700;
  margin-bottom: 8px;
`;

export const ReasonText = styled.p`
  font-size: clamp(11.12px, calc(11.12px + (14 - 11.12) * ((100vw - 320px) / 83)), 14px);
  color: #4A4A4A;
`;

export const ProbabilityTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProbabilityLabel = styled.p`
  font-size: clamp(15.26px, calc(15.26px + (19.2 - 15.26) * ((100vw - 320px) / 83)), 19.2px);
  font-weight: 700;
  color: #4A4A4A;
`;

export const ProbabilityBarBg = styled.div`
  width: 100%;
  height: 10px;
  background-color: #EEEEEF;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 18px;
`;

export const ProbabilityBarFill = styled.div`
  width: ${(props) => props.$percent}%;
  height: 100%;
  background-color: #68B978;
`;

export const ProbabilityPercent = styled.p`
  font-size: clamp(15.26px, calc(15.26px + (19.2 - 15.26) * ((100vw - 320px) / 83)), 19.2px);
  font-weight: 700;
  color: #000000;
`;

export const ProbabilityPlaceholder = styled.p`
  text-align: center;
  color: #828282;
  font-size: clamp(11.44px, calc(11.44px + (14.4 - 11.44) * ((100vw - 320px) / 83)), 14.4px);
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

// 버튼
export const DetailButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  font-size: clamp(12.71px, calc(12.71px + (16 - 12.71) * ((100vw - 320px) / 83)), 16px);
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
        ? '#584FEA'                 /* white 버튼 글자색: 보라색으로 변경 */
        : 'rgb(255, 255, 255)'};
  border: ${(props) =>
    props.disabled
      ? '1px solid #9d9d9d'
      : props.$variant === 'white'
        ? '1px solid #584FEA'       /* white 버튼 테두리: 보라색으로 변경 */
        : '1px solid rgb(88, 79, 234)'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;