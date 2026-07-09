import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SmallLogo from '../assets/images/SmallLogo.svg';
import UserIcon from '../assets/images/user.png';
import StateIcon from '../assets/images/state.png';
import CorporateIcon from '../assets/images/corporate.png';
import RegionIcon from '../assets/images/region.png';
import RequirementIcon from '../assets/images/requirement.png';
import Check from '../assets/images/check-circle.png';
import Trending from '../assets/images/trending-up.png';
import State from '../assets/images/state2.png';
import Corporate from '../assets/images/corporate2.png';
import Region from '../assets/images/region2.png';
import Requirement from '../assets/images/requirement2.png';

const FIXED_CATEGORIES = [
  { id: 'state', category: '국가장학금', icon: StateIcon },
  { id: 'corporate', category: '기업·재단 장학금', icon: CorporateIcon },
  { id: 'region', category: '지역 장학금', icon: RegionIcon },
  { id: 'requirement', category: '조건별 장학금', icon: RequirementIcon },
];

const CATEGORY_ICONS = {
  국가장학금: State,
  '기업·재단 장학금': Corporate,
  '지역 장학금': Region,
  '조건별 장학금': Requirement,
};

export default function Home() {
  const navigate = useNavigate();

  const [userName] = useState('김도현');
  const [totalBenefitAmount] = useState(1460000);

  const [benefitCounts] = useState([
    { id: 'state', count: 12 },
    { id: 'corporate', count: 12 },
    { id: 'region', count: 12 },
    { id: 'requirement', count: 12 },
  ]);

  const [deadlineBenefits] = useState([
    {
      id: 1,
      category: '국가장학금',
      title: '교내 성적우수 장학금',
      amount: '최대 100만원',
      dDay: 'D-1',
    },
    {
      id: 2,
      category: '조건별 장학금',
      title: '청년 마음건강 지원금',
      amount: '30만원',
      dDay: 'D-5',
    },
    {
      id: 3,
      category: '기업·재단 장학금',
      title: '대학생 IT 공모전',
      amount: '상금 300만원',
      dDay: 'D-8',
    },
  ]);

  const getCountById = (id) => {
    const match = benefitCounts.find((item) => item.id === id);
    return match ? match.count : 0;
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <img src={SmallLogo} alt="Logo" className="logo" />
        <img
          src={UserIcon}
          alt="User"
          className="user-icon"
          onClick={() => navigate('/my-page')}
        />
      </Header>

      {/* 인사말 영역 */}
      <ScrollArea>
        <Greeting>
          <h1>{userName}님,</h1>
          <p>마감 임박 혜택을 확인해 장학금을 놓치지 마세요!</p>
        </Greeting>

        {/* 총 예상 혜택 금액 카드 */}
        <TotalBenefitCard>
          <span className="label">예상 혜택 금액</span>
          <h2 className="amount">총 {totalBenefitAmount.toLocaleString()}원</h2>
          <button
            className="detail-btn"
            onClick={() => navigate('/expected-benefit')}
          >
            상세 내역 보기
          </button>
        </TotalBenefitCard>

        {/* 맞춤 추천 혜택 섹션 (높이 특화) */}
        <SectionCard>
          <SectionHeader>
            <div className="title">
              <img src={Check} /> <span> 맞춤 추천 혜택 </span>
            </div>
            <span className="view-all" onClick={() => navigate('/benefit-all')}>
              전체 보기 {'>'}
            </span>
          </SectionHeader>

          <RecommendGrid>
            <GridItem
              onClick={() =>
                navigate('/benefit-all', { state: { category: '국가장학금' } })
              }
            >
              <img src={StateIcon} alt="국가장학금" className="cat-icon" />
              <div className="namebox">
                <span className="cat-name">국가장학금</span>
              </div>
              <span className="cat-count">{getCountById('state')}건</span>
            </GridItem>

            <GridItem
              onClick={() =>
                navigate('/benefit-all', {
                  state: { category: '기업·재단 장학금' },
                })
              }
            >
              <img
                src={CorporateIcon}
                alt="기업·재단 장학금"
                className="cat-icon"
              />
              <div className="namebox">
                <span className="cat-name">
                  기업·재단
                  <br />
                  장학금
                </span>
              </div>
              <span className="cat-count">{getCountById('corporate')}건</span>
            </GridItem>

            <GridItem
              onClick={() =>
                navigate('/benefit-all', { state: { category: '지역 장학금' } })
              }
            >
              <img src={RegionIcon} alt="지역 장학금" className="cat-icon" />
              <div className="namebox">
                <span className="cat-name">지역 장학금</span>
              </div>
              <span className="cat-count">{getCountById('region')}건</span>
            </GridItem>

            <GridItem
              onClick={() =>
                navigate('/benefit-all', {
                  state: { category: '조건별 장학금' },
                })
              }
            >
              <img
                src={RequirementIcon}
                alt="조건별 장학금"
                className="cat-icon"
              />
              <div className="namebox">
                <span className="cat-name">
                  조건별
                  <br />
                  장학금
                </span>
              </div>
              <span className="cat-count">{getCountById('requirement')}건</span>
            </GridItem>
          </RecommendGrid>
        </SectionCard>

        {/* 마감 임박 혜택 섹션 */}
        <SectionCard>
          <SectionHeader>
            <div className="title">
              <img src={Trending} /> <span>마감 임박 혜택 TOP 3 </span>
            </div>
            <span className="view-all">전체 보기 {'>'}</span>
          </SectionHeader>

          <DeadlineList>
            {deadlineBenefits.map((item, index) => (
              <DeadlineItem
                key={item.id}
                $isLast={index === deadlineBenefits.length - 1}
              >
                <div className="item-icon-wrapper">
                  <img
                    src={CATEGORY_ICONS[item.category] || SmallLogo}
                    alt="icon"
                  />
                </div>

                <div className="item-info">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-amount">{item.amount}</p>
                </div>

                <div className="d-day-badge">{item.dDay}</div>
              </DeadlineItem>
            ))}
          </DeadlineList>
        </SectionCard>
      </ScrollArea>
    </Container>
  );
}

