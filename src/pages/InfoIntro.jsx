import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoIntro.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

export default function InfoIntro() {
  const navigate = useNavigate();

  // '정보 입력 시작' 버튼 클릭 시 다음 단계(정보 입력 폼)로 이동
  const handleStart = () => {
    navigate('/basic-info'); // 프로젝트 라우팅 환경에 맞게 주소를 수정하세요.
  };

  return (
    <S.PageWrapper>
      <S.ContentContainer>
        {/* 메인 타이틀 */}
        <S.MainTitle>
          맞춤 혜택 추천을 위해
          <br />
          정보를 입력해주세요
        </S.MainTitle>

        {/* 특장점 소개 리스트 */}
        <S.FeatureList>
          {/* 1. 정확한 추천 */}
          <S.FeatureItem>
            <S.LogoPlaceholder />
            <S.TextGroup>
              <S.FeatureTitle>정확한 추천</S.FeatureTitle>
              <S.FeatureDesc>
                내 정보를 기반으로 딱 맞는
                <br />
                혜택을 추천해드려요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>

          {/* 2. 더 많은 혜택 */}
          <S.FeatureItem>
            <S.LogoPlaceholder />
            <S.TextGroup>
              <S.FeatureTitle>더 많은 혜택</S.FeatureTitle>
              <S.FeatureDesc>
                놓치고 있던 다양한 장학금과
                <br />
                지원금을 확인할 수 있어요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>

          {/* 3. 간편한 신청 관리 */}
          <S.FeatureItem>
            <S.LogoPlaceholder />
            <S.TextGroup>
              <S.FeatureTitle>간편한 신청 관리</S.FeatureTitle>
              <S.FeatureDesc>
                신청 현황과 필요한 서류를
                <br />
                한눈에 관리할 수 있어요.
              </S.FeatureDesc>
            </S.TextGroup>
          </S.FeatureItem>
        </S.FeatureList>

        {/* 하단 고정 버튼 영역 */}
        <S.ButtonWrapper>
          <BasicButton onClick={handleStart}>다음</BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
