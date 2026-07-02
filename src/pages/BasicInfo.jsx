import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as S from './BasicInfo.styles';
import Header from '../components/Header';
import SchoolModal from '../components/modal/SchoolModal';
import DepartmentModal from '../components/modal/DepartmentModal';
import RegionModal from '../components/modal/RegionModal';
import BasicButton from '../components/BasicButton';

export default function BasicInfo() {
  // 1. 로컬스토리지에 저장할 초기 폼 객체 설정
  const initialFormState = {
    name: '',
    school: '',
    department: '',
    grade: '1학년',
    region: '',
  };

  // 2. useLocalStorage 훅 적용
  const [formState, setFormState] = useLocalStorage(
    'signUp_basicInfo',
    initialFormState,
  );

  // 3. 모달 오픈 상태 관리
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  // 학년 선택 옵션 리스트
  const grades = ['1학년', '2학년', '3학년', '4학년', '대학원'];

  // 입력값 및 선택값 업데이트 핸들러
  const handleInputChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  // 학교 선택 완료 핸들러
  const handleSelectSchool = (selectedSchool) => {
    const schoolName =
      typeof selectedSchool === 'object' ? selectedSchool.name : selectedSchool;

    setFormState({
      ...formState,
      school: schoolName,
      department: '',
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
    handleInputChange('region', regionName);
    setIsRegionModalOpen(false);
  };

  // 다음 버튼 클릭 시 (백엔드로 전송하거나 가공 처리)
  const handleNextStep = () => {
    console.log('로컬스토리지 최종본 제출:', formState);
    // 이후 페이지 라우팅 및 백엔드 전송 로직 작성 구간
  };

  return (
    <S.PageWrapper>
      <Header title="기본 정보 입력" />

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

        {/* 학교 선택 */}
        <S.FormGroup>
          <S.Label>학교</S.Label>
          <S.SelectBox onClick={() => setIsSchoolModalOpen(true)}>
            <S.SelectText isSelected={!!formState.school}>
              {formState.school || '학교명을 검색해주세요'}
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
              if (!formState.school) {
                alert('학교를 먼저 선택해주세요!');
                return;
              }
              setIsDeptModalOpen(true);
            }}
            style={{
              opacity: formState.school ? 1 : 0.5,
              cursor: formState.school ? 'pointer' : 'not-allowed',
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
            <S.SelectText isSelected={!!formState.region}>
              {formState.region || '거주 지역을 선택해주세요'}
            </S.SelectText>
            <S.ArrowIcon>▼</S.ArrowIcon>
          </S.SelectBox>
        </S.FormGroup>

        {/* 3. 하단 다음 버튼 */}
        <S.ButtonWrapper>
          <BasicButton onClick={handleNextStep}>다음</BasicButton>
        </S.ButtonWrapper>
      </S.ContentContainer>

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
        selectedSchool={formState.school}
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
