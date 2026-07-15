import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  background-color: #fbfbff;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

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
  font-size: 1rem;
  font-weight: 700;
  color: #111111;
`;

export const Input = styled.input`
  width: 100%;
  height: calc(46 * (100dvh / 874));
  padding: 0 16px;
  border: 1px solid #828282;
  border-radius: 5px;
  font-size: 0.875rem;
  background-color: #ffffff;
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: #5c4ff2;
  }
`;

export const DateContainer = styled.div`
  position: relative;
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

export const DateText = styled.span`
  font-size: 0.875rem;
  color: ${(props) => (props.isSelected ? '#111111' : '#BBBBBB')};
`;

export const CalendarIcon = styled.span`
  font-size: 16px;
  color: #888;
  pointer-events: none;
  z-index: 2;
`;

export const HiddenDateInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
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

  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

export const ModalList = styled.div`
  margin-top: 16px;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

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

export const GpaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CompactSelect = styled(SelectStyle)`
  width: 70px;
  text-align: center;
  background-position: right 10px center;
  padding: 0 24px 0 12px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(12 * (100dvh / 874));
  margin-top: 6px;
`;

export const InterestButton = styled.button`
  width: 100%;
  height: calc(46 * (100dvh / 874));
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => (props.isActive ? '#756df8' : '#ffffff')};
  color: ${(props) => (props.isActive ? '#ffffff' : '#111111')};
  border: 1px solid #828282;

  &:hover {
    opacity: 0.9;
  }
`;
