import styled from 'styled-components';

// 모바일 웹앱 레이아웃 감싸기 (배경색 및 정렬)
export const PageWrapper = styled.div`
  max-width: 450px; /* 전형적인 모바일 뷰 너비 제한 */
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fafaff; /* 와이어프레임의 아주 연한 보랏빛/회색빛 톤 반영 */
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05); /* 모니터 확인용 테두리 음영 */
`;

export const ContentContainer = styled.main`
  flex: 1;
  padding: 24px 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #111111;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #999999; /* 와이어프레임의 선명한 테두리 느낌 반영 */
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #ffffff;
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2; /* 포인트 테마 컬러 (하단 다음 버튼 색상 계열) */
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 40px; /* 이름 입력창과 버튼 사이의 간격 격리 */
`;

export const SelectBox = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const SelectText = styled.span`
  font-size: 14px;
  color: ${(props) => (props.isSelected ? '#000' : '#BBB')};
`;

export const ArrowIcon = styled.span`
  font-size: 12px;
  color: #888;
`;

export const GradeSelectorContainer = styled.div`
  display: flex;
  border: 1px solid #a0a0a0;
  border-radius: 6px;
  overflow: hidden;
`;

export const GradeButton = styled.button`
  flex: 1;
  height: 40px;
  background-color: ${(props) => (props.isActive ? '#000' : '#FFF')};
  color: ${(props) => (props.isActive ? '#FFF' : '#000')};
  border: none;
  border-right: 1px solid #a0a0a0;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    border-right: none;
  }
`;

// 모달 스타일 예시
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 80%;
  max-width: 340px;

  /* 💡 전체 모달 창이 화면 높이의 80%를 넘지 않도록 설정 */
  max-height: 80vh;
  display: flex;
  flex-direction: column; /* 내부 요소들을 세로로 정렬 */
`;

export const ModalList = styled.div`
  margin-top: 16px;

  /* 💡 핵심: 리스트 영역이 차지할 수 있는 남은 공간을 채우고, 넘치면 스크롤 생성 */
  flex: 1;
  overflow-y: auto;
  padding-right: 4px; /* 스크롤바와 버튼이 겹치지 않도록 여백 */

  /* 스크롤바 스타일 커스텀 (선택 사항: 깔끔하게 보이기 위함) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #eee;
    background: #f9f9f9;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const ModalCloseButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border: none;
  background: #eee;
  border-radius: 6px;
  cursor: pointer;
`;

//OtherInfo.jsx 스타일 코드
// 소득분위용 select 기본 스타일 (기존 Input/SelectBox 디자인 톤앤매너 매칭)
export const SelectStyle = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  color: #111111;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;

  &:invalid {
    color: #bbbbbb;
  }
`;

// 학점 레이아웃 컨테이너
export const GpaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 너비를 콤팩트하게 제한한 학점 전용 select 박스
export const CompactSelect = styled(SelectStyle)`
  width: 80px; /* 기존 100%에서 와이어프레임 비율에 맞게 축소 */
  text-align: center;
  background-position: right 10px center;
  padding: 0 24px 0 12px;
`;

export const Dot = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

// 관심분야 3열 정렬 Grid
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  column-gap: 8px;
  margin-top: 6px;
`;

// 네모 체크박스 라벨 컴포넌트
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #111111;
  cursor: pointer;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    border: 1px solid #999999;
    border-radius: 4px;
    cursor: pointer;
    accent-color: #5c4ff2; /* BasicInfo 포커스 포인트 컬러와 통일 */
  }

  span {
    white-space: nowrap;
  }
`;
