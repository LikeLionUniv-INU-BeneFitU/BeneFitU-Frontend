import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import api from '../api/axios';

const TABS = [
  { id: 'ALL', label: '전체' },
  { id: 'UNDER_REVIEW', label: '심사 중' },
  { id: 'SELECTED', label: '선정' },
  { id: 'NOT_SELECTED', label: '미선정' },
];

export default function DetailApplied() {
  const navigate = useNavigate();
  const { benefitId } = useParams();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.fromTab || 'ALL');

  const initialDefaultStatus =
    activeTab === 'SELECTED' || activeTab === 'NOT_SELECTED'
      ? activeTab
      : 'UNDER_REVIEW';

  const [reviewStatus, setReviewStatus] = useState(initialDefaultStatus);
  const [initialStatus, setInitialStatus] = useState(initialDefaultStatus);
  const [benefitDetail, setBenefitDetail] = useState(null);

  // 1. API 상세 조회 및 상태 동기화
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await api.get(`/api/benefits/${benefitId}`);

        if (response.data.isSuccess) {
          const detail = response.data.result?.benefitDetails || {};
          const matched = response.data.result?.matchedConditions;

          setBenefitDetail({
            benefitName: detail.benefitName,
            category: detail.category,
            amount: detail.amount,
            deadline: detail.deadLine || detail.deadline,
            requirements: matched ? Object.values(matched) : [],
          });

          if (detail.applyStatus) {
            setReviewStatus(detail.applyStatus);
            setInitialStatus(detail.applyStatus);
            // 💡 최초 진입 시 '전체' 탭이 아니라면, 백엔드가 준 상태에 맞춰 상단 탭 밑줄도 동기화
            if (activeTab !== 'ALL') {
              setActiveTab(detail.applyStatus);
            }
          }
        }
      } catch (error) {
        console.error('혜택 상세 조회 중 오류 발생:', error);
      }
    };

    if (benefitId) fetchDetailData();
  }, [benefitId]);

  const handleRadioClick = (statusId) => {
    if (initialStatus === 'SELECTED' || initialStatus === 'NOT_SELECTED')
      return;
    setReviewStatus(statusId);

    // 💡 [실시간 연동] 심사 중 상태에서 라디오 버튼을 바꿀 때 상단 탭 밑줄도 즉시 같이 이동 (단, '전체' 탭 진입시는 제외)
    if (activeTab !== 'ALL') {
      setActiveTab(statusId);
    }
  };

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

  const formatAmount = (amount) => {
    if (!amount || amount === '0' || amount === 0 || amount.includes('0원')) {
      return '자세한 사항은 사이트 참고 바랍니다';
    }
    return amount;
  };

  // 2. 하단 버튼 핸들러 (수정 및 저장 API 호출)
  const handleSave = async () => {
    // 💡 '현황 수정하기' 클릭 시 상단 탭 밑줄도 '심사 중'으로 자동 복귀 (단, '전체' 탭 진입시는 제외)
    if (initialStatus === 'SELECTED' || initialStatus === 'NOT_SELECTED') {
      setInitialStatus('UNDER_REVIEW');
      setReviewStatus('UNDER_REVIEW');
      if (activeTab !== 'ALL') {
        setActiveTab('UNDER_REVIEW');
      }
      return;
    }

    try {
      const response = await api.post(`/api/benefits/${benefitId}/apply`, {
        applyStatus: reviewStatus,
      });

      if (response.data.isSuccess) {
        const displayStatus =
          reviewStatus === 'SELECTED'
            ? '선정'
            : reviewStatus === 'NOT_SELECTED'
              ? '미선정'
              : '심사 중';
        alert(`현황이 저장되었습니다. (최종 상태: ${displayStatus})`);

        setInitialStatus(reviewStatus);
        // 💡 저장 완료 후 상단 탭 밑줄 위치 최종 확정 (단, '전체' 탭 진입시는 제외)
        if (activeTab !== 'ALL') {
          setActiveTab(reviewStatus);
        }
      }
    } catch (error) {
      console.error('신청 상태 변경 중 오류 발생:', error);
      alert('상태 변경 처리에 실패했습니다.');
    }
  };

  if (!benefitDetail) return <LoadingText>로딩중...</LoadingText>;

  const isReadOnly =
    initialStatus === 'SELECTED' || initialStatus === 'NOT_SELECTED';

  return (
    <Container>
      <Header
        title="신청 현황 상세"
        variant="white"
        onBack={() => navigate('/applied', { state: { activeTab } })}
      />

      <TabContainer>
        {TABS.map((tab) => (
          <TabButton key={tab.id} $isActive={activeTab === tab.id} disabled>
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      <ContentList>
        <CardBox>
          <CardTitle>{benefitDetail.benefitName}</CardTitle>

          <TagRow>
            <Tag>{benefitDetail.category || '기타'}</Tag>
          </TagRow>

          <AmountText>{formatAmount(benefitDetail.amount)}</AmountText>
          <DeadlineText>
            <span>마감일</span> {benefitDetail.deadline} (
            {getDDay(benefitDetail.deadline)})
          </DeadlineText>

          {benefitDetail.requirements &&
            benefitDetail.requirements.length > 0 && (
              <BulletList>
                {benefitDetail.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </BulletList>
            )}
        </CardBox>

        <ReviewSection>
          <SectionTitle>심사 상태 변경</SectionTitle>
          <SectionSubTitle>심사 결과를 선택하고 저장해주세요</SectionSubTitle>

          <RadioGroup>
            <RadioBox
              $isSelected={reviewStatus === 'SELECTED'}
              onClick={() => handleRadioClick('SELECTED')}
              style={{ cursor: isReadOnly ? 'default' : 'pointer' }}
            >
              <CheckCircle $isSelected={reviewStatus === 'SELECTED'} />
              선정
            </RadioBox>
            <RadioBox
              $isSelected={reviewStatus === 'NOT_SELECTED'}
              onClick={() => handleRadioClick('NOT_SELECTED')}
              style={{ cursor: isReadOnly ? 'default' : 'pointer' }}
            >
              <CheckCircle $isSelected={reviewStatus === 'NOT_SELECTED'} />
              미선정
            </RadioBox>
          </RadioGroup>
        </ReviewSection>

        <NoticeBox>
          <NoticeTitle>⚠️ 안내사항</NoticeTitle>
          <NoticeContent>
            선정/미선정 상태를 변경하면 신청 현황에 기록됩니다.
          </NoticeContent>
        </NoticeBox>
      </ContentList>

      <ButtonWrapper>
        <BasicButton onClick={handleSave}>
          {isReadOnly ? '현황 수정하기' : '현황 저장하기'}
        </BasicButton>
      </ButtonWrapper>
    </Container>
  );
}

// -----------------------------------------------------------
// 스타일 컴포넌트 영역 (기존 구조 100% 보존)
// -----------------------------------------------------------
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
  position: relative;
  pointer-events: none;
  &::after {
    content: '';
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #5c59f0;
  }
`;
const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f8f9fa;
  flex: 1;
  padding-bottom: 110px;
`;
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
  margin: 1vh 0 1.8vh 0;
`;
const Tag = styled.span`
  padding: 4px 10px;
  background-color: #eef0fa;
  color: #5c59f0;
  font-size: 0.75rem;
  font-weight: 600;
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
    color: #495057;
    list-style-type: disc;
    line-height: 1.4;
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
const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1rem;
  color: #8c94a4;
`;
