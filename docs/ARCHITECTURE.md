# 아키텍처 & 파일별 설명

이 문서는 `main.tsx`부터 시작해서, 실제 앱이 렌더링되는 순서를 따라가며 각 파일의 역할을 설명합니다. 전체 구조는 [Feature-Sliced Design(FSD)](https://feature-sliced.design/)를 따르며, 레이어는 아래로 갈수록 더 구체적입니다.

```
app → pages → widgets → entities → shared
```

각 레이어는 자기보다 **아래 레이어만** import할 수 있습니다.

---

## 진입점

### `main.tsx`
- `createRoot`로 React 18의 새 렌더링 API 사용
- `QueryClientProvider`(TanStack Query)와 `BrowserRouter`(react-router-dom)로 앱 전체를 감싸, 하위 모든 컴포넌트에서 `useQuery` / `useNavigate` / `<Link>` 등을 쓸 수 있게 함
- `App.tsx` 호출

### `App.tsx`
- 라우팅 구조 정의: `Header` → `Routes`(Home / Projects / Algorithm / Problems) → `Footer`
- Header, Footer는 `Routes` 바깥에 위치해 모든 페이지에 공통으로 노출됨
- `flex` 레이아웃으로 콘텐츠가 짧아도 Footer가 항상 화면 하단에 고정되도록 처리

---

## pages

각 페이지 폴더는 해당 페이지에 필요한 `widgets`를 불러와 조립만 하는 얇은 컴포넌트입니다. 데이터 패칭이나 렌더링 로직은 갖지 않습니다.

- `HomePage` → `about-list` + `skills-list` + `archive-list`
- `ProjectPage` → `project-list`
- `AlgorithmPage` → `algorithm-list`
- `ProblemsPage` → `problems-list`

---

## widgets

### `header`
전역 네비게이션. 모든 페이지에서 공통으로 렌더링됩니다.

### `footer`
페이지 하단 저작권 표기. `Header`와 마찬가지로 전역 공통 컴포넌트입니다.

### `about-list/ui/AboutList.tsx`
- ID 카드(프로필), Intro 카드, Experience 3열 카드를 한 화면에 표시
- 세 영역 모두 React Query로 각각 서버 데이터를 패칭하고, 로딩/에러 상태를 하나로 묶어서 처리

### `skills-list/ui/SkillsList.tsx`
- Skills 영역 데이터 패칭
- `content`(jsonb) 데이터를 안전하게 파싱하는 도우미 함수 포함
- 각 스킬 칩에 마우스를 올리면 나타나는 툴팁 구현

### `archive-list/ui/ArchiveList.tsx`
- Archive 영역(GitHub, Notion 등) 데이터 패칭
- 카드 전체가 `<a>` 링크로 동작

### `project-list/ui/ProjectList.tsx`
- 필터 옵션(`전체`/`학교`/`교육`/`실무`) 상수화 및 타입 정의
- `useState`로 두 가지 상태 관리:
  1. 현재 선택된 카테고리 필터
  2. 펼쳐진 카드들의 id 목록
- `toggle` 함수로 카드별 아코디언(펼치기/접기) 처리

### `algorithm-list/ui/AlgorithmList.tsx`
- 화살표 클릭 시 Problems 페이지로 이동하기 위한 `useNavigate` 사용
- `algorithm.title`과 일치하는 `problem.category` 개수를 세어 `Map`으로 만들어 문제 개수 표시
- 난이도(`level`) 값에 따라 게이지 바 색상을 다르게 적용하는 함수 포함

### `problems-list/ui/ProblemsList.tsx`
- URL 쿼리 스트링(`?category=...`)을 `useSearchParams`로 조회
- `category` 파라미터가 있으면 해당 알고리즘 분류의 문제만 필터링해서 표시

---

## entities

각 entity는 `model`(타입 정의)과 `api`(supabase 데이터 조회 함수)로 구성됩니다.

- **`model/*.ts`**: 해당 도메인 데이터의 인터페이스(타입) 정의
- **`api/get*.ts`**: supabase에서 실제로 데이터를 가져오는 함수 정의
- **`index.ts`**: 위 둘을 외부에 공개하는 유일한 창구 (barrel export)

| Entity | 설명 |
|---|---|
| `idCard` | 프로필 카드 정보 (이름, 생년월일, 연락처 등) |
| `introCard` | 한 줄 소개 |
| `expCard` | 경력 카드 목록 |
| `skillsList` | 카테고리별 기술 스택 |
| `archiving` | GitHub / Notion 등 외부 링크 카드 |
| `projectList` | 프로젝트 카드 목록 |
| `algorithm` | 알고리즘 분류 카드 |
| `problem` | 알고리즘 분류별 문제 목록 |

---

## shared

여러 레이어에서 공통으로 쓰는 코드입니다. 현재는 Supabase 클라이언트(`shared/api/supabase.ts`)가 위치합니다.