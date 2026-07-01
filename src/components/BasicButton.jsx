import styled from 'styled-components';

const StyledBtn = styled.button`
  width: 100%;
  height: 56px;
  padding: 16px 44px;
  border: 1px solid #999999; /* 와이어프레임의 선명한 테두리 느낌 반영 */
  border-radius: 8px;

  background-color: rgb(88, 79, 234);
  //box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  font-size: 20px;
  color: rgb(255, 255, 255);
  /*transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;*/

  display: flex;
  align-items: center;
  justify-content: center;

  /*&:active {
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.3);
  }*/
`;

const BasicButton = ({ onClick, children }) => {
  return (
    <StyledBtn onClick={onClick} $content={children}>
      {children}
    </StyledBtn>
  );
};

export default BasicButton;
