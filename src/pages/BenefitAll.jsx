import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios'; // axios 인스턴스 임포트
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './BenefitAll.styles';
import CategoryButtonBar from '../components/CategoryButtonBar';
import UserInfoCard from '../components/UserInfoCard';

// 한글 카테고리명을 백엔드 요청용 쿼리 스트링 값으로 매핑
const categoryMap = {
  전체: 'ALL',
  국가장학금: 'STATE',
  '기업·재단 장학금': 'CORPORATE',
  '지역 장학금': 'REGION',
  조건별장학금: 'REQUIREMENTS',
};

// 프론트엔드 정렬 타입을 백엔드 요청용 쿼리 스트링 값으로 매핑
const sortMap = {
  최신순: 'DEFAULT',
  금액순: 'AMOUNT_HIGH',
};

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

  // 사용자 정보 조회 API 연동
  useEffect(() => {
    api
      .get('/api/users/info')
      .then((res) => {
        const { baseInfo, detailInfo } = res.data.result;
        setUserInfo({
          name: baseInfo.name,
          gpa: detailInfo.gpa,
          incomeLevel: detailInfo.incomeBracket + '구간',
        });
      })
      .catch((error) => {
        console.error('사용자 정보 조회 실패', error);
      });
  }, []);

  // 카테고리 또는 정렬 기준 변경 시 혜택 목록 조회 API 연동
  useEffect(() => {
    const categoryQuery = categoryMap[currentCategory] || 'ALL';
    const sortQuery = sortMap[sortType] || 'DEFAULT'; // 원래 정렬 맵 로직으로 복구

    // 첫 페이지 인덱스 가설 검증을 위해 page를 0으로 설정하여 호출
    api
      .get(`/api/benefits?category=${categoryQuery}&sort=${sortQuery}&page=0`)
      .then((res) => {
        setBenefitList(res.data.result.benefits || []);
      })
      .catch((error) => {
        console.error('장학금 리스트 조회 실패', error);
        setBenefitList([]);
      });
  }, [currentCategory, sortType]);

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
            추천 혜택 <span>{benefitList.length}</span>
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

        {/* ExpectedBenefit 컴포넌트의 매핑 및 렌더링 구조와 완벽히 통일 */}
        {benefitList &&
          benefitList.map((benefit) => {
            // 백엔드 데이터에 문자열 공백이 포함되어 올 경우를 대비해 trim 처리
            const cleanCategory = benefit.categories[0]
              ? benefit.categories[0].trim()
              : '';

            return (
              <BenefitDetailBox
                key={benefit.benefitId}
                buttonText="상세 보기"
                to={`/detail/${benefit.benefitId}`}
                category={cleanCategory}
                tags={benefit.categories}
              >
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  {benefit.benefitName}
                </p>
                <p
                  style={{
                    color: '#2578B0',
                    fontWeight: 'bold',
                    fontSize: '17px',
                  }}
                >
                  {benefit.amount}
                </p>
              </BenefitDetailBox>
            );
          })}
      </S.ScrollArea>
    </S.PageWrapper>
  );
}

export default BenefitAll;
