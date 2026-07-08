import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ApplyItem from '../components/ApplyItem';

const TABS = [
  { id: 'ALL', label: '전체' },
  { id: 'UNDER_REVIEW', label: '심사 중' },
  { id: 'SELECTED', label: '선정' },
  { id: 'NOT_SELECTED', label: '미선정' },
];

// 와이어프레임 기준 더미 데이터
const mockData = [
  {
    id: 1,
    title: '청년 마음건강 지원금',
    date: '2026.10.01',
    status: 'UNDER_REVIEW',
  },
  {
    id: 2,
    title: '초록사랑 지원금',
    date: '2026.10.05',
    status: 'UNDER_REVIEW',
  },
  {
    id: 3,
    title: '한국장학재단 국가장학금 1유형',
    date: '2026.09.30',
    status: 'SELECTED',
  },
  {
    id: 4,
    title: '건설근로자 자녀 장학금',
    date: '2026.08.12',
    status: 'NOT_SELECTED',
  },
];

export default function Applied() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'ALL',
  );

  const filteredData = mockData.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.status === activeTab;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    // '2026.10.06' 형식을 '2026-10-06'으로 바꿔서 Date 객체로 비교
    const dateA = new Date(a.date.replace(/\./g, '-'));
    const dateB = new Date(b.date.replace(/\./g, '-'));
    return dateB - dateA; // b - a 구조가 내림차순(최신순)입니다.
  });

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
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ApplyItem
              key={item.id}
              title={item.title}
              date={item.date}
              status={item.status}
            />
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
