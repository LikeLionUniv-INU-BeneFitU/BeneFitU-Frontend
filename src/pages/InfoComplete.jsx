import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoComplete.styles';
import BasicButton from '../components/BasicButton';
import Infocomplete from '../assets/images/infocomplete.png';

export default function InfoComplete() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('김도현');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const savedData = localStorage.getItem('signUp_basicInfo');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.name) {
            setUserName(parsed.name);
          }
        }
      } catch (error) {
        console.error('사용자 이름을 불러오는 중 오류 발생:', error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <S.PageWrapper>
      {/* ⭐️ 타이틀부터 하단 설명글까지 묶어 60vh로 제한하는 반응형 박스 */}
      <S.MainContentBox>
        {/* 1. 메인 타이틀 */}
        <S.MainTitle>
          <span>맞춤 추천</span>이 완료됐어요!
        </S.MainTitle>

        {/* 2. 중앙 일러스트 이미지 */}
        <S.GraphicWrapper>
          <img src={Infocomplete} alt="추천 완료 일러스트" />
        </S.GraphicWrapper>

        {/* 3. 하단 설명 문구 */}
        <S.DescriptionText>
          입력해주신 정보를 바탕으로
          <br />
          {userName} 님에게 딱 맞는 혜택을 추천해드릴게요.
        </S.DescriptionText>
      </S.MainContentBox>

      {/* ⭐️ 4. 원본 그대로 유지되는 하단 고정 버튼 영역 */}
      <S.ButtonContainer>
        <BasicButton onClick={() => navigate('/benefit')}>
          맞춤 혜택 보러가기
        </BasicButton>

        <BasicButton variant="white" onClick={() => navigate('/home')}>
          홈화면으로 돌아가기
        </BasicButton>
      </S.ButtonContainer>
    </S.PageWrapper>
  );
}
