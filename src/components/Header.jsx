import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header({ title, onBack, variant = 'default' }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer $variant={variant}>
      <BackButton
        onClick={handleBackClick}
        aria-label="뒤로가기"
        $variant={variant}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </BackButton>
      <Title $variant={variant}>{title}</Title>
      <EmptySpace />
    </HeaderContainer>
  );
}

// 스타일 컴포넌트
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;

  background-color: ${(props) => (props.$variant === 'purple' ? '#6c63ff' : '#ffffff')};
  border-bottom: ${(props) => (props.$variant === 'purple' ? '1px solid #6c63ff' : props.$variant === 'white' ? '1px solid #fff' : '1px solid #8e89e3')};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$variant === 'purple' ? '#ffffff' : '#111111')};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => (props.$variant === 'purple' ? '#ffffff' : '#111111')};
  margin: 0;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const EmptySpace = styled.div`
  width: 32px;
`;
