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

export const MainContentBox = styled.div`
  width: 100%;
  max-height: 50vh;
  height: 100%;
  margin-top: calc(150 * (100dvh / 874));
  padding: 0 38px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: flex-start;
  gap: 3.5vh;
  flex-grow: 1;

  @media (max-height: 680px) {
    margin-top: 15vh;
    gap: 2.5vh;
  }
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111111;
  text-align: center;
  margin: 0;
  letter-spacing: -1.5px;
  flex-shrink: 0;

  span {
    color: #5d5fef;
  }
`;

export const GraphicWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 23vh;
  max-height: 200px;
  flex-shrink: 0;
  margin-top: calc(56 * (100dvh / 874));
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

// 하단 설명 안내 문구
export const DescriptionText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -1px;
  color: #444444;
  text-align: center;
  margin: 0;
  word-break: keep-all;
  flex-shrink: 0;
`;

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
