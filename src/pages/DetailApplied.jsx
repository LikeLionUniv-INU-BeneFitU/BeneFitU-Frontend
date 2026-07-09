import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';

// Applied.jsx와 100% 동일한 TABS 구조 및 라벨링
const TABS = [
  { id: 'ALL', label: '전체' },
  { id: 'UNDER_REVIEW', label: '심사 중' },
  { id: 'SELECTED', label: '선정' },
  { id: 'NOT_SELECTED', label: '미선정' },
];

// 백엔드 데이터 포맷을 반영한 초기 더미 데이터
const dummyData = {
  benefitDetail: {
    benefitId: 3,
    benefitName: '한국장학재단 국가장학금 1유형',
    category: '국가장학금',
    amount: 2500000,
    deadline: '2026-08-20',
    benefitUrl: 'https://www.kosaf.go.kr',
    notes: [
      '학자금 지원 9구간 이하',
      '성적 및 이수학점 기준 충족',
      '한국 장학재단 신청 및 가구원 동의 완료',
      '소득구간에 따라 등록금 차등 지원',
    ],
  },
  matchedConditions: {
    gpa: '학점 3.0 이상',
    incomeBracket: '소득분위 8분위 이하',
    isBasicLiving: '기초생활수급자 아님',
    isSecondLowest: '차상위계층 아님',
  },
  passProbability: 85,
};

