import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBenefitActive = location.pathname === '/benefit';

  return (
    <FooterContainer>
      <NavItem onClick={() => navigate('/benefit')} $active={isBenefitActive}>
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
  padding-bottom: env(safe-area-inset-bottom);
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
