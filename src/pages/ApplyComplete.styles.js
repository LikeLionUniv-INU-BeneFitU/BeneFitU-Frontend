import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  background-color: #fafaff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

// ⭐️ 피그마 속 334x372 허그 박스의 비율을 칼같이 지키는 컨테이너
export const MainContentBox = styled.div`
  width: 100%;
  /* 874px 중 372px의 비율인 약 43vh를 최대 높이로 타이트하게 제한 */
  max-height: 50vh;
  height: 100%;

  /* 💡 조건 3: 기준폰(874px)의 183px 여백을 정확하게 21vh 비율로 반영 */
  margin-top: calc(150 * (100dvh / 874));
  padding: 0 38px; /* 양옆 여백을 넓혀 시안의 컴팩트한 너비감 재현 */
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* 요소들끼리 무작정 흩어지지 않도록 고정하고, 피그마의 내부 마진 비율 이식 */
  justify-content: flex-start;
  gap: 3.5vh;

  flex-grow: 1;

  /* 작은 화면(세로 680px 이하) 브레이크 포인트 진입 시 전체 스케일 축소 */
  @media (max-height: 680px) {
    margin-top: 15vh;
    gap: 2.5vh;
  }
`;

// "신청이 완료됐어요!" 상단 타이틀
export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111111;
  text-align: center;
  margin: 0;
  letter-spacing: -0.5px;
  flex-shrink: 0;
`;

// 중앙 일러스트 영역: 무작정 100% 채우지 않고 피그마 원본 크기 비율 유지
export const GraphicWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* 피그마 속 일러스트 비율에 맞게 구역 한계 설정 */
  height: 23vh;
  max-height: 300px;
  flex-shrink: 0;
  margin-top: calc(80 * (100dvh / 874));
  margin-bottom: calc(20 * (100dvh / 874));

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }

  @media (max-height: 680px) {
    height: 18vh;
  }
`;

// ⭐️ 조건 1: 원래 작성했던 하단 절대 고정 및 패딩, 그라데이션 완벽 수호
export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #fafaff 85%, rgba(250, 250, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;
