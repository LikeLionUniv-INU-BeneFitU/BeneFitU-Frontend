import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

// 화면에 상시 고정되는 카테고리 및 아이콘 정적 데이터
const FIXED_CATEGORIES = [
  { id: 'scholarship', category: '장학금', icon: '🎓' },
  { id: 'workStudy', category: '교내근로', icon: '🏫' },
  { id: 'activity', category: '대외활동', icon: '🏛️' },
  { id: 'youthFund', category: '청년지원금', icon: '✨' },
];

export default function Home() {
  const navigate = useNavigate();
  // 백엔드 연동용 동적 데이터 상태 (초기 더미 데이터)
  const [userName, setUserName] = useState('김도현');
  const [totalBenefitAmount, setTotalBenefitAmount] = useState(1460000);

  const [benefitCounts, setBenefitCounts] = useState([
    { id: 'scholarship', count: 12 },
    { id: 'workStudy', count: 8 },
    { id: 'activity', count: 15 },
    { id: 'youthFund', count: 6 },
  ]);

  const [deadlineBenefits, setDeadlineBenefits] = useState([
    { id: 1, title: '장학금', amount: '', dDay: 'D-1' },
    { id: 2, title: '청년 마음건강 지원금', amount: '30만원', dDay: 'D-5' },
    { id: 3, title: '대학생 IT 공모전', amount: '상금 300만원', dDay: 'D-8' },
  ]);

  // 고정 카테고리에 백엔드 count를 매칭하는 함수
  const getCountById = (id) => {
    const match = benefitCounts.find((item) => item.id === id);
    return match ? match.count : 0;
  };

  return (
    <PageWrapper>
      {/* 💡 푸터를 제외한 본문 영역만 감싸서 스크롤을 주는 컨테이너 */}
      <ScrollContainer>
        <ContentContainer>
          {/* 상단 웰컴 텍스트 영역 */}
          <WelcomeSection>
            <WelcomeTitle>안녕하세요, {userName} 님!</WelcomeTitle>
            <WelcomeSubtitle>
              오늘 받을 수 있는 혜택을 확인해보세요
            </WelcomeSubtitle>
          </WelcomeSection>

          {/* 예상 혜택 금액 카드 (우측 상단 > 버튼 변경 완료) */}
          <BenefitCard>
            <CardHeaderRow>
              <CardTitle>예상 혜택 금액</CardTitle>
              <CardArrowButton>&gt;</CardArrowButton>
            </CardHeaderRow>
            <CardAmount>총 {totalBenefitAmount.toLocaleString()}원</CardAmount>
            <DetailButton>상세 내역 보기</DetailButton>
          </BenefitCard>

          {/* 맞춤 추천 혜택 섹션 (우측 전체보기 > 변경 완료) */}
          <SectionHeaderRow>
            <SectionTitle>🎁 맞춤 추천 혜택</SectionTitle>
            <ViewAllButton onClick={() => navigate('/benefit-all')}>
              전체 보기 <span className="arrow">&gt;</span>
            </ViewAllButton>
          </SectionHeaderRow>

          {/* 와이어프레임 형태의 4열 가로 정렬 Grid */}
          <GridContainer>
            {FIXED_CATEGORIES.map((cat) => (
              <GridCard key={cat.id}>
                <GridIcon>{cat.icon}</GridIcon>
                <CategoryName>{cat.category}</CategoryName>
                <BenefitCount>{getCountById(cat.id)}건</BenefitCount>
              </GridCard>
            ))}
          </GridContainer>

          {/* 마감 임박 혜택 섹션 */}
          <SectionTitle style={{ marginTop: '8px' }}>
            🔥 마감 임박 혜택 TOP 3
          </SectionTitle>
          <ListContainer>
            {deadlineBenefits.map((item) => (
              <ListCard key={item.id}>
                <ListLeftSection>
                  <ListThumbnail />
                  <ListInfo>
                    <ListTitle>{item.title}</ListTitle>
                    {item.amount && <ListAmount>{item.amount}</ListAmount>}
                  </ListInfo>
                </ListLeftSection>
                <DDayBadge>{item.dDay}</DDayBadge>
              </ListCard>
            ))}
          </ListContainer>
        </ContentContainer>
      </ScrollContainer>

      {/* 하단 탭 바 (화면 바닥에 상시 고정됨) */}
      <Footer />
    </PageWrapper>
  );
}

// ==========================================
// ✨ 스타일 코드 (Styled Components)
// ==========================================

const PageWrapper = styled.div`
  max-width: 450px;
  height: 100vh; /* 💡 전체 껍데기는 브라우저 화면 높이에 딱 맞춤 */
  margin: 0 auto;
  background-color: #fafaff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden; /* 💡 껍데기 자체 바깥으로 터지는 스크롤은 막음 */
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* 💡 푸터 위 영역에서만 본문 내용이 길어질 때 스크롤 발생 */

  /* 스크롤바가 UI를 해치지 않도록 숨김 처리 (선택) */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.main`
  padding: 36px 24px 100px 24px; /* 💡 푸터에 가려지지 않게 바닥 패딩 유지 */
  display: flex;
  flex-direction: column;
  gap: 20px; /* space-between을 제거하고 촘촘하고 예쁜 균일 마진 지정 */
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 4px;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

const WelcomeSubtitle = styled.p`
  font-size: 0.9rem;
  color: #444444;
  margin: 0;
`;

const BenefitCard = styled.div`
  background-color: #5c4ff2;
  padding: 24px;
  border-radius: 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 8px 20px rgba(92, 79, 242, 0.2);
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  opacity: 0.9;
`;

const CardArrowButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const CardAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: -4px;
`;

const DetailButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  color: #111111;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
`;

const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #777777;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  .arrow {
    font-size: 0.9rem;
    font-weight: bold;
    display: inline-block;
    transform: translateY(-0.5px); /* 꺾쇠 문자 수평 정렬 보정 */
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const GridCard = styled.div`
  background-color: #e2e2e2;
  padding: 12px 4px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const GridIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

const CategoryName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #444444;
`;

const BenefitCount = styled.span`
  font-size: 0.7rem;
  color: #777777;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListCard = styled.div`
  background-color: #ffffff;
  padding: 14px 16px;
  border: 1px solid #eef0f5;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
`;

const ListLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ListThumbnail = styled.div`
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 6px;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ListTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #111111;
`;

const ListAmount = styled.span`
  font-size: 0.8rem;
  color: #666666;
`;

const DDayBadge = styled.span`
  background-color: #ffeded;
  color: #ff4d4d;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
`;
