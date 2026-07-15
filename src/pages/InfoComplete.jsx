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
        const response = await api.get('/api/users/info', { headers });

        if (response.data.isSuccess) {
          const name = response.data.result?.baseInfo?.name;
          if (name) {
            setUserName(name);
          }
        }
      } catch (error) {
        console.error('사용자 이름을 불러오는 중 오류 발생:', error);

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
      <S.MainContentBox>
        <S.MainTitle>
          <span>맞춤 추천</span>이 완료됐어요!
        </S.MainTitle>
        <S.GraphicWrapper>
          <img src={Infocomplete} alt="추천 완료 일러스트" />
        </S.GraphicWrapper>

        <S.DescriptionText>
          입력해주신 정보를 바탕으로
          <br />
          {userName} 님에게 딱 맞는 혜택을 추천해드릴게요.
        </S.DescriptionText>
      </S.MainContentBox>

      <S.ButtonContainer>
        <BasicButton onClick={() => navigate('/benefit')}>
          맞춤 혜택 보러가기
        </BasicButton>

        <BasicButton variant={'white'} onClick={() => navigate('/home')}>
          홈화면으로 돌아가기
        </BasicButton>
      </S.ButtonContainer>
    </S.PageWrapper>
  );
}
