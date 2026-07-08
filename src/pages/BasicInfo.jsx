import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './Info.styles';
import Header from '../components/Header';
import SchoolModal from '../components/modal/SchoolModal';
import DepartmentModal from '../components/modal/DepartmentModal';
import RegionModal from '../components/modal/RegionModal';
import BasicButton from '../components/BasicButton';

export default function BasicInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.pathname.includes('edit');

  // 1. 로컬스토리지에 저장할 초기 폼 객체 설정
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

  // 백엔드에서 받아온 원본 데이터를 저장할 상태 (수정 모드에서 변경 감지용)
  const [originalData, setOriginalData] = useState(initialFormState);

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const grades = ['1학년', '2학년', '3학년', '4학년 이상', '대학원'];

  // 💡 [수정 모드 전용] 마운트 시 백엔드 데이터 가져오기
  useEffect(() => {
    if (isEdit) {
      const fetchUserData = async () => {
        try {
          // 예시 백엔드 데이터 구조 (실제 API 호출로 대체하세요)
          const mockBackendData = {
            name: '김지연',
            birthDate: '2004-03-15',
            schoolName: '인천대학교',
            department: '컴퓨터공학부',
            grade: '3학년',
            residence: '인천 연수구',
          };

          setFormState(mockBackendData);
          setOriginalData(mockBackendData); // 원본 데이터 백업
        } catch (error) {
          console.error('데이터를 불러오지 못했습니다.', error);
        }
      };
      fetchUserData();
    }
  }, [isEdit]);

  // 💡 [2단계] 버튼 활성화 조건 체크 로직
  const isButtonActive = () => {
    if (!isEdit) {
      // 1) 정보 입력 페이지: 모든 값이 존재해야 활성화 (모든 필드 필수)
      return (
        formState.name.trim() !== '' &&
        formState.birthDate !== '' &&
        formState.schoolName.trim() !== '' &&
        formState.department.trim() !== '' &&
        formState.grade !== '' &&
        formState.residence.trim() !== ''
      );
    } else {
      // 2) 정보 수정 페이지: 하나라도 기존 값과 달라지면 활성화
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

  // 입력값 및 선택값 업데이트 핸들러
  const handleInputChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  // 학교 선택 완료 핸들러
  const handleSelectSchool = (selectedSchool) => {
    const schoolNamestr =
      typeof selectedSchool === 'object' ? selectedSchool.name : selectedSchool;

    setFormState({
      ...formState,
      schoolName: schoolNamestr,
      department: '', //학교 바뀌면 학과 초기화
    });
    setIsSchoolModalOpen(false);
  };

  // 학과 선택 완료 핸들러
  const handleSelectDepartment = (selectedDept) => {
    const deptName =
      typeof selectedDept === 'object' ? selectedDept.name : selectedDept;
    handleInputChange('department', deptName);
    setIsDeptModalOpen(false);
  };

  // 거주 지역 선택 완료 핸들러
  const handleSelectRegion = (selectedRegion) => {
    const regionName =
      typeof selectedRegion === 'object' ? selectedRegion.name : selectedRegion;
    handleInputChange('residence', regionName);
    setIsRegionModalOpen(false);
  };

  // 다음 버튼 클릭 시 (백엔드로 전송하거나 가공 처리)
  const handleNextStep = () => {
    console.log('로컬스토리지 최종본 제출:', formState);
    // 이후 페이지 라우팅 및 백엔드 전송 로직 작성 구간
    if (isEdit) {
      navigate('/edit-other');
    } else {
      navigate('/other-info');
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
          {/* 이름 입력 */}
          <S.FormGroup>
            <S.Label>이름</S.Label>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요"
              value={formState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </S.FormGroup>

          {/* 생년월일 입력 */}
          <S.FormGroup>
            <S.Label>생년월일</S.Label>
            <S.DateInput
              type="date"
              min="1900-01-01"
              max="2026-12-31"
              value={formState.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              hasValue={!!formState.birthDate}
              required
            />
          </S.FormGroup>

          {/* 학교 선택 */}
          <S.FormGroup>
            <S.Label>학교</S.Label>
            <S.SelectBox onClick={() => setIsSchoolModalOpen(true)}>
              <S.SelectText isSelected={!!formState.schoolName}>
                {formState.schoolName || '학교명을 검색해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>

          {/* 학과 선택 */}
          <S.FormGroup>
            <S.Label>학과</S.Label>
            {/* 학교가 없으면 흐릿하게 비활성화된 것처럼 보이게 스타일링 제어 */}
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

          {/* 학년 선택 (세그먼트 탭 스타일) */}
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

          {/* 거주 지역 선택 (클릭 시 모달 오픈) */}
          <S.FormGroup>
            <S.Label>거주 지역</S.Label>
            <S.SelectBox onClick={() => setIsRegionModalOpen(true)}>
              <S.SelectText isSelected={!!formState.residence}>
                {formState.residence || '거주 지역을 선택해주세요'}
              </S.SelectText>
              <S.ArrowIcon>▼</S.ArrowIcon>
            </S.SelectBox>
          </S.FormGroup>
          {/* 3. 하단 다음 버튼 */}
        </S.ContentContainer>
      </S.ScrollArea>
      <S.ButtonWrapper>
        <BasicButton onClick={handleNextStep} disabled={!active}>
          {isEdit ? '수정 완료' : '다음'}
        </BasicButton>
      </S.ButtonWrapper>

      {/* 1. 학교 검색 모달 */}
      <SchoolModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        onSelect={handleSelectSchool}
      />

      {/* 2. 학과 선택 모달 */}
      <DepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        selectedSchool={formState.schoolName}
        onSelect={handleSelectDepartment}
      />

      {/* 3. 거주 지역 선택 모달 */}
      <RegionModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onSelect={handleSelectRegion}
      />
    </S.PageWrapper>
  );
}
