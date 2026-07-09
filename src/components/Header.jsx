import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header({ title, onBack, variant = 'defalt' }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      // 부모 컴포넌트에서 커스텀 루트나 함수를 지정했다면 실행
      onBack();
    } else {
      // 별도로 지정하지 않았다면 단순히 이전 페이지로 이동
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
        {/* 와이어프레임의 < 모양 아이콘 (SVG로 깔끔하게 처리) */}
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
      {/* 우측 공백 밸런스를 맞추기 위한 빈 더미 공간 */}
      <EmptySpace />
    </HeaderContainer>
  );
}

// --- Styled Components (와이어프레임 기준 모바일 맞춤 스타일) ---
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 56px; /* 일반적인 모바일 상단 헤더 표준 높이 */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;

  background-color: ${(props) => (props.$variant === 'purple' ? '#6c63ff' : '#ffffff')};
  border-bottom: ${(props) => (props.$variant === 'purple' ? '1px solid #6c63ff' : '1px solid #8e89e3')};
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
  /* 절대적인 가운데 정렬을 보장하기 위한 설정 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const EmptySpace = styled.div`
  width: 32px; /* BackButton과 좌우 대칭을 맞추기 위한 크기 */
`;
