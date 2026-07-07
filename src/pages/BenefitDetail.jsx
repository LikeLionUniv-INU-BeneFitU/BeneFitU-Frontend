import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import * as S from './BenefitDetail.styles';

export default function BenefitDetail() {
  const navigate = useNavigate();
  const { benefitId } = useParams(); // URL의 /detail/42 에서 "42"를 꺼내옴

  const [benefit, setBenefit] = useState(null);

  useEffect(() => {
    /* 예시데이터 */
    const dummyDetail = {
      title: "한국장학재단 국가장학금 1유형",
      tags: ["국가장학금", "한국장학재단"],
      amount: "최대 250만원",
      deadline: "2026-08-20",
      requirements: [
        "학자금 지원 9구간 이내",
        "성적 및 이수학점 기준 충족",
        "한국장학재단 신청 및 가구원 동의 완료",
        "소득구간에 따라 등록금 차등 지원",
      ],
      reason: "도현님은 소득분위 3분위 이하 (으)로 해당 장학금의 지원 자격이 있습니다.",
      probability: 70,
      siteUrl: "https://www.kosaf.go.kr",
    };

    const token = localStorage.getItem('accessToken');

    fetch(`http://43.201.77.120:8080/api/benefits/${benefitId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('실패');
        return res.json();
      })
      .then((data) => {
        setBenefit(data.result);
      })
      .catch(() => {
        setBenefit(dummyDetail);
      });
  }, [benefitId]); // benefitId가 바뀔 때마다 (다른 상세페이지로 이동 시) 다시 요청

  const handleApply = () => {
    const token = localStorage.getItem('accessToken');
    fetch(`http://43.201.77.120:8080/api/benefits/${benefitId}/apply`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('신청이 완료되었습니다!');
      })
      .catch((error) => {
        console.error('신청 실패:', error);
      });
  };

  // 데이터가 아직 도착 안 했으면 잠깐 로딩 화면
  if (!benefit) {
    return <div>로딩중...</div>;
  }

  // 마감일까지 남은 일수(D-day) 계산
  const today = new Date();
  const deadlineDate = new Date(benefit.deadline);
  const diffTime = deadlineDate - today;
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));



  return (
    <S.PageWrapper>
      <Header title="혜택 상세" onBack={() => navigate(-1)} />

      <S.ContentWrapper>
        <S.Title>{benefit.title}</S.Title>
        <S.TagRow>
          {benefit.tags.map((tag, index) => (
            <S.Tag key={index}>{tag}</S.Tag>
          ))}
        </S.TagRow>

        <S.Amount>{benefit.amount}</S.Amount>
        <S.Deadline>마감일 {benefit.deadline} (D-{dDay})</S.Deadline>

        <S.RequirementBox>
          {benefit.requirements.map((req, index) => (
            <S.RequirementItem key={index}>☑ {req}</S.RequirementItem>
          ))}
        </S.RequirementBox>

        <S.ReasonTitle>이 장학금을 추천하는 이유</S.ReasonTitle>
        <S.ReasonText>{benefit.reason}</S.ReasonText>

        <S.ProbabilityLabel>지원 가능성</S.ProbabilityLabel>
        <S.ProbabilityBarBg>
          <S.ProbabilityBarFill $percent={benefit.probability} />
        </S.ProbabilityBarBg>
        <S.ProbabilityPercent>{benefit.probability}%</S.ProbabilityPercent>

        <S.ButtonRow>
          <BasicButton variant="white" onClick={() => window.open(benefit.siteUrl, '_blank')}>
            사이트로 이동
          </BasicButton>
          <BasicButton onClick={handleApply}>신청 완료</BasicButton>
        </S.ButtonRow>
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}