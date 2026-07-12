import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import BasicButton from '../components/BasicButton';
import * as S from './BenefitDetail.styles';
import api from '../api/axios'; // 1. 작성하신 커스텀 axios 인스턴스 임포트

export default function BenefitDetail() {
  const navigate = useNavigate();
  const { benefitId } = useParams();

  const [benefit, setBenefit] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showProbability, setShowProbability] = useState(false);

  // 2. 상세 조회 API 호출 (axios 적용)
  useEffect(() => {
    api
      .get(`/api/benefits/${benefitId}`) // baseURL이 설정되어 있으므로 상대 경로만 작성
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
        // axios 인터셉터에서 가공한 에러 메시지가 있을 경우 alert로 노출 가능
        if (error.message) alert(error.message);
      });
  }, [benefitId]);

  // 3. 신청 하기 API 호출 (axios 적용)
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
        // 인터셉터에서 걸러진 네트워크 에러 메시지나 기본 메시지 출력
        alert(error.message || '신청 처리 중 오류가 발생했습니다.');
      });
  };

  // 체크박스 하나 클릭했을 때
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
        {/* 박스 1: 장학금 이름 + 금액 + 마감일 + 조건 */}
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
