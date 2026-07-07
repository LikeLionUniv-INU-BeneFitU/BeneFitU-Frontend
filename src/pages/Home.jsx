import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 이미지 Assets (경로 절대 불변 유지)
import SmallLogo from '../assets/images/SmallLogo.svg';
import UserIcon from '../assets/images/user.png';
import StateIcon from '../assets/images/state.png';
import CorporateIcon from '../assets/images/corporate.png';
import RegionIcon from '../assets/images/region.png';
import RequirementIcon from '../assets/images/requirement.png';

const FIXED_CATEGORIES = [
  { id: 'state', category: '국가장학금', icon: StateIcon },
  { id: 'corporate', category: '기업·재단 장학금', icon: CorporateIcon },
  { id: 'region', category: '지역 장학금', icon: RegionIcon },
  { id: 'requirement', category: '조건별 장학금', icon: RequirementIcon },
];

const CATEGORY_ICONS = {
  국가장학금: StateIcon,
  '기업·재단 장학금': CorporateIcon,
  '지역 장학금': RegionIcon,
  '조건별 장학금': RequirementIcon,
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
        <img src={UserIcon} alt="User" className="user-icon" />
      </Header>

      {/* 인사말 영역 */}
      <Greeting>
        <h1>{userName}님,</h1>
        <p>마감 임박 혜택을 확인해 장학금을 놓치지 마세요!</p>
      </Greeting>

      {/* 총 예상 혜택 금액 카드 */}
      <TotalBenefitCard>
        <span className="label">예상 혜택 금액</span>
        <h2 className="amount">총 {totalBenefitAmount.toLocaleString()}원</h2>
        <button className="detail-btn">상세 내역 보기</button>
      </TotalBenefitCard>

      {/* 맞춤 추천 혜택 섹션 (높이 특화) */}
      <RecommendSection>
        <SectionHeader>
          <div className="title">
            <span className="icon">✔️</span> 맞춤 추천 혜택
          </div>
          <span className="view-all">전체 보기 {'>'}</span>
        </SectionHeader>

        <RecommendGrid>
          {FIXED_CATEGORIES.map((cat) => (
            <GridItem key={cat.id}>
              <img src={cat.icon} alt={cat.category} className="cat-icon" />
              <span className="cat-name">{cat.category}</span>
              <span className="cat-count">{getCountById(cat.id)}건</span>
            </GridItem>
          ))}
        </RecommendGrid>
      </RecommendSection>

      {/* 마감 임박 혜택 섹션 */}
      <SectionCard>
        <SectionHeader>
          <div className="title">
            <span className="icon">📈</span> 마감 임박 혜택 TOP 3
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
  padding: clamp(16px, 3vh, 24px) 20px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    height: clamp(20px, 3vh, 24px);
  }

  .user-icon {
    width: clamp(20px, 3vh, 24px);
    height: clamp(20px, 3vh, 24px);
    cursor: pointer;
  }
`;

const Greeting = styled.div`
  h1 {
    font-size: clamp(20px, 4vh, 24px);
    font-weight: 700;
    color: #111;
    margin: 0 0 4px 0;
  }

  p {
    font-size: clamp(12px, 2vh, 14px);
    color: #555;
    margin: 0;
  }
`;

const TotalBenefitCard = styled.div`
  background-color: #5b52ef;
  border-radius: 12px;
  padding: clamp(16px, 3vh, 24px) 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(91, 82, 239, 0.15);

  .label {
    display: block;
    font-size: clamp(12px, 2vh, 14px);
    font-weight: 500;
    margin-bottom: 6px;
    opacity: 0.9;
  }

  .amount {
    font-size: clamp(24px, 4vh, 28px);
    font-weight: 700;
    margin: 0 0 clamp(12px, 2.5vh, 20px) 0;
  }

  .detail-btn {
    width: 100%;
    background-color: white;
    color: #333;
    border: none;
    border-radius: 8px;
    padding: clamp(10px, 2vh, 14px) 0;
    font-size: clamp(13px, 2vh, 15px);
    font-weight: 600;
    cursor: pointer;
  }
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: clamp(12px, 2.5vh, 20px);
  border: 1px solid #eaecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

/* 맞춤 추천 혜택 전용 스타일 (피그마 185px 맞춤) */
const RecommendSection = styled(SectionCard)`
  max-height: 185px; /* 피그마 수치 강제 반영 */
  padding: clamp(12px, 2vh, 16px) 20px; /* 상하 여백을 조금 더 타이트하게 */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(8px, 1.5vh, 14px);

  .title {
    font-size: clamp(14px, 2.5vh, 16px);
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .view-all {
    font-size: 12px;
    color: #888;
    cursor: pointer;
  }
`;

const RecommendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

/* 높이를 강제해서 내용물에 의해 뚱뚱해지는 것을 방지 */
const GridItem = styled.div`
  background-color: #5b52ef;
  border-radius: 8px;
  height: clamp(80px, 12vh, 104px); /* 피그마 비율에 맞춘 높이 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;

  .cat-icon {
    width: clamp(20px, 3vh, 28px);
    height: clamp(20px, 3vh, 28px);
    margin-bottom: 6px;
  }

  .cat-name {
    font-size: clamp(9px, 1.3vh, 11px);
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 2px;
    word-break: keep-all;
  }

  .cat-count {
    font-size: clamp(9px, 1.3vh, 11px);
    font-weight: 400;
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
  padding: clamp(8px, 1.5vh, 14px) 0;
  border-bottom: ${(props) => (props.$isLast ? 'none' : '1px solid #F0F2F5')};

  .item-icon-wrapper {
    width: clamp(36px, 5.5vh, 48px);
    height: clamp(36px, 5.5vh, 48px);
    background-color: #f3f4fe;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    img {
      width: clamp(18px, 3vh, 24px);
      height: clamp(18px, 3vh, 24px);
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
