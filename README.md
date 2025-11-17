## 📁 폴더 구조

```
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/        # 이미지 등 정적 리소스
│  ├─ common/        # 공용 컴포넌트
│  ├─ hooks/         # React Query 기반 API 요청 훅 (useQuery)
│  ├─ layouts/       # 페이지 전체 구조(레이아웃) 컴포넌트
│  ├─ pages/         # 라우트 페이지 컴포넌트
│  ├─ stores/        # Zustand 상태 관리 스토어
│  ├─ utils/         # 유틸 함수, axios 인스턴스 등 공통 로직
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
├─ vite.config.js
```

<br>

## 📦 설치한 라이브러리

### **Routing**

- react-router-dom

### **Server State Management (React Query)**

- @tanstack/react-query

### **Client State Management (Zustand)**

- zustand

<br>

## ✅ 브랜치 전략

### 기본 브랜치

- `main` → 배포/완성본
- `develop` → 개발 통합 브랜치

### 기능 개발 브랜치

- 기능 단위로 브랜치 생성:

  예시) feat/login-page, feat/user-api

<br>

## 📝 커밋 규칙 (Commit Convention)

    <타입>: <변경 내용 요약>

### 사용 타입

- **feat:** 새로운 기능 추가
- **fix:** 버그 수정
- **docs:** 문서 수정
- **style:** CSS/레이아웃/스타일 변경(로직 없음)
- **refactor:** 리팩토링(기능 변화 없음)
- **chore:** 패키지, 설정 등 기타 변경
- **test:** 테스트 코드 추가/수정

  <br>

## ✅ CSS 스타일 가이드 (CSS Modules)

- **CSS Modules** 사용

### 사용 예시

#### 1) 파일명 규칙

```
ComponentName.module.css
```

#### 2) import 방식

```jsx
import styles from "./HomeCard.module.css";

export default function HomeCard() {
  return <div className={styles.container}>Hello</div>;
}
```

<br><br>
저희 화이팅해요~!!🙌🙌
