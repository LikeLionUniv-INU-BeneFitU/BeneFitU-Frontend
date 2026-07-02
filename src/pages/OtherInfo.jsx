import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

export default function OtherInfo() {
  // 1. 로컬스토리지 초기 상태 설정 (BasicInfo의 하나의 객체 저장 방식과 통일)
  const initialFormState = {
    gpaInteger: '0',
    gpaDecimal: '5',
    incomeBracket: '',
    isVulnerable: false, // false: 해당 없음, true: 해당
    interests: {
      scholarship: false,
      youthSupport: false,
      contest: false,
      extracurricular: false,
      campusProgram: false,
      employmentProgram: false,
    },
  };

  // 2. useLocalStorage 훅 적용 (단일 객체 키로 깔끔하게 관리)
  const [formState, setFormState] = useLocalStorage(
    'signUp_otherInfo',
    initialFormState,
  );

  // 입력값 업데이트 공통 핸들러
  const handleInputChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  // 학점 정수(앞자리) 변경 시 예외처리 핸들러
  const handleGpaIntegerChange = (e) => {
    const nextInteger = e.target.value;
    let nextDecimal = formState.gpaDecimal;

    // 앞자리가 4인데 기존 소수점 뒷자리가 50을 초과하고 있다면 50으로 강제 조정 (4.5 만점 제한)
    if (nextInteger === '4' && parseInt(nextDecimal, 10) > 50) {
      nextDecimal = '50';
    }

    setFormState({
      ...formState,
      gpaInteger: nextInteger,
      gpaDecimal: nextDecimal,
    });
  };

  // 관심 분야 체크박스 핸들러
  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setFormState({
      ...formState,
      interests: {
        ...formState.interests,
        [name]: checked,
      },
    });
  };

  // 완료 버튼 클릭 시 (백엔드로 전송하거나 가공 처리)
  const handleSubmit = () => {
    const finalData = {
      gpa: `${formState.gpaInteger}.${formState.gpaDecimal}`,
      incomeBracket: formState.incomeBracket,
      isVulnerable: formState.isVulnerable,
      interests: Object.keys(formState.interests).filter(
        (key) => formState.interests[key],
      ),
    };

    console.log('로컬스토리지 최종본 제출:', finalData);
    // 이후 백엔드 전송 및 라우팅 로직 작성 구간
  };

  // 학점 정수 옵션 리스트 생성 (0 ~ 4)
  const integerOptions = Array.from({ length: 5 }, (_, i) => i);

  // 학점 소수점 옵션 리스트 동적 제어 (앞자리가 4이면 00~50까지만, 아니면 00~99까지)
  const maxDecimalLength = formState.gpaInteger === '4' ? 51 : 100;
  const decimalOptions = Array.from({ length: maxDecimalLength }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`,
  );

  return (
    <S.PageWrapper>
      <Header title="기타 정보 입력" />

      <S.ContentContainer>
        {/* 학점 입력 */}
        <S.FormGroup>
          <S.Label>학점(4.5 만점 기준)</S.Label>
          <S.GpaContainer>
            <S.CompactSelect
              value={formState.gpaInteger}
              onChange={(e) => handleInputChange('gpaInteger', e.target.value)}
            >
              {integerOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </S.CompactSelect>
            <S.Dot>.</S.Dot>
            <S.CompactSelect
              value={formState.gpaDecimal}
              onChange={(e) => handleInputChange('gpaDecimal', e.target.value)}
            >
              {decimalOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </S.CompactSelect>
          </S.GpaContainer>
        </S.FormGroup>

        {/* 소득 분위 */}
        <S.FormGroup>
          <S.Label>소득분위</S.Label>
          <S.SelectStyle
            value={formState.incomeBracket}
            onChange={(e) => handleInputChange('incomeBracket', e.target.value)}
          >
            <option value="" disabled hidden>
              소득분위를 선택해주세요
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}구간
              </option>
            ))}
          </S.SelectStyle>
        </S.FormGroup>

        {/* 기초생활수급자 / 차상위계층 여부 (세그먼트 탭 스타일 매칭) */}
        <S.FormGroup>
          <S.Label>기초생활수급자 / 차상위계층 여부</S.Label>
          <S.GradeSelectorContainer>
            <S.GradeButton
              type="button"
              isActive={!formState.isVulnerable}
              onClick={() => handleInputChange('isVulnerable', false)}
            >
              해당 없음
            </S.GradeButton>
            <S.GradeButton
              type="button"
              isActive={formState.isVulnerable}
              onClick={() => handleInputChange('isVulnerable', true)}
            >
              해당
            </S.GradeButton>
          </S.GradeSelectorContainer>
        </S.FormGroup>

        {/* 관심 분야 */}
        <S.FormGroup>
          <S.Label>관심 분야</S.Label>
          <S.GridContainer>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="scholarship"
                checked={formState.interests.scholarship}
                onChange={handleInterestChange}
              />
              <span>장학금</span>
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="youthSupport"
                checked={formState.interests.youthSupport}
                onChange={handleInterestChange}
              />
              <span>청년지원금</span>
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="contest"
                checked={formState.interests.contest}
                onChange={handleInterestChange}
              />
              <span>공모전</span>
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="extracurricular"
                checked={formState.interests.extracurricular}
                onChange={handleInterestChange}
              />
              <span>대외활동</span>
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="campusProgram"
                checked={formState.interests.campusProgram}
                onChange={handleInterestChange}
              />
              <span>교내 프로그램</span>
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <input
                type="checkbox"
                name="employmentProgram"
                checked={formState.interests.employmentProgram}
                onChange={handleInterestChange}
              />
              <span>취업 프로그램</span>
            </S.CheckboxLabel>
          </S.GridContainer>
        </S.FormGroup>

        {/* 하단 완료 버튼 */}
        <S.ButtonWrapper>
          <BasicButton onClick={handleSubmit}>완료</BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
