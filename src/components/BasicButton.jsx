import styled from 'styled-components';

const StyledBtn = styled.button`
  width: 100%;
  height: 56px;
  padding: 16px 44px;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.$variant === 'white' ? '#ffffff' : 'rgb(88, 79, 234)')};
  color: ${(props) => (props.$variant === 'white' ? '#111111' : 'rgb(255, 255, 255)')};
  border: ${(props) => (props.$variant === 'white' ? '1px solid #111111' : '1px solid rbb(88, 79, 234)')};

  /*transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
    &:active {
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.3);
  }*/
`;

const BasicButton = ({ onClick, children, variant }) => {
  return (
    <StyledBtn onClick={onClick} $variant={variant}>
      {children}
    </StyledBtn>
  );
};

export default BasicButton;
