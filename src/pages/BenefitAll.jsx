import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BenefitDetailBox from '../components/BenefitDetailBox';
import * as S from './BenefitAll.styles';
import CategoryButtonBar from '../components/CategoryButtonBar';
import UserInfoCard from '../components/UserInfoCard';
import Footer from '../components/Footer';


function BenefitAll() {

// 카테고리 기억 상자
  const [currentCategory, setCurrentCategory] = useState('전체');
  
  // 장학금 리스트 정보 저장용 상자
  const [benefitList, setBenefitList] = useState([]);

  // 사용자 정보 저장용 상자
  const [userInfo, setUserInfo] = useState({
    name: '',
    grade: '',
    incomeLevel: '',
  });



  // 백엔드에 데이터를 요청하는 함수
  // 장학금 상세설명 박스 연동
  useEffect(() => {
    // 예시 데이터
    const dummyData = [
      { id: 1, title: "교내 성적우수 장학금", price: "최대 100만원" },
      { id: 2, title: "인천대학교 근로장학금", price: "최대 120만원" },
      { id: 3, title: "삼성꿈장학재단 장학금", price: "200만원" },
      { id: 4, title: "한국장학재단 국가장학금 1유형", price: "최대 120만원" },
      { id: 5, title: "A장학금", price: "20만원" },
      { id: 6, title: "B장학금", price: "최대 15만원" },
    ];

    const backendUrl = 'API_주소URL'; // 실제 장학금 리스트 API 주소로 교체하기

    fetch(backendUrl) 
      .then((res) => {
        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setBenefitList(data);
      })
      .catch((error) => {
        console.error("백엔드 연동 전 예비 데이터");
        setBenefitList(dummyData); // 연동 전 예비 데이터
      });
  }, [currentCategory])


  // 사용자 정보 박스 연동
  useEffect(() => {
    // 예시 데이터
    const dummyUser = {
      name: "홍길동",
      grade: "3학년",
      incomeLevel: "3구간",
    };

    const userUrl = 'API_주소URL'; // 실제 사용자 정보 API 주소로 교체하기

    fetch(userUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("백엔드 연동 전 예비 사용자 데이터");
        setUserInfo(dummyUser);
      });
  }, []);


  return (
    <S.PageWrapper>
      <Header title="맞춤 추천 혜택" />
      <UserInfoCard 
      name={userInfo.name} 
      grade={userInfo.grade} 
      incomeLevel={userInfo.incomeLevel}
      />
      <CategoryButtonBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <S.ScrollArea>
        <S.SubTitle>추천 혜택 <span>{benefitList.length}</span></S.SubTitle>
        {benefitList.map((benefit) => {
          return (
            <BenefitDetailBox key={benefit.id} buttonText="상세 보기" to={`/detail/${benefit.id}`} /* 클릭 시 상세페이지 이동용 주소 */>
              <h2>{benefit.title}</h2>
              <p>{benefit.price}</p>
            </BenefitDetailBox>
          );
        })}
      </S.ScrollArea>
      <Footer />
    </S.PageWrapper>
  );
}

export default BenefitAll;