import styled from 'styled-components';

const StyledBtn = styled.button`
  width: 100%;
  height: 56px;
  padding: 16px 44px;
  border-radius: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.disabled
      ? '#9d9d9d'
      : props.$variant === 'white'
        ? '#ffffff'
        : 'rgb(88, 79, 234)'};
  color: ${(props) => (props.$variant === 'white' ? '#111111' : 'rgb(255, 255, 255)')};
  border: ${(props) =>
    props.disabled ? '1px solid #9d9d9d' : '1px solid rgb(88, 79, 234)'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const BasicButton = ({ onClick, children, variant, disabled, style }) => {
  return (
    <StyledBtn
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      style={style}
    >
      {children}
    </StyledBtn>
  );
};

export default BasicButton;
