import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ApplyItem from '../components/ApplyItem';
import Profile from '../assets/images/profile.png';

// 1. 백엔드 연동 전 더미 데이터 정의
const dummyUserData = {
  baseInfo: {
    name: '김도현',
    schoolName: '인천대학교',
    department: '정보통신공학과',
    grade: '3학년',
  },
  totalAmount: '1,460,000원',

  // 신청 현황 리스트 (가장 최근인 걸로 4개 필터링하기 위해 여러 개 배치)
  appliedBenefits: [
    {
      benefitId: 1,
      benefitName: '청년 마음건강 지원금',
      appliedDate: '2026-10-06',
      status: 'UNDER_REVIEW',
    },
    {
      benefitId: 2,
      benefitName: '초록사랑 지원금',
      appliedDate: '2026-10-06',
      status: 'UNDER_REVIEW',
    },
    {
      benefitId: 3,
      benefitName: '한국장학재단 국가장학금 1유형',
      appliedDate: '2026-10-06',
      status: 'SELECTED',
    },
    {
      benefitId: 4,
      benefitName: '건설근로자 자녀 장학금',
      appliedDate: '2026-10-06',
      status: 'NOT_SELECTED',
    },
    {
      benefitId: 5,
      benefitName: '과거 장학금 테스트',
      appliedDate: '2026-05-01',
      status: 'SELECTED',
    },
  ],
};

// API 상태 코드 매핑용 객체 (TABS 참고)
const STATUS_MAP = {
  UNDER_REVIEW: '심사 중',
  SELECTED: '선정',
  NOT_SELECTED: '미선정',
};

const MyPage = () => {
  const { baseInfo, totalAmount, appliedBenefits } = dummyUserData;

  const navigate = useNavigate();
  const handleCustomBack = () => {
    navigate('/home');
  };

  // 날짜 최신순 정렬 후 상위 4개 추출
  const sortedBenefits = [...appliedBenefits]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 4);

  return (
    <PageContainer>
      <Header title="MY" onBack={handleCustomBack} varient="purple" />

      <ContentWrapper>
        {/* 상단 프로필 및 예상 혜택 금액 카드 */}
        <ProfileCard>
          <CardTop>
            <Avatar src={Profile} />
            <UserInfo>
              <UserNameRow>
                <UserName>{baseInfo.name}님</UserName>
                <EditButton onClick={() => navigate('/my-info')}>
                  수정하기
                </EditButton>
              </UserNameRow>
              <UserDetail>
                {baseInfo.schoolName} {baseInfo.department} {baseInfo.grade}
              </UserDetail>
            </UserInfo>
          </CardTop>

          <CardBottom>
            <AmountLabel>예상 혜택 금액</AmountLabel>
            <AmountValueRow>
              <AmountValue>{totalAmount.toLocaleString()}</AmountValue>
              <ArrowIcon
                viewBox="0 0 24 24"
                onClick={() => navigate('/expected-benefit')}
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </ArrowIcon>
            </AmountValueRow>
          </CardBottom>
        </ProfileCard>

        {/* 신청 현황 섹션 */}
        <StatusSection>
          <SectionHeader>
            <SectionTitle>신청 현황</SectionTitle>
            <MoreButton onClick={() => navigate('/applied')}>
              더보기
              <SmallArrow viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </SmallArrow>
            </MoreButton>
          </SectionHeader>

          <ItemList>
            {sortedBenefits.map((item) => (
              <ApplyItem
                key={item.benefitId}
                title={item.benefitName}
                date={item.appliedDate}
                status={STATUS_MAP[item.status]} // 매핑된 한글 상태값 전달
              />
            ))}
          </ItemList>
        </StatusSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyPage;

/* 2. 스타일 컴포넌트 (Styled-Components) */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 50%; /* 화면 중앙 정렬을 위한 설정 */
  transform: translateX(-50%); /* 화면 중앙 정렬을 위한 설정 */

  /* 모바일 화면 규격 고정 (일반적인 모바일 앱 뷰 규격) */
  width: 100vw;
  max-width: 430px; /* 아이폰 14/15 프로 맥스 등 대형 모바일 기준 너비 제한 */
  height: 100dvh;

  background-color: #f8f9fa;
  box-sizing: border-box;
  overflow: hidden; /* 전체 화면 스크롤 절대 방지 */

  /* 데스크톱 화면에서 모바일 얇은 테두리나 그림자 효과를 주고 싶다면 추가 (선택사항) */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-left: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
`;

const ContentWrapper = styled.div`
  padding: 2.5vh 5vw 80px 5vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;

  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* 💡 스크롤바 투명하게 완전히 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 */
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* 파이어폭스 */
`;

/* 프로필 카드 스타일 */
const ProfileCard = styled.div`
  background-color: #584fea;
  border-radius: 10px;
  padding: 20px;
  color: #ffffff;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1vh;
  position: relative;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5vh;
`;

const UserNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 1.35rem;
  font-weight: 600;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

const UserDetail = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
`;

const CardBottom = styled.div`
  padding-top: 1vh;
  display: flex;
  flex-direction: column;
`;

const AmountLabel = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const AmountValueRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountValue = styled.span`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const ArrowIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  fill: #ffffff;
`;

/* 신청 현황 섹션 스타일 */
const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666666;
  font-size: 0.9rem;
  cursor: pointer;
  gap: 0.2vw;
  padding: 0;
`;

const SmallArrow = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: #666666;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;

  flex-shrink: 0;
  padding-bottom: 20px;
`;
