import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import CategoryButtonBar from '../components/CategoryButtonBar';
import UserInfoCard from '../components/UserInfoCard';
import * as S from './BenefitAll.styles';

function BenefitAll() {
  const location = useLocation();

  const initialCategory = location.state?.category || '전체';
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  const [benefitList, setBenefitList] = useState([]);
  const [sortType, setSortType] = useState('최신순');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '',
    gpa: '',
    incomeLevel: '',
  });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // 임시 20 제거 -> 백엔드 totPages 연동

  const currentBlock = Math.floor(currentPage / 10);
  const startPage = currentBlock * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // sortType(한글)을 API sort 파라미터로 변환
const sortCodeMap = {
  '최신순': 'DEFAULT',
  '금액순': 'AMOUNT_HIGH',
};

// 데이터 fetch 로직
useEffect(() => {
  const sortCode = sortCodeMap[sortType] || 'DEFAULT';
  const backendUrl = `https://benefitu-api.duckdns.org/api/benefits?category=ALL&sort=${sortCode}&page=${currentPage}`;
  const token = localStorage.getItem('accessToken');

  fetch(backendUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      return res.json();
    })
    .then((data) => {
      setBenefitList(data.result?.benefits || []);
      setTotalPages(data.result?.totPages || 0);
    })
    .catch((error) => {
      console.error('장학금 리스트 조회 실패', error);
      setBenefitList([]);
      setTotalPages(0);
    });
}, [currentCategory, currentPage, sortType]); // sortType 추가!

  // 유저 정보 fetch
  useEffect(() => {
    const userUrl = 'https://benefitu-api.duckdns.org/api/users/info';
    const token = localStorage.getItem('accessToken');

    fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo({
          name: data.result.baseInfo.name,
          gpa: data.result.detailInfo.gpa,
          incomeLevel: data.result.detailInfo.incomeBracket + '구간',
        });
      })
      .catch((error) => {
        console.error('사용자 정보 조회 실패', error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(0); // 카테고리 바뀌면 1페이지로 초기화
  };

  const handleNextBlock = () => {
    const nextBlockStart = (currentBlock + 1) * 10;
    if (nextBlockStart < totalPages) {
      setCurrentPage(nextBlockStart);
    }
  };

  const handlePrevBlock = () => {
    const prevBlockStart = (currentBlock - 1) * 10;
    if (prevBlockStart >= 0) {
      setCurrentPage(prevBlockStart + 9);
    }
  };

  const filteredList =
    currentCategory === '전체'
      ? benefitList
      : benefitList.filter(
          (item) =>
            item.categories && item.categories.includes(currentCategory),
        );

        
  // 정렬박스
  const parseAmount = (amount) => {
    const num = Number(amount);
    return isNaN(num) ? 0 : num;
  };

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === '최신순') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return parseAmount(b.amount) - parseAmount(a.amount);
    }
  });

  return (
    <S.PageWrapper>
      <Header title="맞춤 추천 혜택" variant="white" />
      <UserInfoCard
        name={userInfo.name}
        gpa={userInfo.gpa}
        incomeLevel={userInfo.incomeLevel}
      />
      <CategoryButtonBar
        currentCategory={currentCategory}
        setCurrentCategory={handleCategoryChange}
      />
      <S.ScrollArea>
        <S.Rowbox>
          <S.SubTitle>
            추천 혜택 <span>{filteredList.length}</span>
          </S.SubTitle>

          <S.SortWrapper>
            <S.SortButton onClick={() => setIsSortOpen(!isSortOpen)}>
              {sortType} ▼{' '}
            </S.SortButton>

            {isSortOpen && (
              <S.SortDropdown>
                <S.SortOption
                  $isActive={sortType === '최신순'}
                  onClick={() => {
                    setSortType('최신순');
                    setIsSortOpen(false);
                  }}
                >
                  최신순
                </S.SortOption>
                <S.SortOption
                  $isActive={sortType === '금액순'}
                  onClick={() => {
                    setSortType('금액순');
                    setIsSortOpen(false);
                  }}
                >
                  금액순
                </S.SortOption>
              </S.SortDropdown>
            )}
          </S.SortWrapper>
        </S.Rowbox>

      
        {sortedList.map((benefit) => {
          return (
            <BenefitDetailBox
              key={benefit.benefitId}
              buttonText="상세 보기"
              to={`/detail/${benefit.benefitId}`}
              category={benefit.categories[0]}
              tags={benefit.categories}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  letterSpacing: '-1px',
                }}
              >
                {benefit.benefitName}
              </p>
              <p
                style={{
                  color: '#2578B0',
                  fontSize: '18px',
                  letterSpacing: '-1px',
                  fontWeight: '600',
                }}
              >
                {benefit.amount}
              </p>
            </BenefitDetailBox>
          );
        })}

        {totalPages > 1 && sortedList.length > 0 && (
          <S.PaginationContainer>
            <S.BlockArrowBtn
              disabled={currentBlock === 0}
              onClick={handlePrevBlock}
            >
              &lt;
            </S.BlockArrowBtn>

            {pageNumbers.map((num) => (
              <S.NumButton
                key={num}
                $isCurrent={currentPage === num}
                onClick={() => setCurrentPage(num)}
              >
                {num + 1}
              </S.NumButton>
            ))}

            <S.BlockArrowBtn
              disabled={(currentBlock + 1) * 10 >= totalPages}
              onClick={handleNextBlock}
            >
              &gt;
            </S.BlockArrowBtn>
          </S.PaginationContainer>
        )}
      </S.ScrollArea>
    </S.PageWrapper>
  );
}

export default BenefitAll;
