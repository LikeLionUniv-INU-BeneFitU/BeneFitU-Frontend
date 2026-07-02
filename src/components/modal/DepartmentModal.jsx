import React, { useState, useEffect } from 'react';
import * as S from '../../pages/Info.styles';

export default function DepartmentModal({
  isOpen,
  onClose,
  selectedSchool,
  onSelect,
}) {
  const [deptList, setDeptList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 선택된 학교가 없거나 모달이 닫혀있으면 실행 안 함
    if (!isOpen || !selectedSchool) return;

    const fetchDepartments = async () => {
      setIsLoading(true);

      // 💡 백엔드 API 대용 더미 타임아웃
      setTimeout(() => {
        const dummyDepartments = [
          '정보통신공학과',
          '컴퓨터공학부',
          '임베디드시스템공학과',
          '소프트웨어학과',
          '인공지능융합학과',
          '데이터사이언스학과',
          '전자공학과',
          '전기공학과',
          '기계공학과',
          '신소재공학과',
          '화학공학과',
          '바이오공학과',
          '산업경영공학과',
        ];
        setDeptList(dummyDepartments);
        setIsLoading(false);
      }, 400);

      /* try {
        // 백엔드가 요구하는 식별자(이름 또는 ID)에 맞게 쿼리 스트링 전송
        // 예: /api/v1/departments?schoolName=인천대학교
        const schoolQuery =
          typeof selectedSchool === 'object'
            ? selectedSchool.name
            : selectedSchool;

        const response = await fetch(
          `/api/v1/departments?school=${encodeURIComponent(schoolQuery)}`,
        );
        const data = await response.json();

        setDeptList(data.departments || []);
      } catch (error) {
        console.error('학과 목록 로드 실패:', error);
      } finally {
        setIsLoading(false);
      } */
    };

    fetchDepartments();
  }, [isOpen, selectedSchool]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>학과 선택</h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          {typeof selectedSchool === 'object'
            ? selectedSchool.name
            : selectedSchool}
          에 개설된 학과 목록입니다.
        </p>

        <S.ModalList>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : deptList.length > 0 ? (
            deptList.map((dept, index) => (
              <button key={index} type="button" onClick={() => onSelect(dept)}>
                {typeof dept === 'object' ? dept.name : dept}
              </button>
            ))
          ) : (
            <p>등록된 학과 정보가 없습니다.</p>
          )}
        </S.ModalList>
        <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
