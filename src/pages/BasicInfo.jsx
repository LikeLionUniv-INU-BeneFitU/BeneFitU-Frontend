import React, { useState } from 'react';
import * as S from './BasicInfo.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

export default function BasicInfo() {
  const [name, setName] = useState('');

  return (
    <S.PageWrapper>
      {/* 1. 상단 헤더 (변수 처리 및 뒤로가기 지정) */}
      <Header title="기본 정보 입력" />

      {/* 2. 본문 컨텐츠 */}
      <S.ContentContainer>
        <S.FormGroup>
          <S.Label>이름</S.Label>
          <S.Input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.FormGroup>
        {/* 2. 이름 입력 폼 아래에 배치 (여백 처리를 위해 임시로 스타일을 주거나 감싸도 좋습니다) */}
        <S.ButtonWrapper>
          <BasicButton onClick={() => {}}>다음 </BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