// ==============================
// Styled Components
// ==============================

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  max-height: 874px;
  margin: 0 auto;
  background-color: #f8f9fe;
  padding: clamp(16px, 3vh, 24px) 20px 0 20px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;

  display: flex;
  flex-direction: column;
  gap: 2.29vh;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1vh;
  flex-shrink: 0;

  .logo {
    height: 2.75vh;
  }

  .user-icon {
    width: 3.2vh;
    height: 3.2vh;
    cursor: pointer;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.29vh;
  overflow-y: auto; /* 내용물이 넘치면 이 안에서 세로 스크롤 작동 */
  -webkit-overflow-scrolling: touch; /* 모바일 관성 스크롤 대응 */
  padding-bottom: 40px; /* 💡 최하단 마감 임박 리스트가 잘리지 않고 위로 끝까지 밀리도록 넉넉한 쿠션 확보 */

  /* 💡 스크롤바 레이아웃 완벽 은닉 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Greeting = styled.div`
  h1 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #111;
    margin: 12px 0 4px 0;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 0;
  }
`;

const TotalBenefitCard = styled.div`
  background-color: #5b4fea;
  width: 100%;
  height: 19.68vh;
  border-radius: 12px;
  padding: 2.75vh 4vw;
  color: white;
  box-shadow: 0 4px 12px rgba(91, 82, 239, 0.15);

  .label {
    display: block;
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 0.69vh;
    opacity: 0.9;
  }

  .amount {
    font-size: 1.7rem;
    font-weight: 700;
    margin: 0 0 2.06vh 0;
  }

  .detail-btn {
    width: 100%;
    height: 5vh;
    background-color: white;
    color: #333;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2.75vh 4vw;
  border: 1px solid #c3c0fb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  height: auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6vh;

  .title {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }
  }

  .view-all {
    font-size: 0.9rem;
    color: #888;
    cursor: pointer;
  }
`;

const RecommendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 9px;
`;

/* 높이를 강제해서 내용물에 의해 뚱뚱해지는 것을 방지 */
const GridItem = styled.div`
  background-color: #584fea;
  border-radius: 6px;
  height: 13.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;

  .cat-icon {
    height: 50%;
  }

  .namebox {
    height: 3.51vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cat-name {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 2px;
    text-align: center;
    word-break: keep-all;
  }

  .cat-count {
    font-size: 0.7rem;
    font-weight: 300;
    opacity: 0.8;
  }
`;

const DeadlineList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0 4px 0;
  border-bottom: ${(props) => (props.$isLast ? 'none' : '1px solid #F0F2F5')};

  .item-icon-wrapper {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    img {
      width: 5.26vh;
      height: 5.26vh;
    }
  }

  .item-info {
    flex: 1;

    .item-title {
      font-size: clamp(13px, 2vh, 15px);
      font-weight: 600;
      color: #222;
      margin: 0 0 4px 0;
    }

    .item-amount {
      font-size: clamp(11px, 1.8vh, 13px);
      color: #666;
      margin: 0;
    }
  }

  .d-day-badge {
    background-color: #ffebeb;
    color: #ff3b3b;
    font-size: clamp(10px, 1.8vh, 12px);
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 6px;
  }
`;
