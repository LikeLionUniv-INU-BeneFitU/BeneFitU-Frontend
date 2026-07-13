import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoComplete.styles';
import BasicButton from '../components/BasicButton';
import Infocomplete from '../assets/images/infocomplete.png';
import api from '../api/axios';

export default function InfoComplete() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        // 사용자 정보 조회 API 호출
        const response = await api.get('/api/users/info', { headers });

        if (response.data.isSuccess) {
          const name = response.data.result?.baseInfo?.name;
          if (name) {
            setUserName(name);
          }
        }
      } catch (error) {
        console.error('사용자 이름을 불러오는 중 오류 발생:', error);

        // 백엔드 연동 실패 시 서비스 연속성을 위해 로컬스토리지 백업 데이터 탐색
        const savedData = localStorage.getItem('signUp_basicInfo');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.name) {
            setUserName(parsed.name);
          }
        }
      }
    };
    fetchUserName();
  }, []);

  return (
    <S.PageWrapper>
      {/* 타이틀부터 하단 설명글까지 묶어 60vh로 제한하는 반응형 박스 */}
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

      {/* 4. 하단 고정 버튼 영역 */}
      <S.ButtonContainer>
        <BasicButton onClick={() => navigate('/benefit')}>
          맞춤 혜택 보러가기
        </BasicButton>

        <BasicButton  onClick={() => navigate('/home')}>
          홈화면으로 돌아가기
        </BasicButton>
      </S.ButtonContainer>
    </S.PageWrapper>
  );
}
