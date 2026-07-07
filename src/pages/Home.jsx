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
    <PageWrapper>
      <HeaderRow>
        <LogoImage src={SmallLogo} alt="로고" />
        <UserIconImage src={UserIcon} alt="마이페이지" />
      </HeaderRow>

      <MainContentContainer>
        {/* 1. 웰컴 텍스트 */}
        <WelcomeSection>
          <WelcomeTitle>{userName}님,</WelcomeTitle>
          <WelcomeSubtitle>
            마감 임박 혜택을 확인해 장학금을 놓치지 마세요!
          </WelcomeSubtitle>
        </WelcomeSection>

        {/* 2. 예상 혜택 금액 카드 */}
        <BenefitCard>
          <CardTitle>예상 혜택 금액</CardTitle>
          <CardAmount>총 {totalBenefitAmount.toLocaleString()}원</CardAmount>
          <DetailButton>상세 내역 보기</DetailButton>
        </BenefitCard>

        {/* 3. 맞춤 추천 혜택 섹션 */}
        <WhiteCardBox>
          <SectionHeaderRow>
            <SectionTitle>맞춤 추천 혜택</SectionTitle>
            <ViewAllButton onClick={() => navigate('/benefit-all')}>
              전체 보기 <span className="arrow">&gt;</span>
            </ViewAllButton>
          </SectionHeaderRow>

          <GridContainer>
            {FIXED_CATEGORIES.map((cat) => (
              <GridCard key={cat.id}>
                <GridIcon>
                  <img src={cat.icon} alt={cat.category} />
                </GridIcon>
                <CategoryName>{cat.category}</CategoryName>
                <BenefitCount>{getCountById(cat.id)}건</BenefitCount>
              </GridCard>
            ))}
          </GridContainer>
        </WhiteCardBox>

        {/* 4. 마감 임박 혜택 섹션 */}
        <WhiteCardBox>
          <SectionHeaderRow>
            <SectionTitle>마감 임박 혜택 TOP 3</SectionTitle>
            <ViewAllButton onClick={() => navigate('/deadline-all')}>
              전체 보기 <span className="arrow">&gt;</span>
            </ViewAllButton>
          </SectionHeaderRow>

          <InnerListBox>
            {deadlineBenefits.map((item) => (
              <ListCard key={item.id}>
                <ListLeftSection>
                  <ListThumbnail
                    src={CATEGORY_ICONS[item.category] || StateIcon}
                    alt="icon"
                  />
                  <ListInfo>
                    <ListTitle>{item.title}</ListTitle>
                    <ListAmount>{item.amount || '상세내용 참조'}</ListAmount>
                  </ListInfo>
                </ListLeftSection>
                <DDayBadge>{item.dDay}</DDayBadge>
              </ListCard>
            ))}
          </InnerListBox>
        </WhiteCardBox>
      </MainContentContainer>
    </PageWrapper>
  );
}

// ==========================================
// ✨ 스타일 코드 (슬림 비율 최적화 완료)
// ==========================================

const PageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100vh;
  height: 100svh;
  margin: 0 auto;
  background-color: #f5f6fa;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 상단 다이내믹 아일랜드 영역 고려 안전 패딩만 유지 */
  padding: calc(12px + env(safe-area-inset-top, 0px)) 24px 4px 24px;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  height: 24px;
  object-fit: contain;
`;

const UserIconImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MainContentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 20px calc(12px + env(safe-area-inset-bottom, 0px)) 20px;
  /* 💡 874px 규격 타겟에 맞춰 간격을 촘촘하게 고정 */
  gap: 1.6vh;
  justify-content: flex-start;
  min-height: 0;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
  padding-left: 2px;
`;

const WelcomeTitle = styled.h1`
  font-size: calc(1.3rem + 0.2vh);
  font-weight: 800;
  color: #111111;
  margin: 0;
`;

const WelcomeSubtitle = styled.p`
  font-size: calc(0.72rem + 0.05vh);
  font-weight: 500;
  color: #555555;
  margin: 0;
`;

/* 💡 [수정] 억지 패딩 제거, 시안에 맞추어 슬림하게 세로 비율 압축 */
const BenefitCard = styled.div`
  background-color: #584fea;
  padding: 16px 20px;
  border-radius: 16px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  box-shadow: 0 6px 14px rgba(88, 79, 234, 0.12);
`;

const CardTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.9;
`;

const CardAmount = styled.div`
  font-size: calc(1.4rem + 0.2vh);
  font-weight: 700;
  margin-top: -2px;
`;

const DetailButton = styled.button`
  width: 100%;
  height: 38px;
  background-color: #ffffff;
  color: #111111;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 2px;
`;

/* 💡 [수정] 외부 화이트 박스의 과도한 세로 패딩을 덜어내어 콤팩트하게 교정 */
const WhiteCardBox = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 14px 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border: 1px solid #f0f2f7;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
`;

const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
`;

const SectionTitle = styled.h2`
  font-size: calc(0.85rem + 0.05vh);
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`;

/* 💡 [수정] 억지로 늘려놓은 세로 패딩 제거, 정사각형 감각의 크기로 밸런싱 */
const GridCard = styled.div`
  background-color: #584fea;
  padding: 12px 2px 10px 2px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  min-height: 85px;
`;

const GridIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

/* 💡 [수정] white-space를 풀고 일정한 가로폭을 주어 글자가 길면 자연스럽게 두 줄로 정렬 */
const CategoryName = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  color: #ffffff;
  display: block;
  max-width: 65px; /* 글자가 '기업·재단 장학금'일 때 깔끔하게 끊기도록 유도 */
  line-height: 1.2;
`;

const BenefitCount = styled.span`
  font-size: 0.58rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;

const InnerListBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eef0f5;
  border-radius: 10px;
  padding: 0 8px;
  background-color: #ffffff;
`;

/* 💡 [수정] 리스트 아이템들의 무의미한 유동 세로 간격을 고정 px 기반 패딩으로 압축 */
const ListCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;

  &:not(:last-child) {
    border-bottom: 1px solid #f1f3f7;
  }
`;

const ListLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ListThumbnail = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ListTitle = styled.span`
  font-size: calc(0.76rem + 0.05vh);
  font-weight: 700;
  color: #111111;
`;

const ListAmount = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: #777777;
`;

const DDayBadge = styled.span`
  background-color: #ffeded;
  color: #ff4d4d;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 5px;
  white-space: nowrap;
`;
