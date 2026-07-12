import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

  // 실제 API 카테고리 값과 화면에 보여줄 한글 라벨 매핑
  const categoryCodeMap = {
    '장학금': 'SCHOLARSHIP',
    '교내 근로': 'CAMPUS_WORK',
    '대외 활동': 'EXTERNAL_ACTIVITY',
    '청년 지원금': 'YOUTH_SUPPORT',
  };

  useEffect(() => {
    const backendUrl = 'http://43.201.77.120:8080/api/benefits?category=ALL&sort=DEFAULT&page=1';
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
        console.log('categories 실제값:', data.result.benefits.map(b => b.categories));
        setBenefitList(data.result.benefits);
      })
      .catch((error) => {
        console.error('장학금 리스트 조회 실패', error);
        setBenefitList([]);
      });
  }, [currentCategory]);

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

  // currentCategory(한글 라벨)를 실제 코드로 변환해서 필터링
  const filteredList =
    currentCategory === '전체'
      ? benefitList
      : benefitList.filter(
          (item) =>
            item.categories &&
            item.categories.includes(categoryCodeMap[currentCategory])
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
        setCurrentCategory={setCurrentCategory}
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                {benefit.benefitName}
              </p>

              <p style={{ color: "#2578B0", fontWeight: "bold", fontSize: "17px" }}>
                {benefit.amount.toLocaleString()}
              </p>
            </BenefitDetailBox>
          );
        })}
      </S.ScrollArea>
    </S.PageWrapper>
  );
}

export default BenefitAll;