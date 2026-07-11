import React, { useState } from 'react';
import * as S from '../../pages/Info.styles';

export default function RegionModal({
  isOpen,
  onClose,
  onSelect,
  residences = [],
}) {
  // 거주 지역 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // 백엔드 문자열 배열 구조에 맞춰 필터링 로직 구현
  const filteredResidences = residences.filter((region) =>
    region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>거주 지역 선택</h3>

        {/* 학과 모달과 동일하게 높이감과 여백을 넉넉하게 보정한 검색창 입력 폼 추가 */}
        <S.Input
          type="text"
          placeholder="지역명을 입력하세요 (예: 서울, 인천)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          style={{
            padding: '12px 16px',
            margin: '20px 0 0 0',
            boxSizing: 'border-box',
          }}
        />

        <S.ModalList>
          {/* 찐 배포 데이터 스펙인 문자열 자체를 key와 명칭으로 다이렉트 바인딩 */}
          {filteredResidences.length > 0 ? (
            filteredResidences.map((region, index) => (
              <button
                key={`${region}-${index}`}
                type="button"
                onClick={() => {
                  onSelect(region);
                  setSearchTerm('');
                }}
              >
                {region}
              </button>
            ))
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
                : '등록된 지역 정보가 없습니다.'}
            </p>
          )}
        </S.ModalList>

        <S.ModalCloseButton onClick={handleClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
