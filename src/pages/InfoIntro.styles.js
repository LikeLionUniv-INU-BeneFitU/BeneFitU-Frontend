import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100dvh; /* 전체 화면 높이 꽉 채우기 */
  margin: 0 auto;
  background-color: linear-gradient(180deg, #edecff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const MainContentBox = styled.div`
  width: 100%;
  max-height: 70dvh;
  height: 100%;

  margin-top: calc(99 * (100dvh / 874));
  padding: 0 40px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;
`;

// 타이틀
export const MainTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: #111111;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 1.5rem; /* 최소 여백 확보 */
`;

// 중앙 일러스트 영역
export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; /* 남는 세로 공간을 차지 */
  min-height: 140px; /* 화면이 엄청 작아져도 유지할 최소 높이 */
  margin-bottom: 1.5rem;

  img {
    height: 100%;
    max-height: 220px; /* 피그마 일러스트 높이 수준으로 제한 */
    width: auto;
    object-fit: contain;
  }
`;

// 특장점 리스트 박스
export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem; /* 화면이 작아져도 깨지지 않을 최적의 간격 */
  margin-bottom: 1rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const LogoPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FeatureTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: #111111;
  margin: 0;
`;

export const FeatureDesc = styled.p`
  font-size: 0.85rem;
  letter-spacing: -1px;
  line-height: 1.4;
  color: #666666;
  margin: 0;
  word-break: keep-all;
`;

// 하단 버튼 영역 (콘텐츠 박스와 물리적으로 분리되어 하단에 깔끔하게 안착)
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #edeaff 80%, rgba(237, 234, 255, 0) 100%);
  /* 💡 그라데이션 배경색을 PageWrapper 배경색(#edeaff)과 통일하여 자연스럽게 매칭 */
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;
