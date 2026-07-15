import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import * as S from './BenefitDetail.styles';
import api from '../api/axios';

export default function BenefitDetail() {
  const navigate = useNavigate();
  const { benefitId } = useParams();

  const [benefit, setBenefit] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showProbability, setShowProbability] = useState(false);

  useEffect(() => {
    api
      .get(`/api/benefits/${benefitId}`)
      .then((res) => {
        const data = res.data;
        console.log('상세 응답 전체:', data);

        const detail = data.result.benefitDetails;
        const matched = data.result.matchedConditions;

        const mapped = {
          title: detail.benefitName,
          tags: [detail.category],
          amount: `${detail.amount?.toLocaleString?.() || detail.amount}`,
          deadline: detail.deadLine,
          siteUrl: detail.benefitUrl,
          probability: parseInt(data.result.passProbability, 10) || 0,
          requirementType: 'AUTO',
          requirements: matched ? Object.values(matched) : [],
          reason: matched
            ? `회원님은 ${Object.values(matched).join(', ')}와 같은 조건에 해당하여 지원 자격이 됩니다.`
            : '',
        };

        setBenefit(mapped);
      })
      .catch((error) => {
        console.error('상세 조회 실패:', error);
        if (error.message) alert(error.message);
      });
  }, [benefitId]);

  const handleApply = () => {
    const requestBody = {
      applyStatus: 'UNDER_REVIEW',
    };

    api
      .post(`/api/benefits/${benefitId}/apply`, requestBody)
      .then((res) => {
        const data = res.data;
        if (data.isSuccess) {
          navigate('/apply-complete');
        } else {
          alert(data.message || '신청에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('신청 실패:', error);
        alert(error.message || '신청 처리 중 오류가 발생했습니다.');
      });
  };

  const handleCheck = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
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
  const allChecked =
    isCheckType && checkedItems.length === (benefit.requirements?.length || 0);

  return (
    <S.PageWrapper>
      <Header title="혜택 상세" onBack={() => navigate(-1)} />

      <S.ContentWrapper>
        <S.InfoBox>
          <S.Title>{benefit.title}</S.Title>

          <S.Amount>{benefit.amount}</S.Amount>
          <S.Rowbox>
            <S.Deadline>마감일</S.Deadline>{' '}
            <S.Deadlinenum>
              {benefit.deadline} (D-{dDay})
            </S.Deadlinenum>{' '}
          </S.Rowbox>

          <S.RequirementList>
            {benefit.requirements &&
              benefit.requirements.map((req, index) => (
                <S.RequirementItem key={index}>
                  {isCheckType ? (
                    <S.CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => handleCheck(index)}
                      />
                      {req}
                    </S.CheckboxLabel>
                  ) : (
                    <span>• {req}</span>
                  )}
                </S.RequirementItem>
              ))}
          </S.RequirementList>
        </S.InfoBox>

        <S.ReasonBox>
          <S.ReasonTitle>이 장학금을 추천하는 이유</S.ReasonTitle>
          <S.ReasonText>{benefit.reason}</S.ReasonText>
        </S.ReasonBox>

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
            <>
              <S.ProbabilityTopRow>
                <S.ProbabilityLabel>지원 가능성</S.ProbabilityLabel>
                <S.ProbabilityPercent>
                  {benefit.probability}%
                </S.ProbabilityPercent>
              </S.ProbabilityTopRow>
              <S.ProbabilityBarBg>
                <S.ProbabilityBarFill $percent={benefit.probability} />
              </S.ProbabilityBarBg>
            </>
          ) : (
            <S.ProbabilityPlaceholder>
              지원 가능성 분석
            </S.ProbabilityPlaceholder>
          )}
        </S.ProbabilityBox>

        <S.ButtonRow>
          <S.DetailButton
            $variant="white"
            onClick={() => window.open(benefit.siteUrl, '_blank')}
          >
            사이트로 이동
          </S.DetailButton>
          <S.DetailButton onClick={handleApply}>신청 완료</S.DetailButton>
        </S.ButtonRow>
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}
