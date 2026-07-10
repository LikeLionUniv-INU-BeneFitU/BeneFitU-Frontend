import React from 'react';
import * as S from '../../pages/Info.styles';

export default function DepartmentModal({
  isOpen,
  onClose,
  selectedSchool,
  onSelect,
  schools = [],
}) {
  if (!isOpen) return null;

  // 선택된 학교의 세부 학과 목록 배열 추출
  const targetSchool = schools.find((s) => s.schoolName === selectedSchool);
  const deptList = targetSchool ? targetSchool.department : [];

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>학과 선택</h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          {selectedSchool}에 개설된 학과 목록입니다.
        </p>

        <S.ModalList>
          {deptList.length > 0 ? (
            deptList.map((dept) => (
              <button
                key={dept.departmentId}
                type="button"
                onClick={() => onSelect(dept.departmentName)}
              >
                {dept.departmentName}
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
