import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ApplyItem from '../components/ApplyItem';
import Profile from '../assets/images/profile.png';
import api from '../api/axios';

const MyPage = () => {
  const navigate = useNavigate();

  const [baseInfo, setBaseInfo] = useState({
    name: '',
    schoolName: '',
    department: '',
    grade: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [appliedBenefits, setAppliedBenefits] = useState([]);

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };
        const [userRes, amountRes, benefitsRes] = await Promise.all([
          api.get('/api/users/info', { headers }),
          api.get('/api/benefits/total-amount', { headers }),
          api.get('/api/benefits/applied?page=0&applyStatus=ALL', { headers }),
        ]);

        if (userRes.data.isSuccess) {
          setBaseInfo(userRes.data.result?.baseInfo || {});
        }
        if (amountRes.data.isSuccess) {
          setTotalAmount(amountRes.data.result?.totalAmount || 0);
        }
        if (benefitsRes.data.isSuccess) {
          const rawBenefits = benefitsRes.data.result?.appliedBenefits || [];

          const reviewBenefits = rawBenefits.filter(
            (item) => item.applyStatus === 'UNDER_REVIEW',
          );

          const sorted = reviewBenefits
            .sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate))
            .slice(0, 4);

          setAppliedBenefits(sorted);
        }
      } catch (error) {
        console.error('마이페이지 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMyPageData();
  }, []);

  const handleCustomBack = () => {
    navigate('/home');
  };

  return (
    <PageContainer>
      <Header title="MY" onBack={handleCustomBack} variant="purple" />

      <ContentWrapper>
        <ProfileCard>
          <CardTop>
            <Avatar src={Profile} />
            <UserInfo>
              <UserNameRow>
                <UserName>{baseInfo.name}님</UserName>
                <EditButton onClick={() => navigate('/my-info')}>
                  내 정보
                </EditButton>
              </UserNameRow>
              <UserDetail>
                {baseInfo.schoolName} {baseInfo.department} {baseInfo.grade}
                학년
              </UserDetail>
            </UserInfo>
          </CardTop>

          <CardBottom>
            <AmountLabel>예상 혜택 금액</AmountLabel>
            <AmountValueRow>
              <AmountValue>{totalAmount.toLocaleString()}</AmountValue>
              <ArrowIcon
                viewBox="0 0 24 24"
                onClick={() => navigate('/expected-benefit')}
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </ArrowIcon>
            </AmountValueRow>
          </CardBottom>
        </ProfileCard>

        <StatusSection>
          <SectionHeader>
            <SectionTitle>신청 현황</SectionTitle>
            <MoreButton onClick={() => navigate('/applied')}>
              더보기
              <SmallArrow viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </SmallArrow>
            </MoreButton>
          </SectionHeader>

          <ItemList>
            {appliedBenefits.map((item) => (
              <div
                key={item.benefitId}
                onClick={() =>
                  navigate(`/detail-applied/${item.benefitId}`, {
                    state: { fromTab: 'UNDER_REVIEW' },
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
            ))}
          </ItemList>
        </StatusSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100vw;
  max-width: 430px;
  height: 100dvh;

  background-color: #f8f9fa;
  box-sizing: border-box;
  overflow: hidden;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-left: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
`;

const ContentWrapper = styled.div`
  padding: 2.5vh 20px 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 3vh;

  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ProfileCard = styled.div`
  background-color: #584fea;
  border-radius: 10px;
  padding: 20px;
  color: #ffffff;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1vh;
  position: relative;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5vh;
`;

const UserNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 1.35rem;
  letter-spacing: -1px;
  font-weight: 600;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

const UserDetail = styled.span`
  font-size: 0.95rem;
  letter-spacing: -1px;
  color: rgba(255, 255, 255, 0.9);
`;

const CardBottom = styled.div`
  padding-top: 1vh;
  display: flex;
  flex-direction: column;
`;

const AmountLabel = styled.span`
  font-size: 1rem;
  letter-spacing: -1px;
  color: rgba(255, 255, 255, 0.8);
`;

const AmountValueRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountValue = styled.span`
  font-size: 2rem;
  letter-spacing: -1px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const ArrowIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  fill: #ffffff;
`;

/* 신청 현황 섹션 스타일 */
const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  letter-spacing: -1px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666666;
  font-size: 0.9rem;
  letter-spacing: -1px;
  cursor: pointer;
  gap: 0.2vw;
  padding: 0;
`;

const SmallArrow = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: #666666;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;

  flex-shrink: 0;
  padding-bottom: 20px;
`;
