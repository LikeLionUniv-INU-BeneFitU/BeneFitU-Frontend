import React from 'react';
import * as S from '../../pages/Info.styles';

export default function RegionModal({
  isOpen,
  onClose,
  onSelect,
  residences = [],
}) {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>거주 지역 선택</h3>

        <S.ModalList>
          {residences.length > 0 ? (
            residences.map((region) => (
              <button
                key={region.residenceId}
                type="button"
                onClick={() => onSelect(region.residenceName)}
              >
                {region.residenceName}
              </button>
            ))
          ) : (
            <p>등록된 지역 정보가 없습니다.</p>
          )}
        </S.ModalList>

        <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
