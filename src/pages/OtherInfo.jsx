import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

export default function OtherInfo() {
  const navigate = useNavigate();

  // 1. 로컬스토리지 초기 상태 설정 (BasicInfo의 하나의 객체 저장 방식과 통일)
  const initialFormState = {
    gpa: '',
    incomeBracket: '',
    isBasicLiving: false, //기초생활수급자 여부 (false: 해당 없음, true: 해당)
    isSecondLowest: false, //차상위계층 여부
    interests: {
      state: false, // 국가 장학금
      corporate: false, // 기업, 재단 장학금
      region: false, // 지역 장학금
      requirement: false, // 조건별 장학금
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
      isSecondLowest: formState.isSecondLowest,
      interests: Object.keys(formState.interests).filter(
        (key) => formState.interests[key],
      ),
    };

    console.log('로컬스토리지 최종본 제출:', finalData);
    // 이후 백엔드 전송 및 라우팅 로직 작성 구간

    navigate('/info-complete');
  };

  return (
    <S.PageWrapper>
      <Header title="기타 정보 입력" />

      <S.ContentContainer>
        <S.ScrollArea>
          {/* 학점 입력 */}
          <S.FormGroup>
            <S.Label>학점(4.5 만점 기준)</S.Label>
            <S.GpaContainer>
              <S.Input
                type="text"
                placeholder="학점을 입력해주세요 ex) 3.8"
                value={formState.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
              />
            </S.GpaContainer>
          </S.FormGroup>

          {/* 소득 분위 */}
          <S.FormGroup>
            <S.Label>소득분위</S.Label>
            <S.SelectStyle
              value={formState.incomeBracket}
              isSelected={!!formState.incomeBracket}
              onChange={(e) =>
                handleInputChange('incomeBracket', e.target.value)
              }
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
            <S.Label>기초생활수급자 여부</S.Label>
            <S.GradeSelectorContainer>
              <S.GradeButton
                type="button"
                isActive={!formState.isBasicLiving}
                onClick={() => handleInputChange('isVulnerable', false)}
              >
                해당 없음
              </S.GradeButton>
              <S.GradeButton
                type="button"
                isActive={formState.isBasicLiving}
                onClick={() => handleInputChange('isBasicLiving', true)}
              >
                해당
              </S.GradeButton>
            </S.GradeSelectorContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>차상위계층 여부</S.Label>
            <S.GradeSelectorContainer>
              <S.GradeButton
                type="button"
                isActive={!formState.isVulnerable}
                onClick={() => handleInputChange('isSecondLowest', false)}
              >
                해당 없음
              </S.GradeButton>
              <S.GradeButton
                type="button"
                isActive={formState.isSecondLowest}
                onClick={() => handleInputChange('isSecondLowest', true)}
              >
                해당
              </S.GradeButton>
            </S.GradeSelectorContainer>
          </S.FormGroup>

          {/* 관심 분야 */}
          <S.FormGroup>
            <S.Label>관심 분야(선택)</S.Label>
            <S.GridContainer>
              <S.InterestButton
                type="button"
                isActive={formState.interests.state}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'state',
                      checked: !formState.interests.state,
                    },
                  })
                }
              >
                국가장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState.interests.corporate}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'corporate',
                      checked: !formState.interests.corporate,
                    },
                  })
                }
              >
                기업·재단 장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState.interests.region}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'region',
                      checked: !formState.interests.region,
                    },
                  })
                }
              >
                지역 장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState.interests.requirement}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'requirement',
                      checked: !formState.interests.requirement,
                    },
                  })
                }
              >
                조건별 장학금
              </S.InterestButton>
            </S.GridContainer>
          </S.FormGroup>
        </S.ScrollArea>

        {/* 하단 완료 버튼 */}
        <S.ButtonWrapper>
          <BasicButton onClick={handleSubmit}>완료</BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
