import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ApplyItem from '../components/ApplyItem';

const dummyData = {
  isSuccess: true,
  code: 'COMMON_200',
  message: '요청에 성공했습니다.',
  result: {
    baseInfo: {
      name: '김도현',
      schoolName: '인천대학교',
      department: '정보통신공학과',
      grade: 3,
      residence: '서울특별시',
      birthDate: '2004.08.20',
    },
    detailInfo: {
      gpa: 4.1,
      incomeBracket: 3,
      isBasicLiving: false,
      isSecondLowest: false,
      interests: ['국가장학금', '지역 장학금'],
    },
  },
};

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setUserInfo(dummyData.result);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (!userInfo) return null;

  const { baseInfo, detailInfo } = userInfo;

  const getSocialSupportStatus = () => {
    if (!detailInfo.isBasicLiving && !detailInfo.isSecondLowest) {
      return '해당없음';
    }

    const basic = detailInfo.isBasicLiving ? '해당' : '해당없음';
    const second = detailInfo.isSecondLowest ? '해당' : '해당없음';

    return `${basic}/${second}`;
  };

  return (
    <Container>
      <Header title="내 정보" variant="purple" />

      <Body>
        {/* 이름 섹션 */}
        <NameSection>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              width: '1.5rem',
              height: '1.5rem',
              marginRight: '0.5rem',
              color: '#333',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <h2>{baseInfo.name}님</h2>
        </NameSection>

        {/* 기본 정보 섹션 */}
        <Section>
          <SectionHeader>
            <h3>기본 정보</h3>
            <button onClick={() => navigate('/edit-basic')}>수정</button>
          </SectionHeader>
          <InfoRow>
            <span>이름</span>
            <span>{baseInfo.name}</span>
          </InfoRow>
          <InfoRow>
            <span>생년월일</span>
            <span>{baseInfo.birthDate}</span>
          </InfoRow>
          <InfoRow>
            <span>학교</span>
            <span>{baseInfo.schoolName}</span>
          </InfoRow>
          <InfoRow>
            <span>학과</span>
            <span>{baseInfo.department}</span>
          </InfoRow>
          <InfoRow>
            <span>학년</span>
            <span>{baseInfo.grade}학년</span>
          </InfoRow>
          <InfoRow>
            <span>거주지역</span>
            <span>{baseInfo.residence}</span>
          </InfoRow>
        </Section>

        {/* 기타 정보 섹션 */}
        <Section>
          <SectionHeader>
            <h3>기타 정보</h3>
            <button onClick={() => navigate('/edit-other')}>수정</button>
          </SectionHeader>
          <InfoRow>
            <span>학점</span>
            <span>{detailInfo.gpa}/4.5</span>
          </InfoRow>
          <InfoRow>
            <span>소득 분위</span>
            <span>{detailInfo.incomeBracket}분위</span>
          </InfoRow>
          <InfoRow>
            <span>기초/차상위</span>
            <span>{getSocialSupportStatus()}</span>
          </InfoRow>
          <InfoRow>
            <span>관심 분야</span>
            <span>{detailInfo.interests?.join(', ')}</span>
          </InfoRow>
        </Section>
      </Body>
    </Container>
  );
};

export default MyInfo;

// --- 스타일 컴포넌트 (rem & vh 단위 적용) ---
const Container = styled.div`
  max-width: 420px; /* 대화면 양옆 여백 고정을 위한 모바일 Max-Width 규격 */
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
  font-family: sans-serif;
`;

const Body = styled.div`
  padding: 3vh 30px; /* 세로 여백은 기기 높이에 반응하도록 vh 배정 */
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4vh; /* 높이에 맞춘 마진 배치 */

  h2 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: bold;
    color: #000;
  }
`;

const Section = styled.section`
  margin-bottom: 4.5vh;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.063rem solid #828282;
  padding-bottom: 2vh;
  margin-bottom: 2vh;

  h3 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: bold;
    color: #000;
  }

  button {
    background: #fff;
    border: 0.063rem solid #d1d1d1;
    border-radius: 4px;
    padding: 0.5vh 1.1rem;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8vh; /* 줄 간격 유연성 보장 */
  font-size: 1rem; /* 14px 변환 */

  span:first-child {
    color: #5f5f5f;
  }
  span:last-child {
    color: #000;
    font-weight: 500;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1rem;
`;
