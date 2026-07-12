import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoIntro.styles';
import BasicButton from '../components/BasicButton';
import Infointro1 from '../assets/images/infointro1.png';
import Infointro2 from '../assets/images/infointro2.png';
import Infointro3 from '../assets/images/infointro3.png';
import Infointro4 from '../assets/images/infointro4.png';

export default function InfoIntro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/basic-info');
  };

  return (
    <S.PageWrapper>
      <S.MainContentBox>
        <S.MainTitle>
          맞춤 혜택 추천을 위해
          <br />
          정보를 입력해주세요
        </S.MainTitle>

        <S.ImageSection>
          <img src={Infointro1} alt="메인 일러스트" />
        </S.ImageSection>

        <S.FeatureList>
          <S.FeatureItem>
            <S.LogoPlaceholder>
              <img src={Infointro2} alt="정확한 추천" />
            </S.LogoPlaceholder>
            <S.TextGroup>
              <S.FeatureTitle>정확한 추천</S.FeatureTitle>
              <S.FeatureDesc>
                내 정보를 기반으로 딱 맞는 혜택을 추천해드려요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>

          <S.FeatureItem>
            <S.LogoPlaceholder>
              <img src={Infointro3} alt="더 많은 혜택" />
            </S.LogoPlaceholder>
            <S.TextGroup>
              <S.FeatureTitle>더 많은 혜택</S.FeatureTitle>
              <S.FeatureDesc>
                놓치고 있던 다양한 장학금과 지원금을 확인할 수 있어요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>

          <S.FeatureItem>
            <S.LogoPlaceholder>
              <img src={Infointro4} alt="간편한 신청 관리" />
            </S.LogoPlaceholder>
            <S.TextGroup>
              <S.FeatureTitle>간편한 신청 관리</S.FeatureTitle>
              <S.FeatureDesc>
                신청 현황과 필요한 서류를 한눈에 관리할 수 있어요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>
        </S.FeatureList>
      </S.MainContentBox>
      \
      <S.ButtonWrapper>
        <BasicButton onClick={handleStart}>다음</BasicButton>
      </S.ButtonWrapper>
    </S.PageWrapper>
  );
}
