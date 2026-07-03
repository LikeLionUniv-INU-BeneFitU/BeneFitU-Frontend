import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 '/benefit-all'인지 확인하여 활성화 스타일 적용
  const isBenefitActive = location.pathname === '/benefit-all';

  return (
    <FooterContainer>
      <NavItem
        onClick={() => navigate('/benefit-all')}
        $active={isBenefitActive}
      >
        <IconBox $active={isBenefitActive} />
        <NavLabel>혜택</NavLabel>
      </NavItem>

      <NavItem onClick={(e) => e.preventDefault()}>
        <IconBox />
        <NavLabel>홈</NavLabel>
      </NavItem>

      <NavItem onClick={(e) => e.preventDefault()}>
        <IconBox />
        <NavLabel>MY</NavLabel>
      </NavItem>
    </FooterContainer>
  );
};

export default Footer;

/* 스타일 정의 */
const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom); /* 모바일 하단 바 대응 */
  z-index: 1000;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  height: 100%;

  /* 활성화 여부나 마우스 오버에 따른 스타일 피드백 (필요시 조정) */
  opacity: ${(props) => (props.$active ? 1 : 0.65)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const IconBox = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid ${(props) => (props.$active ? '#000000' : '#8e8e93')};
  border-radius: 6px;
  background-color: #ffffff;
  margin-bottom: 2px;
`;

const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;
