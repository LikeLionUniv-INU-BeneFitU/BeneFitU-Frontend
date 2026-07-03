import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoComplete.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

export default function InfoComplete() {
  const navigate = useNavigate();

  // 💡 백엔드 혹은 로컬스토리지에서 가져올 사용자 이름 상태 관리 (기본값: 더미 '도현')
  const [userName, setUserName] = useState('김도현');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        /* ==========================================
         * [백엔드 연동 구간] API 주소가 나오면 아래 주석을 해제하세요.
         * ==========================================
         * const response = await fetch('https://api.yourdomain.com/user/profile', {
         * method: 'GET',
         * headers: {
         * // 필요 시 Authorization 토큰 추가
         * },
         * });
         * if (response.ok) {
         * const data = await response.json();
         * if (data.name) {
         * setUserName(data.name); // 백엔드에서 받은 실제 이름 적용
         * return;
         * }
         * }
         * ========================================== */

        // 백엔드 연결 실패 혹은 주석 상태일 때의 Fallback 1: 로컬스토리지에서 이름 긁어오기
        const savedData = localStorage.getItem('signUp_basicInfo');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.name) {
            setUserName(parsed.name);
          }
        }
      } catch (error) {
        console.error('사용자 이름을 불러오는 중 오류 발생:', error);
        // Fallback 2: 오류 시 기존 userName 상태('도현') 유지
      }
    };

    fetchUserName();
  }, []);

  return (
    <S.PageWrapper>
      {/* 상단 헤더 (기존 컴포넌트 활용) */}
      <Header title="추천 완료" />

      <S.ContentContainer>
        {/* 메인 타이틀 */}
        <S.MainTitle>맞춤 추천이 완료됐어요!</S.MainTitle>

        {/* 중앙 큰 그래픽/일러스트 플레이스홀더 (와이어프레임 속 라운드 네모) */}
        <S.GraphicWrapper>
          <S.CompleteGraphic />
        </S.GraphicWrapper>

        {/* 설명 문구 구역 */}
        <S.DescriptionText>
          입력해주신 정보를 바탕으로
          <br />
          <span>{userName}</span> 님에게 딱 맞는 혜택을 추천해드릴게요.
        </S.DescriptionText>

        {/* 하단 고정 버튼 영역 (세로 2개 배치) */}
        <S.ButtonContainer>
          <BasicButton onClick={() => navigate('/benefit-all')}>
            맞춤 혜택 보러가기
          </BasicButton>

          <BasicButton variant="white" onClick={() => navigate('/')}>
            홈화면으로 돌아가기
          </BasicButton>
        </S.ButtonContainer>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