export default function DetailApplied() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('UNDER_REVIEW');
  const [reviewStatus, setReviewStatus] = useState('SELECTED'); // 라디오 버튼 상태 ('SELECTED' 또는 'NOT_SELECTED')
  const [originalStatus, setOriginalStatus] = useState('SELECTED');

  const { benefitDetail } = dummyData;

  // 💡 상단 카테고리 탭 클릭 시 목록 페이지(Applied)로 누른 탭 state 전달하며 이동
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate('/applied', { state: { activeTab: tabId } });
  };

  // 하단 라디오 버튼 클릭 시 탭 연동 없이 라디오 상태만 순수하게 변경
  const handleRadioClick = (statusId) => {
    setReviewStatus(statusId);
  };

  // 디데이 계산 함수
  const getDDay = (deadlineStr) => {
    if (!deadlineStr) return '';
    const targetDate = new Date(deadlineStr);
    const today = new Date();
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'D-Day';
    return diffDays > 0 ? `D-${diffDays}` : `만료됨`;
  };

  // 금액 포맷팅 (원화 기준 만원 단위 변환)
  const formatAmount = (amount) => {
    if (!amount) return '금액 정보 없음';
    if (amount >= 10000) return `최대 ${(amount / 10000).toLocaleString()}만원`;
    return `${amount.toLocaleString()}원`;
  };

  const handleSave = () => {
    console.log('최종본 제출 상태:', reviewStatus);
    setOriginalStatus(reviewStatus); // 저장이 완료되면 현재 상태를 새로운 원본으로 동기화
    alert(
      `현황이 저장되었습니다. (최종 상태: ${reviewStatus === 'SELECTED' ? '선정' : '미선정'})`,
    );
    // 백엔드 PATCH/POST API 연동 공간
  };

  return (
    <Container>
      <Header title="신청 현황 상세" />

      {/* Applied.jsx와 완벽히 동일한 스타일과 구조의 탭바 */}
      <TabContainer>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      {/* 컨텐츠 바디 영역 */}
      <ContentList>
        {/* 상세 혜택 카드 */}
        <CardBox>
          <CardTitle>{benefitDetail.benefitName}</CardTitle>

          <TagRow>
            <Tag>{benefitDetail.category}</Tag>
            <Tag>한국장학재단</Tag>
          </TagRow>

          <AmountText>{formatAmount(benefitDetail.amount)}</AmountText>
          <DeadlineText>
            <span>마감일</span> {benefitDetail.deadline.replace(/-/g, '.')} (
            {getDDay(benefitDetail.deadline)})
          </DeadlineText>

          <BulletList>
            {benefitDetail.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </BulletList>
        </CardBox>

        {/* 심사 상태 변경 라디오 영역 */}
        <ReviewSection>
          <SectionTitle>심사 상태 변경</SectionTitle>
          <SectionSubTitle>심사 결과를 선택하고 저장해주세요</SectionSubTitle>

          <RadioGroup>
            <RadioBox
              $isSelected={reviewStatus === 'SELECTED'}
              onClick={() => handleRadioClick('SELECTED')}
            >
              <CheckCircle $isSelected={reviewStatus === 'SELECTED'} />
              선정
            </RadioBox>
            <RadioBox
              $isSelected={reviewStatus === 'NOT_SELECTED'}
              onClick={() => handleRadioClick('NOT_SELECTED')}
            >
              <CheckCircle $isSelected={reviewStatus === 'NOT_SELECTED'} />
              미선정
            </RadioBox>
          </RadioGroup>
        </ReviewSection>

        {/* 안내사항 블록 */}
        <NoticeBox>
          <NoticeTitle>⚠️ 안내사항</NoticeTitle>
          <NoticeContent>
            선정/미선정 상태를 변경하면 신청 현황에 기록됩니다.
          </NoticeContent>
        </NoticeBox>
      </ContentList>

      {/* 하단 저장 버튼 */}
      <ButtonWrapper>
        {/* 💡 조건 없이 항상 상시 활성화(disabled 속성 제거) */}
        <BasicButton onClick={handleSave}>현황 저장하기</BasicButton>
      </ButtonWrapper>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #aab3e7;
  margin-bottom: 5px;
  background-color: #ffffff;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  color: #0c0e19;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px; /* 인디케이터 두께 일치 */
    background-color: #5c59f0; /* 포인트 블루 컬러 일치 */
  }
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px; /* 카드 배치를 위한 패딩 미세 조정 */
  background-color: #f8f9fa; /* 카드가 선명히 구분되도록 컨텐츠 영역만 연회색 적용 */
  flex: 1;
  padding-bottom: 110px; /* 하단 버튼 배치 공간 확보 */
`;

// --- 내부 엘리먼트 스타일 커스텀 ---
const CardBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2.3vh;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  gap: 6px;
  margin: 1.8vh 0;
`;

const Tag = styled.span`
  padding: 4px 10px;
  background-color: #d9d9d9;
  color: #000000;
  font-size: 0.75rem;
  font-weight: 400;
  border-radius: 4px;
`;

const AmountText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2578b0;
  margin-bottom: 10px;
`;

const DeadlineText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 18px;

  span {
    font-weight: 400;
  }
`;

const BulletList = styled.ul`
  padding-left: 14px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    font-size: 0.85rem;
    color: #000000;
    list-style-type: disc;
    line-height: 1.2;
  }
`;

const ReviewSection = styled.div`
  margin-top: 1.8vh;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #111111;
  margin: 0 0 4px 0;
`;

const SectionSubTitle = styled.span`
  font-size: 0.8rem;
  color: #8c94a4;
  margin-bottom: 12px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const RadioBox = styled.div`
  flex: 1;
  height: 8vh;
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.$isSelected ? '#5c59f0' : '#e2e5ec')};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => (props.$isSelected ? '#5c59f0' : '#495057')};
  cursor: pointer;
`;

const CheckCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$isSelected ? '#5c59f0' : '#adb5bd')};
  background-color: ${(props) => (props.$isSelected ? '#5c59f0' : '#ffffff')};
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.$isSelected ? 'block' : 'none')};
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const NoticeBox = styled.div`
  margin-top: 2vh;
  background-color: #f1f0fe;
  padding: 12px 16px;
  border-radius: 8px;
`;

const NoticeTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: #5c59f0;
  margin-bottom: 2px;
`;

const NoticeContent = styled.div`
  font-size: 0.75rem;
  color: #666666;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 32px 20px;
  background: linear-gradient(to top, #ffffff 80%, rgba(255, 255, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;
