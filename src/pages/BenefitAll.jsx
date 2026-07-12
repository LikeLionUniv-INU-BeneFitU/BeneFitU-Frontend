import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './BenefitAll.styles';
import CategoryButtonBar from '../components/CategoryButtonBar';
import UserInfoCard from '../components/UserInfoCard';

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
  const totalPages = 20; // 총 페이지 수 임시 정의 (백엔드에서 total 값 주면 그걸로 교체)

  const currentBlock = Math.floor(currentPage / 10);
  const startPage = currentBlock * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const backendUrl = `http://43.201.77.120:8080/api/benefits?category=ALL&sort=DEFAULT&page=${currentPage}`;
    const token = localStorage.getItem("accessToken");

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
        setBenefitList(data.result.benefits);
      })
      .catch((error) => {
        console.error('장학금 리스트 조회 실패', error);
        setBenefitList([]);
      });
  }, [currentCategory, currentPage]);

  useEffect(() => {
    const userUrl = 'http://43.201.77.120:8080/api/users/info';
    const token = localStorage.getItem("accessToken");

    fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo({
          name: data.result.baseInfo.schoolName,
          gpa: data.result.detailInfo.gpa,
          incomeLevel: data.result.detailInfo.incomeBracket + "구간",
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

  // categoryCodeMap 삭제 — currentCategory에 이미 실제 코드값(SCHOLARSHIP 등)이 담기므로 바로 비교
  const filteredList =
    currentCategory === '전체'
      ? benefitList
      : benefitList.filter(
          (item) => item.categories && item.categories.includes(currentCategory)
        );

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === '최신순') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return b.priceValue - a.priceValue;
    }
  });

  return (
    <S.PageWrapper>
      <Header title="맞춤 추천 혜택" />
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
              <p style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-1px' }}>{benefit.benefitName}</p>
              <p style={{ color: '#2578B0', fontSize: '18px', letterSpacing: '-1px', fontWeight: '600' }}>{benefit.amount}</p>
            </BenefitDetailBox>
          );
        })}
      </S.ScrollArea>

      {sortedList.length > 0 && (
        <S.PaginationContainer>
          <S.BlockArrowBtn disabled={currentBlock === 0} onClick={handlePrevBlock}>
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
    </S.PageWrapper>
  );
}

export default BenefitAll;

