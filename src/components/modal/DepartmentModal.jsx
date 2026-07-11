import React, { useState } from 'react';
import * as S from '../../pages/Info.styles';

export default function DepartmentModal({
  isOpen,
  onClose,
  selectedSchool,
  onSelect,
  schools = [],
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const targetSchool = schools.find((s) => s.schoolName === selectedSchool);

  const deptList = targetSchool?.departments || [];

  // 백엔드 실제 데이터 규격인 departmentName과 프론트엔드 상태값인 searchTerm으로 교정 완료
  const filteredDepartments = deptList.filter((dept) =>
    dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>학과 선택</h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          {selectedSchool}에 개설된 학과 목록입니다.
        </p>

        <S.Input
          type="text"
          placeholder="학과명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          style={{
            padding: '12px 16px',
            boxSizing: 'border-box',
          }}
        />

        <S.ModalList>
          {/* 하단 루프 대상을 전체 리스트(deptList)에서 필터링된 리스트(filteredDepartments)로 변경 완료 */}
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept, index) => {
              const id = dept.departmentId;
              const name = dept.departmentName;

              return (
                <button
                  key={`${id}-${index}`}
                  type="button"
                  onClick={() => {
                    onSelect(name);
                    setSearchTerm('');
                  }}
                >
                  {name}
                </button>
              );
            })
          ) : (
            <p
              style={{
                textAlign: 'center',
                padding: '20px 0',
                color: '#999',
                fontSize: '14px',
              }}
            >
              {searchTerm
                ? '검색 결과가 없습니다.'
                : '등록된 학과 정보가 없습니다.'}
            </p>
          )}
        </S.ModalList>
        <S.ModalCloseButton onClick={handleClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
