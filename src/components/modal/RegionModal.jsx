import React, { useState, useEffect } from 'react';
import * as S from '../../pages/Info.styles';

export default function RegionModal({ isOpen, onClose, onSelect }) {
  const [regionList, setRegionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchRegions = async () => {
      setIsLoading(true);

      // 💡 백엔드 API 대용 더미 타임아웃
      setTimeout(() => {
        const dummyRegions = [
          '서울특별시',
          '인천광역시',
          '부산광역시',
          '대구광역시',
          '대전광역시',
          '광주광역시',
          '울산광역시',
          '세종특별자치시',
        ];
        setRegionList(dummyRegions);
        setIsLoading(false);
      }, 300);

      /* try {
        // 백엔드 자체 DB에서 거주 지역 데이터 가져오기 (예: /api/v1/regions)
        const response = await fetch('/api/v1/regions');
        const data = await response.json();

        // 백엔드 응답 구조에 맞춰 세팅 (예: data.regions)
        setRegionList(data.regions || []);
      } catch (error) {
        console.error('거주 지역 목록 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }*/
    };

    fetchRegions();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>거주 지역 선택</h3>

        <S.ModalList>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : regionList.length > 0 ? (
            regionList.map((region, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelect(region)}
              >
                {typeof region === 'object' ? region.name : region}
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
