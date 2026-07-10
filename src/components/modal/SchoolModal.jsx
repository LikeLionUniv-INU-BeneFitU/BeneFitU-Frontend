import React, { useState } from 'react';
import * as S from '../../pages/Info.styles';

export default function SchoolModal({
  isOpen,
  onClose,
  onSelect,
  schools = [],
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // 백엔드에서 받아온 전체 학교 목록에서 검색어가 포함된 학교만 필터링
  const filteredSchools = schools.filter((school) =>
    school.schoolName.includes(searchTerm),
  );

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: '20px' }}>학교 검색</h3>
        <S.Input
          type="text"
          placeholder="학교명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <S.ModalList>
          {filteredSchools.length > 0
            ? filteredSchools.map((school) => (
                <button
                  key={school.schoolId}
                  type="button"
                  onClick={() => onSelect(school.schoolName)}
                >
                  {school.schoolName}
                </button>
              ))
            : searchTerm && <p>검색 결과가 없습니다.</p>}
        </S.ModalList>
        <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
