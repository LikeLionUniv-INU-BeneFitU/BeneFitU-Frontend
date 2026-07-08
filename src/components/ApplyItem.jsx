import React from 'react';
import styled from 'styled-components';

const BenefitApplicationItem = ({ title, date, status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'SELECTED':
        return { text: '선정', bg: '#EBEBEB', color: '#111111' };
      case 'NOT_SELECTED':
        return { text: '미선정', bg: '#EBEBEB', color: '#767676' };
      case 'UNDER_REVIEW':
      default:
        return { text: '심사 중', bg: '#EBEBEB', color: '#111111' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <CardContainer>
      <TextContainer>
        <Title>{title}</Title>
        <DateText>신청일 : {date}</DateText>
      </TextContainer>
      <StatusBadge $bgColor={config.bg} $textColor={config.color}>
        {config.text}
      </StatusBadge>
    </CardContainer>
  );
};

export default BenefitApplicationItem;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 369px;
  height: 10vh;
  padding: 0 16px;
  background-color: #ffffff;
  border: 1px solid #fafbff;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin: 8px auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  overflow: hidden;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.span`
  font-size: 0.9rem;
  color: #4a4a4a;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 60px;
  height: 27px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
`;
