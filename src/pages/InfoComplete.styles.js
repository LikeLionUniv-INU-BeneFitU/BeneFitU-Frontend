import styled from 'styled-components';

// 전체 모바일 뷰 레이아웃 (기존 디자인 유지)
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
  padding: 80px 24px 60px 24px; /* 하단 2단 버튼 컴포넌트 높이를 고려해 하단 여백 확대 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 본문 내용 중앙 정렬 */
`;

// "맞춤 추천이 완료됐어요!" 상단 타이틀
export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111111;
  text-align: center;
  margin-bottom: 40px;
`;

// 그래픽 영역 정렬을 위한 컨테이너
export const GraphicWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

// 와이어프레임 속 중앙 둥근 회색 일러스트 영역
export const CompleteGraphic = styled.div`
  width: 180px;
  height: 180px;
  background-color: #d9d9d9; /* 와이어프레임 회색 톤 반영 */
  border-radius: 48px; /* 와이어프레임 특유의 많이 둥근 모서리 표현 */
`;

// 하단 설명 안내 문구
export const DescriptionText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #444444;
  text-align: center;
  margin: 0;

  span {
    font-weight: 700;
    color: #111111;
  }
`;

// 하단 고정 버튼 2개를 묶어주는 공간 (그라데이션 포함)
export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #fafaff 85%, rgba(250, 250, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  gap: 12px; /* 상단 메인 버튼과 하단 홈 이동 버튼 간격 */
  z-index: 10;
`;
