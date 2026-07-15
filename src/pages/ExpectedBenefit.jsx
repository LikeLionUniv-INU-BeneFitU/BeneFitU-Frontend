import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './ExpectedBenefit.styles';

export default function ExpectedBenefit() {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [benefitList, setBenefitList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const currentBlock = Math.floor(currentPage / 10);
  const startPage = currentBlock * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i >= 0) pageNumbers.push(i);
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('https://benefitu-api.duckdns.org/api/benefits/total-amount', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('실패');
        return res.json();
      })
      .then((data) => {
        setTotalAmount(data.result.totalAmount || 0);
      })
      .catch((error) => {
        console.error('총 금액 조회 실패', error);
      });

    fetch(
      `https://benefitu-api.duckdns.org/api/benefits?category=ALL&page=${currentPage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error('실패');
        return res.json();
      })
      .then((data) => {
        setBenefitList(data.result?.benefits || []);
        setTotalPages(data.result?.totPages || 0);
      })
      .catch((error) => {
        console.error('혜택 목록 조회 실패', error);
        setBenefitList([]);
        setTotalPages(0);
      });
  }, [currentPage]);

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

  return (
    <S.PageWrapper>
      <Header title="예상 혜택 금액" onBack={() => navigate(-1)} />
      <S.TotalAmountText>총 {totalAmount.toLocaleString()}</S.TotalAmountText>

      <S.ScrollArea>
        {benefitList &&
          benefitList.map((benefit) => (
            <BenefitDetailBox
              key={benefit.benefitId}
              buttonText="상세 보기"
              to={`/detail/${benefit.benefitId}`}
              category={benefit.categories?.[0] || ''}
              tags={benefit.categories || []}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  letterSpacing: '-1px',
                }}
              >
                {benefit.benefitName}
              </p>
              <p
                style={{
                  color: '#2578B0',
                  fontSize: '18px',
                  letterSpacing: '-1px',
                  fontWeight: '600',
                }}
              >
                {benefit.amount}
              </p>
            </BenefitDetailBox>
          ))}
      </S.ScrollArea>

      {totalPages > 1 && benefitList.length > 0 && (
        <S.PaginationContainer>
          <S.BlockArrowBtn
            disabled={currentBlock === 0}
            onClick={handlePrevBlock}
          >
            &lt;
          </S.BlockArrowBtn>

          {pageNumbers.map((num) => (
            <S.NumButton
              key={num}
              $isCurrent={currentPage === num}
              onClick={() => setCurrentPage(num)}
            >
              {num + 1}
            </S.NumButton>
          ))}

          <S.BlockArrowBtn
            disabled={(currentBlock + 1) * 10 >= totalPages}
            onClick={handleNextBlock}
          >
            &gt;
          </S.BlockArrowBtn>
        </S.PaginationContainer>
      )}
    </S.PageWrapper>
  );
}
