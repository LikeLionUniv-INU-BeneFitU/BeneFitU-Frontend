import styled from 'styled-components';

// 모바일 웹앱 레이아웃 감싸기 (배경색 및 정렬)
export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh; /* 브라우저 화면 높이에 꽉 맞춤 */
  margin: 0 auto;
  background-color: #fbfbff;
  display: flex;
  flex-direction: column; /* 수직 배치: 헤더 -> 스크롤 영역 -> 버튼 */
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* 영역을 벗어나는 모든 부모 스크롤 방지 */
`;

export const ScrollArea = styled.div`
  flex: 1; /* 헤더와 버튼 wrapper를 제외한 나머지 화면을 전부 차지 */
  overflow-y: auto; /* 내용이 넘치면 이 안에서만 세로 스크롤 발생 */
  -webkit-overflow-scrolling: touch; /* 모바일 부드러운 스크롤 대응 */

  /* 스크롤바 커스텀 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
`;

export const ContentContainer = styled.main`
  padding: 5px 20px 50px 20px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #edeaff 80%, rgba(237, 234, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(8 * (100dvh / 874));
  margin-top: 10px;
`;

export const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
`;

export const Input = styled.input`
  width: 100%;
  height: calc(46 * (100dvh / 874));
  padding: 0 16px;
  border: 1px solid #828282; /* 와이어프레임의 선명한 테두리 느낌 반영 */
  border-radius: 5px;
  font-size: 0.875rem;
  background-color: #ffffff;
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2; /* 포인트 테마 컬러 (하단 다음 버튼 색상 계열) */
  }
`;

export const DateInput = styled(Input)`
  font-family: sans-serif;
  cursor: pointer;
  position: relative;

  /* 💡 값이 없을 때는 텍스트 색상을 다른 placeholder와 일치하는 회색(#BBB)으로 지정 */
  color: ${(props) => (props.hasValue ? '#000' : '#BBB')};

  /* iOS 등 일부 브라우저에서 date 인풋 서식이 깨지거나 투명해지는 현상 방지 */
  &::-webkit-datetime-edit {
    display: flex;
  }

  /* 년, 월, 일 글자 각각의 색상을 유기적으로 제어하기 위한 서식 (크롬/Vite 웹킷 계열 대응) */
  &::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }

  &::-webkit-datetime-edit-text,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field {
    color: ${(props) => (props.hasValue ? '#000' : '#BBB')};
  }

  /* 우측 내장 달력 아이콘 스타일 */
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const SelectBox = styled.div`
  width: 100%;
  height: calc(46 * (100dvh / 874));
  border: 1px solid #828282;
  border-radius: 5px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const SelectText = styled.span`
  font-size: 0.875rem;
  color: ${(props) => (props.isSelected ? '#000' : '#BBB')};
`;

export const ArrowIcon = styled.span`
  font-size: 12px;
  color: #888;
`;

export const GradeSelectorContainer = styled.div`
  display: flex;
  border: 1px solid #828282;
  border-radius: 5px;
  overflow: hidden;
`;

export const GradeButton = styled.button`
  flex: 1;
  height: calc(41 * (100dvh / 874));
  background-color: ${(props) => (props.isActive ? '#756df8' : '#FFF')};
  color: ${(props) => (props.isActive ? '#FFF' : '#000')};
  border: none;
  border-right: 1px solid #828282;
  font-size: 0.875rem;
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
  height: calc(46 * (100dvh / 874));
  padding: 0 16px;
  border: 1px solid #828282;
  border-radius: 5px;
  font-size: 0.875rem;
  background-color: #ffffff;
  color: ${(props) => (props.isSelected ? '#111111' : '#BBBBBB')};
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
  width: 70px; /* 기존 100%에서 와이어프레임 비율에 맞게 축소 */
  text-align: center;
  background-position: right 10px center;
  padding: 0 24px 0 12px;
`;

// 관심분야 2열 정렬 Grid
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(12 * (100dvh / 874));
  margin-top: 6px;
`;

export const InterestButton = styled.button`
  width: 100%;
  height: calc(46 * (100dvh / 874)); /* 기존 인풋창들과 높이 균형 유지 */
  border-radius: 20px; /* 요청하신 모서리 둥글기 값 20 */
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* 비활성화 vs 활성화 상태 스타일 분기 */
  background-color: ${(props) => (props.isActive ? '#756df8' : '#ffffff')};
  color: ${(props) => (props.isActive ? '#ffffff' : '#111111')};
  border: 1px solid #828282;

  &:hover {
    opacity: 0.9;
  }
`;
