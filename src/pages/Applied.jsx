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

  // 현재 가리키고 있는 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(0);

  // 총 페이지 수 임시 정의
  const totalPages = 20;

  // 10단위 묶음 처리를 위한 현재 블록 계산 (0층: 1~10, 1층: 11~20)
  const currentBlock = Math.floor(currentPage / 10);
  const startPage = currentBlock * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  // 동적 숫자 버튼 배열 구성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchAppliedBenefits = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        // 쿼리 스트링 파라미터에 고정된 0 대신 currentPage 상태값을 연동
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

  const handleTabchange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0);
  };

  // 다음 10개 묶음 블록으로 건너뛰기 처리
  const handleNextBlock = () => {
    const nextBlockStart = (currentBlock + 1) * 10;
    if (nextBlockStart < totalPages) {
      setCurrentPage(nextBlockStart);
    }
  };

  // 이전 10개 묶음 블록으로 되돌아가기 처리
  const handlePrevBlock = () => {
    const prevBlockStart = (currentBlock - 1) * 10;
    if (prevBlockStart >= 0) {
      setCurrentPage(prevBlockStart + 9);
    }
  };

  return (
    <Container>
      <Header title="신청 현황" variant="white" />

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
      {benefitsList.length > 0 && (
        <PaginationContainer>
          <BlockArrowBtn
            disabled={currentBlock === 0}
            onClick={handlePrevBlock}
          >
            &lt;
          </BlockArrowBtn>

          {pageNumbers.map((num) => (
            <NumButton
              key={num}
              $isCurrent={currentPage === num}
              onClick={() => setCurrentPage(num)}
            >
              {num + 1}
            </NumButton>
          ))}

          <BlockArrowBtn
            disabled={(currentBlock + 1) * 10 >= totalPages}
            onClick={handleNextBlock}
          >
            &gt;
          </BlockArrowBtn>
        </PaginationContainer>
      )}
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
  border-bottom: 1px solid #aab3e7;
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
    background-color: #423bb3; /* 와이어프레임에 어울리는 포인트 블루 컬러 */
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2vw;
  padding: 15px 0 25px 0;
  background-color: #ffffff;
`;

const BlockArrowBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #5c59f0;
  cursor: pointer;
  padding: 0 6px;

  &:disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const NumButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$isCurrent ? '700' : '400')};
  color: ${(props) => (props.$isCurrent ? '#5c59f0' : '#888888')};
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
