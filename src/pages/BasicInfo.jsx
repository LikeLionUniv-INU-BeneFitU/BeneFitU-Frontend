import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import SchoolModal from '../components/modal/SchoolModal';
import DepartmentModal from '../components/modal/DepartmentModal';
import RegionModal from '../components/modal/RegionModal';
import BasicButton from '../components/BasicButton';
import api from '../api/axios';

export default function BasicInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const dateInputRef = useRef(null);

  const isEdit = location.pathname.includes('edit');

  // MyInfo 페이지에서 전달한 라우터 최신 상태 정보 확인
  const passedUserInfo = location.state?.userInfo;

  // 학년 표시 문자열을 정수형 코드로 변경하는 헬퍼 함수
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

  // 정수형 코드를 학년 표시 문자열로 변경하는 헬퍼 함수
  const convertGradeToString = (gradeNum) => {
    if (gradeNum >= 5) return '대학원';
    if (gradeNum === 4) return '4학년 이상';
    return `${gradeNum}학년`;
  };

  const initialFormState = {
    name: '',
    birthDate: '',
    schoolName: '',
    department: '',
    grade: '',
    residence: '',
  };

  const [formState, setFormState] = useLocalStorage(
    isEdit ? 'edit_basicInfo' : 'signUp_basicInfo',
    initialFormState,
  );

  const [originalData, setOriginalData] = useState(initialFormState);
  const [metaData, setMetaData] = useState({ schools: [], residences: [] });
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const grades = ['1학년', '2학년', '3학년', '4학년 이상', '대학원'];

  // 기본 정보 선택 범위(메타데이터) 조회
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await api.get('/api/users/meta-data');
        if (response.data.isSuccess) {
          setMetaData(response.data.result);
        }
      } catch (error) {
        console.error('메타데이터를 불러오지 못했습니다.', error);
      }
    };
    fetchMetaData();
  }, []);

  // [수정 모드] MyInfo에서 넘겨받은 기존 데이터를 입력 폼 초기값으로 파싱하여 세팅
  useEffect(() => {
    if (isEdit && passedUserInfo) {
      // 날짜 점(.) 형태 포맷 대응 교정 처리
      const formattedDate =
        passedUserInfo.baseInfo.birthDate
          ?.replaceAll('. ', '-')
          .replaceAll('.', '') || '';

      const parsedData = {
        name: passedUserInfo.baseInfo.name || '',
        birthDate: formattedDate,
        schoolName: passedUserInfo.baseInfo.schoolName || '',
        department: passedUserInfo.baseInfo.department || '',
        grade: convertGradeToString(passedUserInfo.baseInfo.grade),
        residence: passedUserInfo.baseInfo.residence || '',
      };

      setFormState(parsedData);
      setOriginalData(parsedData);
    }
  }, [isEdit, passedUserInfo]);

  // 서버 에러나 인증 실패로 인해 데이터가 유실(undefined)되더라도 trim() 오류로 크래시가 나지 않도록 차단 가드 처리 완료
  const isButtonActive = () => {
    if (!formState) return false;

    if (!isEdit) {
      return (
        (formState.name || '').trim() !== '' &&
        (formState.birthDate || '') !== '' &&
        (formState.schoolName || '').trim() !== '' &&
        (formState.department || '').trim() !== '' &&
        (formState.grade || '') !== '' &&
        (formState.residence || '').trim() !== ''
      );
    } else {
      return (
        formState.name !== originalData?.name ||
        formState.birthDate !== originalData?.birthDate ||
        formState.schoolName !== originalData?.schoolName ||
        formState.department !== originalData?.department ||
        formState.grade !== originalData?.grade ||
        formState.residence !== originalData?.residence
      );
    }
  };

  const active = isButtonActive();

  const handleInputChange = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSelectSchool = (selectedSchool) => {
    const schoolNamestr =
      typeof selectedSchool === 'object' ? selectedSchool.name : selectedSchool;
    setFormState({ ...formState, schoolName: schoolNamestr, department: '' });
    setIsSchoolModalOpen(false);
  };

  const handleSelectDepartment = (selectedDept) => {
    const deptName =
      typeof selectedDept === 'object' ? selectedDept.name : selectedDept;
    handleInputChange('department', deptName);
    setIsDeptModalOpen(false);
  };

  const handleSelectRegion = (selectedRegion) => {
    const regionName =
      typeof selectedRegion === 'object' ? selectedRegion.name : selectedRegion;
    handleInputChange('residence', regionName);
    setIsRegionModalOpen(false);
  };

  // [수정 모드 완료] 기존 기타 정보를 유지한 상태에서 기본 정보 필드만 업데이트하여 PATCH 호출
  const handleNextStep = async () => {
    if (!isEdit) {
      navigate('/other-info');
      return;
    }

    const requestBody = {
      baseInfo: {
        name: formState?.name || '',
        schoolName: formState?.schoolName || '',
        department: formState?.department || '',
        grade: convertGradeToInteger(formState?.grade),
        residence: formState?.residence || '',
        birthDate: formState?.birthDate || '',
      },
      detailInfo: {
        gpa: parseFloat(passedUserInfo?.detailInfo?.gpa || 0),
        incomeBracket: parseInt(
          passedUserInfo?.detailInfo?.incomeBracket || 1,
          10,
        ),
        isBasicLiving: !!passedUserInfo?.detailInfo?.isBasicLiving,
        isSecondLowest: !!passedUserInfo?.detailInfo?.isSecondLowest,
        interests: {
          corporate:
            passedUserInfo?.detailInfo?.interests?.interests?.corporate ||
            false,
          region:
            passedUserInfo?.detailInfo?.interests?.interests?.region || false,
          requirements:
            passedUserInfo?.detailInfo?.interests?.interests?.requirements ||
            false,
          state:
            passedUserInfo?.detailInfo?.interests?.interests?.state || false,
        },
      },
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.patch('/api/users/info', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isSuccess) {
        localStorage.removeItem('edit_basicInfo');
        navigate('/my-info');
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.result) {
        alert(Object.values(error.response.data.result).join('\n'));
      } else {
        alert(error.message || '정보 수정에 실패했습니다.');
      }
    }
  };

  const handleDateBoxClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (e) {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <S.PageWrapper>
      <Header
        title={isEdit ? '기본 정보 수정' : '기본 정보 입력'}
        variant="purple"
      />
      <S.ScrollArea>
        <S.ContentContainer>
          <S.FormGroup>
            <S.Label>이름</S.Label>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요"
              value={formState?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={isEdit}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>생년월일</S.Label>
            <S.DateContainer onClick={handleDateBoxClick}>
              <S.DateText isSelected={!!formState?.birthDate}>
                {formState?.birthDate
                  ? formState.birthDate.replaceAll('-', '. ') + '.'
                  : '생년월일을 선택해주세요'}
              </S.DateText>
              <S.CalendarIcon>📅</S.CalendarIcon>
              <S.HiddenDateInput
                ref={dateInputRef}
                type="date"
                min="1900-01-01"
                max="2026-12-31"
                value={formState?.birthDate || ''}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                required
              />
            </S.DateContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>학교</S.Label>
            <S.SelectBox onClick={() => setIsSchoolModalOpen(true)}>
              <S.SelectText isSelected={!!formState?.schoolName}>
                {formState?.schoolName || '학교명을 검색해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>학과</S.Label>
            <S.SelectBox
              onClick={() => {
                if (!formState?.schoolName) {
                  alert('학교를 먼저 선택해주세요!');
                  return;
                }
                setIsDeptModalOpen(true);
              }}
            >
              <S.SelectText isSelected={!!formState?.department}>
                {formState?.department || '학과를 선택해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>학년</S.Label>
            <S.GradeSelectorContainer>
              {grades.map((g) => (
                <S.GradeButton
                  key={g}
                  type="button"
                  isActive={formState?.grade === g}
                  onClick={() => handleInputChange('grade', g)}
                >
                  {g}
                </S.GradeButton>
              ))}
            </S.GradeSelectorContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>거주 지역</S.Label>
            <S.SelectBox onClick={() => setIsRegionModalOpen(true)}>
              <S.SelectText isSelected={!!formState?.residence}>
                {formState?.residence || '거주 지역을 선택해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>
        </S.ContentContainer>
      </S.ScrollArea>
      <S.ButtonWrapper>
        <BasicButton onClick={handleNextStep} disabled={!active}>
          {isEdit ? '수정 완료' : '다음'}
        </BasicButton>
      </S.ButtonWrapper>

      <SchoolModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        onSelect={handleSelectSchool}
        schools={metaData.schools}
      />
      <DepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        selectedSchool={formState?.schoolName}
        onSelect={handleSelectDepartment}
        schools={metaData.schools}
      />
      <RegionModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onSelect={handleSelectRegion}
        residences={metaData.residences}
      />
    </S.PageWrapper>
  );
}
