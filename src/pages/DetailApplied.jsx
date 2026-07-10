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

  // 이전 목록 페이지에서 넘어온 탭 활성화 상태 유지
  const [activeTab, setActiveTab] = useState(location.state?.fromTab || 'ALL');

  // 심사 상태 변경 라디오 및 상세 데이터 조회를 위한 상태 정의
  const [reviewStatus, setReviewStatus] = useState('UNDER_REVIEW');
  const [benefitDetail, setBenefitDetail] = useState(null);

  // 컴포넌트 마운트 시 URL 파라미터의 고유 ID 기반으로 상세 정보 로드
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await api.get(`/api/benefits/${benefitId}`, {
          headers,
        });

        if (response.data.isSuccess) {
          const detail = response.data.result?.benefitDetail || {};
          setBenefitDetail(detail);
        }
      } catch (error) {
        console.error('혜택 상세 조회 중 오류 발생:', error);
      }
    };

    if (benefitId) {
      fetchDetailData();
    }
  }, [benefitId]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate('/applied', { state: { activeTab: tabId } });
  };

  const handleRadioClick = (statusId) => {
    setReviewStatus(statusId);
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

  // 백엔드 명세서 예외 조항 조건 반영
  const formatAmount = (amount) => {
    if (!amount || amount === '0' || amount === 0) {
      return '자세한 사항은 사이트 참고 바랍니다';
    }
    return amount;
  };

  // 하단 현황 저장하기 클릭 시 상태 변경 API 호출 수행
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await api.post(
        `/api/benefits/${benefitId}/apply`,
        { applyStatus: reviewStatus },
        { headers },
      );

      if (response.data.isSuccess) {
        const displayStatus =
          reviewStatus === 'SELECTED'
            ? '선정'
            : reviewStatus === 'NOT_SELECTED'
              ? '미선정'
              : '심사 중';
        alert(`현황이 저장되었습니다. (최종 상태: ${displayStatus})`);

        // 저장이 완료된 후 이전에 보고 있던 상태 탭을 보존하며 목록으로 복귀
        navigate('/applied', { state: { activeTab } });
      }
    } catch (error) {
      console.error('신청 상태 변경 중 오류 발생:', error);
      alert('상태 변경 처리에 실패했습니다.');
    }
  };

  if (!benefitDetail) return null;

  return (
    <Container>
      <Header title="신청 현황 상세" variant="white" />

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

      <ContentList>
        <CardBox>
          <CardTitle>{benefitDetail.benefitName}</CardTitle>

          <TagRow>
            <Tag>{benefitDetail.category}</Tag>
            <Tag>한국장학재단</Tag>
          </TagRow>

          <AmountText>{formatAmount(benefitDetail.amount)}</AmountText>
          <DeadlineText>
            <span>마감일</span> {benefitDetail.deadline?.replace(/-/g, '.')} (
            {getDDay(benefitDetail.deadline)})
          </DeadlineText>

          <BulletList>
            {benefitDetail.notes?.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </BulletList>
        </CardBox>

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

        <NoticeBox>
          <NoticeTitle>⚠️ 안내사항</NoticeTitle>
          <NoticeContent>
            선정/미선정 상태를 변경하면 신청 현황에 기록됩니다.
          </NoticeContent>
        </NoticeBox>
      </ContentList>

      <ButtonWrapper>
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
