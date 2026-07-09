import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './ExpectedBenefit.styles';

export default function ExpectedBenefit() {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [benefitList, setBenefitList] = useState([]);

  useEffect(() => {
    const dummyData = [
      { id: 1, title: "교내 성적우수 장학금", price: "최대 100만원", tags: ["교내장학금", "성적우수"] },
      { id: 2, title: "인천대학교 근로장학금", price: "최대 120만원", tags: ["교내근로", "시간제"] },
      { id: 3, title: "바른 생활 장학금", price: "20만원", tags: ["청년지원금", "소득분위"] },
    ];
    const dummyTotal = 1460000;

    const token = localStorage.getItem('accessToken');

    fetch('http://43.201.77.120:8080/api/benefits/total-amount', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('실패');
        return res.json();
      })
      .then((data) => {
        console.log('예상 혜택 응답:', data.result);
        setTotalAmount(data.result.totalAmount);
        setBenefitList([]);
      })
      .catch(() => {
        setTotalAmount(dummyTotal);
        setBenefitList(dummyData);
      });
  }, []);

  return (
    <S.PageWrapper>
      <Header title="예상 혜택 금액" onBack={() => navigate(-1)} />
      <S.TotalAmountText>
        총 <S.Highlight>{totalAmount.toLocaleString()}원</S.Highlight>
      </S.TotalAmountText>
      
      <S.ScrollArea>
      {benefitList && benefitList.map((benefit) => (
        <BenefitDetailBox
          key={benefit.id}
          buttonText="상세 보기"
          to={`/detail/${benefit.id}`}
          tags={benefit.tags}
        >
          <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{benefit.title}</p>
          <p style={{ color: '#2578B0', fontWeight: 'bold', fontSize: '20px' }}>{benefit.price}</p>
        </BenefitDetailBox>
      ))}
      </S.ScrollArea>
    </S.PageWrapper>
  );
}