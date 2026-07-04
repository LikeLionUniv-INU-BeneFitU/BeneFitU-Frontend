import styled from 'styled-components';

// 전체 모바일 뷰 레이아웃 (기존 디자인 톤 유지)
export const PageWrapper = styled.div`
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fafaff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const ContentContainer = styled.main`
  flex: 1;
  padding: 20px 24px 120px 30px; /* 안내 페이지 특성에 맞춰 상단 여백을 조금 더 여유롭게 조절 */
  display: flex;
  flex-direction: column;
`;

// "맞춤 혜택 추천을 위해..." 상단 타이틀
export const MainTitle = styled.span`
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.4;
  color: #111111;
  margin-top: 10vh;
  margin-bottom: 36px; /* 타이틀과 컨텐츠 사이 거리 확보 */
`;

// 특장점 아이템들을 감싸는 컨테이너
export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px; /* 와이어프레임 레이아웃 배치에 맞춘 아이템 간격 */
`;

// 개별 특장점 행 (로고 + 텍스트)
export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start; /* 타이틀 첫 줄에 로고 상단 정렬 맞춤 */
  gap: 18px;
`;

// 와이어프레임 속 회색 로고 이미지 들어갈 자리 (정사각형 도형)
export const LogoPlaceholder = styled.div`
  width: 54px;
  height: 54px;
  background-color: #d9d9d9; /* 와이어프레임의 연한 회색 박스 재현 */
  border-radius: 4px; /* 미세한 라운딩 처리 */
  flex-shrink: 0; /* 내부 텍스트가 길어져도 구겨지지 않도록 고정 */
`;

// 텍스트 정렬 그룹
export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// 특장점 제목 (정확한 추천, 더 많은 혜택 등)
export const FeatureTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

// 특장점 본문 설명
export const FeatureDesc = styled.p`
  font-size: 1.25rem;
  line-height: 1.45;
  color: #4a4a4a; /* 제목보다 살짝 연한 톤으로 시선 분산 방지 */
  margin: 0;
`;

// 하단 고정 버튼 배경 그라데이션 및 배치 (기존 코드 완벽 이식)
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #fafaff 80%, rgba(250, 250, 255, 0) 100%);
  z-index: 10;
`;
