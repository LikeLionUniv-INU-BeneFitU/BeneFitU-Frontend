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

  // 백엔드에서 받아온 순수 전체 데이터 저장
  const [rawBenefitsList, setRawBenefitsList] = useState([]);
  // 현재 탭에 맞춰 필터링된 데이터 저장
  const [displayedList, setDisplayedList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const currentBlock = Math.floor(currentPage / 10);
  const startPage = currentBlock * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i >= 0) pageNumbers.push(i);
  }

  // 1. 컴포넌트 마운트 시 최초 1회 전체 데이터를 받아옴
  useEffect(() => {
    const fetchAppliedBenefits = async () => {
      try {
        // 쿼리 스트링 의존성을 없애고 혜택 내역 전체를 요청
        const response = await api.get('/api/benefits/applied');

        if (response.data && response.data.isSuccess) {
          const rawBenefits = response.data.result?.appliedBenefits || [];

          // 날짜 기준 내림차순 기본 정렬
          const sorted = [...rawBenefits].sort((a, b) => {
            if (!a.appliedDate || !b.appliedDate) return 0;
            const dateA = new Date(a.appliedDate.replace(/\./g, '-'));
            const dateB = new Date(b.appliedDate.replace(/\./g, '-'));
            return dateB - dateA;
          });

          setRawBenefitsList(sorted);
        } else {
          setRawBenefitsList([]);
        }
      } catch (error) {
        console.error('신청 내역 조회 중 오류 발생:', error);
        setRawBenefitsList([]);
      }
    };

    fetchAppliedBenefits();
  }, []);

  // 2. 전체 데이터(rawBenefitsList)나 선택된 탭(activeTab), 페이지가 바뀔 때 프론트에서 분류 처리
  useEffect(() => {
    // 탭이 'ALL'이면 전체 유지, 아니면 applyStatus가 탭 ID와 일치하는 것만 필터링
    const filtered =
      activeTab === 'ALL'
        ? rawBenefitsList
        : rawBenefitsList.filter((item) => item.applyStatus === activeTab);

    // 필터링된 결과를 기준으로 전체 페이지 수 계산 (페이지당 10개 기준)
    const calculatedPages =
      filtered.length > 0 ? Math.ceil(filtered.length / 10) : 0;
    setTotalPages(calculatedPages);

    // 현재 페이지(0부터 시작)에 해당하는 10개의 데이터만 잘라서 렌더링용 상태에 저장
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    setDisplayedList(filtered.slice(startIndex, endIndex));
  }, [rawBenefitsList, activeTab, currentPage]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0); // 탭이 바뀔 때는 반드시 첫 페이지(0)로 리셋
  };

  const handleNextBlock = () => {
    const nextBlockStart = (currentBlock + 1) * 10;
    if (nextBlockStart < totalPages) {
      setCurrentPage(nextBlockStart);
    }
  };

  const handlePrevBlock = () => {
    const prevBlockStart = (currentBlock - 1) * 10;
    if (prevBlockStart >= 0) {
      setCurrentPage(prevBlockStart + 9);
    }
  };

  const handleCustomBack = () => {
    navigate('/my-page');
  };

  return (
    <Container>
      <Header title="신청 현황" onBack={handleCustomBack} variant="white" />

      <TabContainer>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      <ContentList>
        {displayedList.length > 0 ? (
          displayedList.map((item) => (
            <div
              key={item.benefitId}
              onClick={() =>
                navigate(`/detail-applied/${item.benefitId}`, {
                  state: { fromTab: activeTab, applyStatus: item.applyStatus },
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

      {/* 2페이지 이상(totalPages > 1)이고 데이터가 있을 때만 노출 */}
      {totalPages > 1 && displayedList.length > 0 && (
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
  &::after {
    content: '';
    display: ${(props) => (props.$isActive ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #423bb3;
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
