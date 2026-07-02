import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px; /* 모바일 웹 뷰어 기준 가이드라인 */
  min-height: 100vh;
  background-color: #f8f9ff;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-bottom: 100px; /* 푸터 버튼 공간 확보 */
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 700;
  color: #000000;
`;

/* 학점 스타일 (창에서 바로 뜨는 Select 형태) */
export const GpaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  line-height: 1;
`;

/* 공통 Select 박스 스타일 */
export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #999999;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #333333;
  outline: none;
  appearance: none; /* 기본 브라우저 화살표 제거 후 커스텀 에셋 적용 가능 */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;

  &:italic {
    color: #b3b3b3;
  }
`;

/* 토글 버튼 디자인 (기초생활수급자 여부) */
export const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #666666;
  border-radius: 8px;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  flex: 1;
  height: 44px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ffffff' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#000000' : '#666666')};
  transition: all 0.2s ease;

  &:not(:last-child) {
    border-right: 1px solid #666666;
  }
`;

/* 관심분야 3열 Grid layout */
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 18px;
  column-gap: 8px;
  margin-top: 6px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #000000;
  cursor: pointer;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    border: 1px solid #333333;
    border-radius: 3px;
    cursor: pointer;
    accent-color: #5c4cee; /* 체크되었을 때 와이어프레임 메인 포인트 컬러 매칭 */
  }

  span {
    white-space: nowrap;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 40px;
`;
