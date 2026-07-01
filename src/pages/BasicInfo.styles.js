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
