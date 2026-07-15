import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import api from '../api/axios';

export default function OtherInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes('edit');
  const passedUserInfo = location.state?.userInfo;

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

  useEffect(() => {
    if (isEdit && passedUserInfo) {
      const parsedData = {
        gpa: String(passedUserInfo.detailInfo?.gpa || ''),
        incomeBracket: String(passedUserInfo.detailInfo?.incomeBracket || ''),
        isBasicLiving: !!passedUserInfo.detailInfo?.isBasicLiving,
        isSecondLowest: !!passedUserInfo.detailInfo?.isSecondLowest,
        interests: {
          state:
            passedUserInfo.detailInfo?.interests?.includes('국가장학금') ||
            false,
          corporate:
            passedUserInfo.detailInfo?.interests?.includes(
              '기업·재단 장학금',
            ) || false,
          region:
            passedUserInfo.detailInfo?.interests?.includes('지역 장학금') ||
            false,
          requirement:
            passedUserInfo.detailInfo?.interests?.includes('조건별 장학금') ||
            false,
        },
      };

      setFormState(parsedData);
      setOriginalData(JSON.parse(JSON.stringify(parsedData)));
    }
  }, [isEdit, passedUserInfo]);

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
    setFormState({ ...formState, [key]: value });
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setFormState({
      ...formState,
      interests: { ...formState.interests, [name]: checked },
    });
  };

  const handleSubmit = async () => {
    const isSignUp = !isEdit;

    const savedBasicInfo =
      JSON.parse(
        localStorage.getItem(isSignUp ? 'signUp_basicInfo' : 'edit_basicInfo'),
      ) || {};

    const cleanBirthDate = (dateStr) =>
      dateStr?.replaceAll('. ', '-').replaceAll('.', '') || '';

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

    const finalName = isSignUp
      ? savedBasicInfo.name || ''
      : passedUserInfo?.baseInfo?.name || savedBasicInfo.name || '';

    const requestBody = {
      baseInfo: {
        name: finalName,
        schoolName: isSignUp
          ? savedBasicInfo.schoolName || ''
          : passedUserInfo?.baseInfo?.schoolName || '',
        department: isSignUp
          ? savedBasicInfo.department || ''
          : passedUserInfo?.baseInfo?.department || '',
        grade: isSignUp
          ? convertGradeToInteger(savedBasicInfo.grade)
          : parseInt(passedUserInfo?.baseInfo?.grade || 1, 10),
        residence: isSignUp
          ? savedBasicInfo.residence || ''
          : passedUserInfo?.baseInfo?.residence || '',
        birthDate: isSignUp
          ? savedBasicInfo.birthDate || ''
          : cleanBirthDate(passedUserInfo?.baseInfo?.birthDate),
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
      if (isSignUp) {
        const response = await api.post('/api/users/info', requestBody);
        if (response.data.isSuccess) {
          localStorage.removeItem('signUp_basicInfo');
          localStorage.removeItem('signUp_otherInfo');
          navigate('/info-complete');
        }
      } else {
        const token = localStorage.getItem('accessToken');
        const response = await api.patch('/api/users/info', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.isSuccess) {
          localStorage.removeItem('edit_otherInfo');
          navigate('/my-info');
        }
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.result) {
        alert(Object.values(error.response.data.result).join('\n'));
      } else {
        alert(error.message || '정보 처리에 실패했습니다.');
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
