/**
 * useLocalStorage 훅
 *
 * 역할:
 * - 상태와 로컬스토리지를 동기화
 * - 상태 업데이트 시 자동으로 로컬스토리지 저장
 * - 새로고침 후에도 데이터 유지
 */

import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 로컬스토리지에서 값 가져오기
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /** 값을 업데이트하고 로컬스토리지에 저장 */
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // 로컬스토리지에 JSON 형식으로 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
