import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  background-color: #faf6ff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const MainContentBox = styled.div`
  width: 100%;
  max-height: 70dvh;
  height: 100%;

  margin-top: calc(80 * (100dvh / 874));
  padding: 0 40px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;
`;

export const MainTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -1.5px;
  color: #111111;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 2dvh;
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 150px;
  margin-bottom: 2dvh;

  img {
    height: 100%;
    max-height: 220px;
    width: auto;
    object-fit: contain;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const LogoPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FeatureTitle = styled.h2`
  font-size: 1.15rem;
  letter-spacing: -1px;
  font-weight: 700;
  letter-spacing: -1.5px;
  color: #111111;
  margin: 0;
`;

export const FeatureDesc = styled.p`
  font-size: 0.8rem;
  letter-spacing: -1.3px;
  line-height: 1.4;
  font-weight: 500;
  color: #666666;
  margin: 0;
  word-break: keep-all;
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
