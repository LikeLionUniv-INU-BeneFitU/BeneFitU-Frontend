import React, { useState, useEffect } from 'react';
import * as S from '../../pages/Info.styles';

export default function SchoolModal({ isOpen, onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolList, setSchoolList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSchoolList([]);
      return;
    }

    const fetchSchools = async () => {
      setIsLoading(true);

      // 💡 백엔드 API 대용 더미 타임아웃 (1초 후 결과 반환)
      setTimeout(() => {
        const dummySchools = [
          '인천대학교',
          '서울대학교',
          '부산대학교',
          '경북대학교',
          '전남대학교',
          '충남대학교',
          '전북대학교',
          '충북대학교',
          '강원대학교',
          '제주대학교',
          '경상국립대학교',
          '한국해양대학교',
          '공주대학교',
          '안동대학교',
          '순천대학교',
          '목포대학교',
          '창원대학교',
          '한경국립대학교',
          '금오공과대학교',
          '군산대학교',
        ];
        // 입력한 검색어가 포함된 학교만 필터링
        const filtered = dummySchools.filter((school) =>
          school.includes(searchTerm),
        );

        setSchoolList(filtered);
        setIsLoading(false);
      }, 500);

      /* try {
        // 백엔드 자체 DB에서 학교 검색 (예: /api/v1/schools?search=인천)
        const response = await fetch(
          `/api/v1/schools?search=${encodeURIComponent(searchTerm)}`,
        );
        const data = await response.json();

        // 백엔드가 주는 응답 포맷에 맞게 수정하세요 (예: data.data 또는 data.schools)
        setSchoolList(data.schools || []);
      } catch (error) {
        console.error('학교 목록 로드 실패:', error);
      } finally {
        setIsLoading(false);
      } */
    };

    const delayDebounce = setTimeout(() => {
      fetchSchools();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  if (!isOpen) return null;

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
          {isLoading ? (
            <p>로딩 중...</p>
          ) : schoolList.length > 0 ? (
            schoolList.map((school, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelect(school)} // school 객체 전체 혹은 이름 문자열 전달
              >
                {/* 백엔드 데이터 구조가 객체라면 school.name 등으로 변경 */}
                {typeof school === 'object' ? school.name : school}
              </button>
            ))
          ) : (
            searchTerm && <p>검색 결과가 없습니다.</p>
          )}
        </S.ModalList>
        <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
