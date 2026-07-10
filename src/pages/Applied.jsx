import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ApplyItem from '../components/ApplyItem';
import api from '../api/axios';

const TABS = [
  { id: 'ALL', label: '전체' },
  { id: 'UNDER_REVIEW', label: '심사 중' },
  { id: 'SELECTED', label: '선정' },
  { id: 'NOT_SELECTED', label: '미선정' },
];

export default function Applied() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'ALL',
  );
  const [benefitsList, setBenefitsList] = useState([]);

  // 탭 상태가 변경될 때마다 백엔드 API 호출하여 목록 업데이트
  useEffect(() => {
    const fetchAppliedBenefits = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        // 명세서에 맞춰 선택한 탭 파라미터와 페이지 번호 전달
        const response = await api.get(
          `/api/benefits/applied?page=0&applyStatus=${activeTab}`,
          { headers },
        );

        if (response.data.isSuccess) {
          const rawBenefits = response.data.result?.appliedBenefits || [];

          // 받은 데이터를 신청 처리 날짜 최신순(내림차순)으로 정렬
          const sorted = [...rawBenefits].sort((a, b) => {
            const dateA = new Date(a.appliedDate.replace(/\./g, '-'));
            const dateB = new Date(b.appliedDate.replace(/\./g, '-'));
            return dateB - dateA;
          });

          setBenefitsList(sorted);
        }
      } catch (error) {
        console.error('신청 내역 조회 중 오류 발생:', error);
      }
    };

    fetchAppliedBenefits();
  }, [activeTab]);

  return (
    <Container>
      <Header title="신청 현황" />

      <TabContainer>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      <ContentList>
        {benefitsList.length > 0 ? (
          benefitsList.map((item) => (
            <div
              key={item.benefitId}
              onClick={() =>
                navigate(`/detail-applied/${item.benefitId}`, {
                  state: { fromTab: activeTab },
                })
              }
              style={{ cursor: 'pointer' }}
            >
              <ApplyItem
                title={item.benefitName}
                date={item.appliedDate}
                status={item.applyStatus}
              />
            </div>
          ))
        ) : (
          <EmptyMessage>신청 내역이 없습니다.</EmptyMessage>
        )}
      </ContentList>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px; /* 모바일 와이어프레임 스타일 대응 */
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #aab3e7;
  margin-bottom: 5px;
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

  /* 활성화된 탭 하단의 인디케이터 선 (와이어프레임의 파란색 선 반영) */
  &::after {
    content: '';
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #5c59f0; /* 와이어프레임에 어울리는 포인트 블루 컬러 */
  }
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  background-color: #ffffff;
  flex: 1;
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  color: #767676;
  font-size: 14px;
`;
