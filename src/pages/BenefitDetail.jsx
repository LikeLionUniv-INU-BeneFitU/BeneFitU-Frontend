import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import * as S from './BenefitDetail.styles';


// A타입 : 체크박스X
// B타입 : 체크박스O

export default function BenefitDetail() {
  const navigate = useNavigate();
  const { benefitId } = useParams();

  const [benefit, setBenefit] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]); // 체크된 조건들 기억
  const [showProbability, setShowProbability] = useState(false); // 지원가능성 보여줄지 여부

  useEffect(() => {
    // 타입 A 예시 더미 데이터
    const dummyTypeA = {
      title: "한국장학재단 국가장학금 1유형",
      tags: ["국가장학금", "한국장학재단"],
      amount: "최대 250만원",
      deadline: "2026-08-20",
      requirementType: "AUTO", // 자동 판단형
      requirements: [
        "학자금 지원 9구간 이하",
        "성적 및 이수학점 기준 충족",
        "한국 장학재단 신청 및 가구원 동의 완료",
        "소득구간에 따라 등록금 차등 지원",
      ],
      reason: "도현님은 소득분위 3분위 이하 (으)로 해당 장학금의 지원 자격이 됩니다.",
      probability: 70,
      siteUrl: "https://www.kosaf.go.kr",
    };

    // 타입 B 예시 더미 데이터
    const dummyTypeB = {
      title: "건설근로자 자녀 장학금",
      tags: ["학습장려금", "함성장학금"],
      amount: "50만원",
      deadline: "2026-08-20",
      requirementType: "CHECK", // 체크형
      requirements: [
        "건설근로자공제회 기준 총 적립일수 600일 이상이면서 2025년도 근로내역이 100일 이상 적립된 공제회원의 자녀",
        "국내 4년제 이상 대학교의 신입생 또는 2026년 기준 2~3년 재학생",
        "재학 · 적정 학기 12학점 이상 이수, 평점 3.2/4.5, 3.0/4.3 이상인 자",
      ],
      reason: "도현님은 직전 학기 평점이 3.2 이상 (으)로 해당 장학금의 지원 자격이 있습니다.",
      probability: 80,
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
        const detail = data.result.benefitDetail;
        const matched = data.result.matchedConditions;

        const mapped = {
          title: detail.benefitName,
          tags: detail.categories,
          amount: `${detail.amount.toLocaleString()}원`,
          deadline: detail.deadline,
          siteUrl: detail.benefitUrl,
          probability: data.result.passProbability,
          requirementType: 'AUTO',
          requirements: Object.values(matched),
          reason: `회원님은 ${Object.values(matched).join(', ')} 조건에 해당하여 지원 자격이 됩니다.`,
        };

        setBenefit(mapped);
      })
      .catch(() => {
        setBenefit(dummyTypeB);
      });
  }, [benefitId]);

  const handleApply = () => {
    const token = localStorage.getItem('accessToken');
    fetch(`http://43.201.77.120:8080/api/benefits/${benefitId}/apply`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => alert('신청이 완료되었습니다!'))
      .catch((error) => console.error('신청 실패:', error));
  };

  // 체크박스 하나 클릭했을 때
  const handleCheck = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // 이미 체크됐으면 해제
        : [...prev, index] // 안 됐으면 추가
    );
  };

  if (!benefit) {
    return <div>로딩중...</div>;
  }

  const today = new Date();
  const deadlineDate = new Date(benefit.deadline);
  const diffTime = deadlineDate - today;
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isCheckType = benefit.requirementType === 'CHECK';
  // 체크형일 때: 모든 조건에 체크했는지 확인
  const allChecked = isCheckType && checkedItems.length === (benefit.requirements?.length || 0);

  return (
    <S.PageWrapper>
      <Header title="혜택 상세" onBack={() => navigate(-1)} />

      <S.ContentWrapper>
        {/* 박스 1: 장학금 이름 + 금액 + 마감일 + 조건 */}
        <S.InfoBox>
          <S.Title>{benefit.title}</S.Title>
          <S.TagRow>
            {benefit.tags && benefit.tags.map((tag, index) => (
              <S.Tag key={index}>{tag}</S.Tag>
            ))}
          </S.TagRow>

          <S.Amount>{benefit.amount}</S.Amount>
          <S.Rowbox><S.Deadline>마감일</S.Deadline> <S.Deadlinenum> {benefit.deadline} (D-{dDay})</S.Deadlinenum> </S.Rowbox>

          <S.RequirementList>
            {benefit.requirements && benefit.requirements.map((req, index) => (
              <S.RequirementItem key={index}>
                {isCheckType ? (
                  // 타입 B: 체크박스 있음
                  <S.CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(index)}
                      onChange={() => handleCheck(index)}
                    />
                    {req}
                  </S.CheckboxLabel>
                ) : (
                  // 타입 A: 그냥 불릿(•)만 표시
                  <span>• {req}</span>
                )}
              </S.RequirementItem>
            ))}
          </S.RequirementList>
        </S.InfoBox>

        {/* 박스 2: 추천 이유 */}
        <S.ReasonBox>
          <S.ReasonTitle>이 장학금을 추천하는 이유</S.ReasonTitle>
          <S.ReasonText>{benefit.reason}</S.ReasonText>
        </S.ReasonBox>

        {/* 박스 3: 지원 가능성 */}
        <S.ProbabilityBox
          $clickable={isCheckType && !showProbability}
          onClick={() => {
            if (isCheckType && !showProbability) {
              if (!allChecked) {
                alert('모든 조건을 체크해주세요.');
                return;
              }
              setShowProbability(true);
            }
          }}
        >
          {!isCheckType || showProbability ? (
            // 타입 A는 항상 보임 / 타입 B는 클릭 후에만 보임
            <>
              <S.ProbabilityLabel>지원 가능성</S.ProbabilityLabel>
              <S.ProbabilityBarBg>
                <S.ProbabilityBarFill $percent={benefit.probability} />
              </S.ProbabilityBarBg>
              <S.ProbabilityPercent>{benefit.probability}%</S.ProbabilityPercent>
            </>
          ) : (
            // 타입 B에서 아직 클릭 전 상태
            <S.ProbabilityPlaceholder>지원 가능성 분석</S.ProbabilityPlaceholder>
          )}
        </S.ProbabilityBox>

        <S.ButtonRow>
          <BasicButton variant="white" onClick={() => window.open(benefit.siteUrl, '_blank')}>
            사이트로이동
          </BasicButton>
          <BasicButton onClick={handleApply}>신청 완료</BasicButton>
        </S.ButtonRow>
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}