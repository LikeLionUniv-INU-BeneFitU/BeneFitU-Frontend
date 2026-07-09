import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './BenefitAll.styles';
import CategoryButtonBar from '../components/CategoryButtonBar';
import UserInfoCard from '../components/UserInfoCard';
import state2 from '../assets/images/state2.png'
import corporate2 from '../assets/images/corporate2.png'
import region2 from '../assets/images/region2.png'
import requirement2 from '../assets/images/requirement2.png'

function BenefitAll() {
  const location = useLocation();

  // 카테고리 기억 상자
  const initialCategory = location.state?.category || '전체';
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  // 장학금 리스트 정보 저장용 상자
  const [benefitList, setBenefitList] = useState([]);

  // 정렬 기준 기억 상자
  const [sortType, setSortType] = useState('최신순');

  // 드롭다운이 열려있는지 기억하는 상자
  const [isSortOpen, setIsSortOpen] = useState(false);

  // 사용자 정보 저장용 상자
  const [userInfo, setUserInfo] = useState({
    name: '',
    grade: '',
    incomeLevel: '',
  });

  const categoryCodeMap = {
    '국가장학금': 'SCHOLARSHIP',
    '기업·재단 장학금': 'CORPORATE',
    '지역 장학금': 'REGION',
    '조건별 장학금': 'YOUTH_SUPPORT',
  };

  // 백엔드에 데이터를 요청하는 함수
  // 장학금 상세설명 박스 연동
  useEffect(() => {
    // 예시 데이터
    const dummyData = [
      {
        id: 1,
        title: 'A장학금',
        price: '최대 100만원',
        priceValue: 1000000,
        category: '국가장학금',
        date: '2026-06-15',
        tags: ['교내장학금', '성적우수'],
      },
      {
        id: 2,
        title: 'B장학금',
        price: '최대 120만원',
        priceValue: 1200000,
        category: '기업·재단 장학금',
        date: '2026-06-20',
        tags: ['교내장학금', '성적우수'],
      },
      {
        id: 3,
        title: 'C장학금',
        price: '200만원',
        priceValue: 2000000,
        category: '국가장학금',
        date: '2026-05-10',
        tags: ['교내장학금', '성적우수'],
      },
      {
        id: 4,
        title: 'D장학금',
        price: '최대 120만원',
        priceValue: 1200000,
        category: '국가장학금',
        date: '2026-06-01',
        tags: ['교내장학금', '성적우수'],
      },
      {
        id: 5,
        title: 'E장학금',
        price: '20만원',
        priceValue: 200000,
        category: '조건별 장학금',
        date: '2026-06-25',
        tags: ['교내장학금', '성적우수'],
      },
      {
        id: 6,
        title: 'F장학금',
        price: '최대 15만원',
        priceValue: 150000,
        category: '지역 장학금',
        date: '2026-04-30',
        tags: ['교내장학금', '성적우수'],
      },
    ];

    const backendUrl = 'http://43.201.77.120:8080/api/benefits?category=ALL&sort=DEFAULT&page=1'; // 실제 장학금 리스트 API 주소로 교체하기

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
        console.log(data);

        setBenefitList(data.result.benefits);
        console.log('전체 카테고리 목록:', data.result.benefits.map(b => ({ 이름: b.benefitName, 카테고리: b.categories })));

        console.log(data.result.benefits[0]);
        console.log(data.result.benefits[0].categories);
      })
      .catch((error) => {
        console.error('백엔드 연동 전 예비 데이터');
        setBenefitList(dummyData); // 연동 전 예비 데이터
      });
  }, [currentCategory]);

  // 사용자 정보 박스 연동
  useEffect(() => {
    // 예시 데이터
    const dummyUser = {
      name: '홍길동',
      grade: '3학년',
      incomeLevel: '3구간',
    };

    const userUrl = 'http://43.201.77.120:8080/api/users/info'; // 실제 사용자 정보 API 주소로 교체하기

    const token = localStorage.getItem("accessToken");

    fetch(userUrl,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setUserInfo({
          name: data.result.baseInfo.schoolName,
          grade: data.result.baseInfo.grade + "학년",
          incomeLevel: data.result.detailInfo.incomeBracket + "구간",
        });
      })
      .catch((error) => {
        console.error('백엔드 연동 전 예비 사용자 데이터');
        setUserInfo(dummyUser);
      });
  }, []);

  // currentCategory에 맞는 장학금만 골라내기
  const filteredList =
    currentCategory === '전체'
      ? benefitList
      : benefitList.filter((item) => item.categories && item.categories.includes(currentCategory));

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === '최신순') {
      return new Date(b.date) - new Date(a.date); // 최신 날짜가 위로
    } else {
      return b.priceValue - a.priceValue; // 금액 높은 게 위로
    }
  });



  return (
    <S.PageWrapper>
      <Header title="맞춤 추천 혜택" />
      {/* 사용자 정보 카드 */}
      <UserInfoCard
        name={userInfo.name}
        grade={userInfo.grade}
        incomeLevel={userInfo.incomeLevel}
      />
      {/* 카테고리 버튼 바 */}
      <CategoryButtonBar
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <S.ScrollArea>
        <S.Rowbox>
          <S.SubTitle>
            추천 혜택 <span>{filteredList.length}</span>
          </S.SubTitle>

          {/* 정렬기준 버튼 */}
          <S.SortWrapper>
            {/* 클릭하면 열고 닫는 버튼 */}
            <S.SortButton onClick={() => setIsSortOpen(!isSortOpen)}>
              {sortType} ▼{' '}
            </S.SortButton>

            {/* isSortOpen이 true일 때만 아래 목록을 보여줌 */}
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

        {/* 장학금 카드 */}
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
              {benefit.amount.toLocaleString()}원
            </p>
          </BenefitDetailBox>
          );
        })}
      </S.ScrollArea>
    </S.PageWrapper>
  );
}

export default BenefitAll;
