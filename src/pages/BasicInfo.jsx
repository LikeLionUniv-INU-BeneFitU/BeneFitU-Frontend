import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import SchoolModal from '../components/modal/SchoolModal';
import DepartmentModal from '../components/modal/DepartmentModal';
import RegionModal from '../components/modal/RegionModal';
import BasicButton from '../components/BasicButton';
import api from '../api/axios'; // 백엔드 API 통신용 Axios 인스턴스

export default function BasicInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const dateInputRef = useRef(null);

  // 현재 페이지가 수정 모드인지 확인
  const isEdit = location.pathname.includes('edit');

  const initialFormState = {
    name: '',
    birthDate: '',
    schoolName: '',
    department: '',
    grade: '',
    residence: '',
  };

  // 모드별로 로컬스토리지 키 분기 저장
  const [formState, setFormState] = useLocalStorage(
    isEdit ? 'edit_basicInfo' : 'signUp_basicInfo',
    initialFormState,
  );

  // 수정 모드에서 변경 감지용 원본 데이터 백업 상태
  const [originalData, setOriginalData] = useState(initialFormState);

  // 백엔드에서 받아온 메타데이터(학교, 지역 등) 저장 상태
  const [metaData, setMetaData] = useState({ schools: [], residences: [] });

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const grades = ['1학년', '2학년', '3학년', '4학년 이상', '대학원'];

  // 마운트 시 기본 정보 선택 범위(메타데이터) 조회
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

  // [수정 모드] 기존 유저 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const fetchUserData = async () => {
        try {
          // 필요 시 실제 회원 정보 조회 API 연동 구간
          const mockBackendData = {
            name: '김지연',
            birthDate: '2004-03-15',
            schoolName: '인천대학교',
            department: '컴퓨터공학부',
            grade: '3학년',
            residence: '인천광역시',
          };

          setFormState(mockBackendData);
          setOriginalData(mockBackendData);
        } catch (error) {
          console.error('데이터를 불러오지 못했습니다.', error);
        }
      };
      fetchUserData();
    }
  }, [isEdit]);

  // 하단 버튼 활성화 조건 체크
  const isButtonActive = () => {
    if (!isEdit) {
      // 입력 모드: 모든 필드 필수 입력
      return (
        formState.name.trim() !== '' &&
        formState.birthDate !== '' &&
        formState.schoolName.trim() !== '' &&
        formState.department.trim() !== '' &&
        formState.grade !== '' &&
        formState.residence.trim() !== ''
      );
    } else {
      // 수정 모드: 기존 값과 하나라도 다르면 활성화
      return (
        formState.name !== originalData.name ||
        formState.birthDate !== originalData.birthDate ||
        formState.schoolName !== originalData.schoolName ||
        formState.department !== originalData.department ||
        formState.grade !== originalData.grade ||
        formState.residence !== originalData.residence
      );
    }
  };

  const active = isButtonActive();

  // 입력값 변경 핸들러
  const handleInputChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  // 학교 선택 시 학과 초기화 및 모달 닫기
  const handleSelectSchool = (selectedSchool) => {
    const schoolNamestr =
      typeof selectedSchool === 'object' ? selectedSchool.name : selectedSchool;

    setFormState({
      ...formState,
      schoolName: schoolNamestr,
      department: '',
    });
    setIsSchoolModalOpen(false);
  };

  // 학과 선택 핸들러
  const handleSelectDepartment = (selectedDept) => {
    const deptName =
      typeof selectedDept === 'object' ? selectedDept.name : selectedDept;
    handleInputChange('department', deptName);
    setIsDeptModalOpen(false);
  };

  // 거주 지역 선택 핸들러
  const handleSelectRegion = (selectedRegion) => {
    const regionName =
      typeof selectedRegion === 'object' ? selectedRegion.name : selectedRegion;
    handleInputChange('residence', regionName);
    setIsRegionModalOpen(false);
  };

  // 다음 단계 이동 핸들러
  const handleNextStep = () => {
    if (isEdit) {
      navigate('/edit-other');
    } else {
      navigate('/other-info');
    }
  };

  // 캘린더 팝업 트리거
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
              value={formState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>생년월일</S.Label>
            <S.DateContainer onClick={handleDateBoxClick}>
              <S.DateText isSelected={!!formState.birthDate}>
                {formState.birthDate
                  ? formState.birthDate.replaceAll('-', '. ') + '.'
                  : '생년월일을 선택해주세요'}
              </S.DateText>
              <S.CalendarIcon>📅</S.CalendarIcon>
              <S.HiddenDateInput
                ref={dateInputRef}
                type="date"
                min="1900-01-01"
                max="2026-12-31"
                value={formState.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                required
              />
            </S.DateContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>학교</S.Label>
            <S.SelectBox onClick={() => setIsSchoolModalOpen(true)}>
              <S.SelectText isSelected={!!formState.schoolName}>
                {formState.schoolName || '학교명을 검색해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>학과</S.Label>
            <S.SelectBox
              onClick={() => {
                if (!formState.schoolName) {
                  alert('학교를 먼저 선택해주세요!');
                  return;
                }
                setIsDeptModalOpen(true);
              }}
            >
              <S.SelectText isSelected={!!formState.department}>
                {formState.department || '학과를 선택해주세요'}
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
                  isActive={formState.grade === g}
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
              <S.SelectText isSelected={!!formState.residence}>
                {formState.residence || '거주 지역을 선택해주세요'}
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
        selectedSchool={formState.schoolName}
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
