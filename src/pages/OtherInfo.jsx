import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import api from '../api/axios'; // 백엔드 API 통신용 Axios 인스턴스

export default function OtherInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.pathname.includes('edit');

  const initialFormState = {
    gpa: '',
    incomeBracket: '',
    isBasicLiving: false,
    isSecondLowest: false,
    interests: {
      state: false,
      corporate: false,
      region: false,
      requirement: false,
    },
  };

  const [formState, setFormState] = useLocalStorage(
    isEdit ? 'edit_otherInfo' : 'signUp_otherInfo',
    initialFormState,
  );

  const [originalData, setOriginalData] = useState(
    JSON.parse(JSON.stringify(initialFormState)),
  );

  // 학년 문자열 데이터를 백엔드 정수형 스펙(1~5)으로 매핑
  const convertGradeToInteger = (gradeStr) => {
    switch (gradeStr) {
      case '1학년':
        return 1;
      case '2학년':
        return 2;
      case '3학년':
        return 3;
      case '4학년 이상':
        return 4;
      case '대학원':
        return 5;
      default:
        return 1;
    }
  };

  // [수정 모드] 기존 유저 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const fetchUserData = async () => {
        try {
          const mockBackendData = {
            gpa: '3.8',
            incomeBracket: '3',
            isBasicLiving: false,
            isSecondLowest: true,
            interests: {
              state: true,
              corporate: false,
              region: true,
              requirement: false,
            },
          };

          setFormState(mockBackendData);
          setOriginalData(JSON.parse(JSON.stringify(mockBackendData)));
        } catch (error) {
          console.error('데이터를 불러오지 못했습니다.', error);
        }
      };
      fetchUserData();
    }
  }, [isEdit]);

  // 버튼 활성화 조건 체크
  const isButtonActive = () => {
    if (!isEdit) {
      return formState?.gpa?.trim() !== '' && formState?.incomeBracket !== '';
    }

    const currentInterests = formState?.interests || {};
    const prevInterests = originalData?.interests || {};

    const isInterestsChanged = Object.keys(currentInterests).some(
      (key) => currentInterests[key] !== prevInterests[key],
    );

    return (
      formState?.gpa !== originalData?.gpa ||
      formState?.incomeBracket !== originalData?.incomeBracket ||
      formState?.isBasicLiving !== originalData?.isBasicLiving ||
      formState?.isSecondLowest !== originalData?.isSecondLowest ||
      isInterestsChanged
    );
  };

  const active = isButtonActive();

  const handleInputChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

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

  // 백엔드로 전체 취합 데이터 최종 제출 처리
  const handleSubmit = async () => {
    // 1단계에서 스토리지에 보관해 둔 기본 정보 로드
    const savedBasicInfo =
      JSON.parse(
        localStorage.getItem(isEdit ? 'edit_basicInfo' : 'signUp_basicInfo'),
      ) || {};

    // API 명세서 구조 스펙에 맞추어 데이터 가공(DTO 파싱)
    const requestBody = {
      baseInfo: {
        schoolName: savedBasicInfo.schoolName || '',
        department: savedBasicInfo.department || '',
        grade: convertGradeToInteger(savedBasicInfo.grade),
        residence: savedBasicInfo.residence || '',
        birthDate: savedBasicInfo.birthDate || '',
      },
      detailInfo: {
        gpa: parseFloat(formState.gpa),
        incomeBracket: parseInt(formState.incomeBracket, 10),
        isBasicLiving: formState.isBasicLiving,
        isSecondLowest: formState.isSecondLowest,
        interests: {
          corporate: !!formState.interests?.corporate,
          region: !!formState.interests?.region,
          requirements: !!formState.interests?.requirement,
          state: !!formState.interests?.state,
        },
      },
    };

    try {
      const response = await api.post('/api/users/info', requestBody);
      if (response.data.isSuccess) {
        // 성공 시 사용이 끝난 임시 로컬스토리지 정리 및 이동
        if (isEdit) {
          localStorage.removeItem('edit_basicInfo');
          localStorage.removeItem('edit_otherInfo');
          navigate('/my-info');
        } else {
          localStorage.removeItem('signUp_basicInfo');
          localStorage.removeItem('signUp_otherInfo');
          navigate('/info-complete');
        }
      }
    } catch (error) {
      // 400 Bad Request 발생 시 에러 메시지 리스트 파싱 및 얼럿 노출
      if (error.response?.status === 400 && error.response?.data?.result) {
        const errorList = error.response.data.result;
        const errorMsg = Object.values(errorList).join('\n');
        alert(`입력 정보를 확인해 주세요:\n${errorMsg}`);
      } else {
        alert(error.message || '정보 제출에 실패했습니다.');
      }
    }
  };

  return (
    <S.PageWrapper>
      <Header
        title={isEdit ? '기타 정보 수정' : '기타 정보 입력'}
        variant="purple"
      />

      <S.ContentContainer>
        <S.ScrollArea>
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

          <S.FormGroup>
            <S.Label>기초생활수급자 여부</S.Label>
            <S.GradeSelectorContainer>
              <S.GradeButton
                type="button"
                isActive={!formState.isBasicLiving}
                onClick={() => handleInputChange('isBasicLiving', false)}
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
                isActive={!formState.isSecondLowest}
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

          <S.FormGroup>
            <S.Label>관심 분야(선택)</S.Label>
            <S.GridContainer>
              <S.InterestButton
                type="button"
                isActive={formState?.interests?.state}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'state',
                      checked: !formState?.interests?.state,
                    },
                  })
                }
              >
                국가장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState?.interests?.corporate}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'corporate',
                      checked: !formState?.interests?.corporate,
                    },
                  })
                }
              >
                기업·재단 장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState?.interests?.region}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'region',
                      checked: !formState?.interests?.region,
                    },
                  })
                }
              >
                지역 장학금
              </S.InterestButton>

              <S.InterestButton
                type="button"
                isActive={formState?.interests?.requirement}
                onClick={() =>
                  handleInterestChange({
                    target: {
                      name: 'requirement',
                      checked: !formState?.interests?.requirement,
                    },
                  })
                }
              >
                조건별 장학금
              </S.InterestButton>
            </S.GridContainer>
          </S.FormGroup>
        </S.ScrollArea>

        <S.ButtonWrapper>
          <BasicButton onClick={handleSubmit} disabled={!active}>
            완료
          </BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.PageWrapper>
  );
}
