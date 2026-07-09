/**
 * Axios API 인스턴스 및 인터셉터 설정
 *
 * 역할:
 * 1. 모든 API 요청에 토큰 자동 첨부
 * 2. 토큰 만료 시 로그인 페이지로 자동 리다이렉트
 * 3. 네트워크 에러 처리
 */

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * 요청 인터셉터: 모든 요청에 토큰 자동 첨부
 * 로컬스토리지에 accessToken이 있으면 Authorization: Bearer {token} 헤더로 자동 추가
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * 응답 인터셉터: 에러 처리
 *
 * 처리 항목:
 * 1. 401 (Unauthorized): 토큰 만료 → 로컬스토리지 초기화 후 로그인 페이지로
 * 2. 네트워크 에러: 사용자 친화적인 메시지로 변환
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401: 토큰 만료 또는 무효
    if (error.response?.status === 401) {
      // 저장된 모든 데이터 초기화
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isCompleted');
      localStorage.removeItem('lastLoggedInId');
      localStorage.removeItem('survey_data');
      // 로그인 페이지로 리다이렉트 (무한 루프 방지)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // 네트워크 에러 또는 타임아웃
    if (!error.response) {
      // 요청 타임아웃 (10초 이상)
      if (error.code === 'ECONNABORTED') {
        error.message = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
      }
      // 네트워크 연결 오류
      else if (error.message === 'Network Error') {
        error.message = '네트워크 연결을 확인해주세요.';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
