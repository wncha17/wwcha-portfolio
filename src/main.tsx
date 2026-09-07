// React가 렌더링 우선순위를 스스로 조절할 수 있게 해주는 렌더링 API
import { createRoot } from 'react-dom/client'
// 프로젝트 전체에 적용되는 전역 CSS
import './index.css'
// 루트 컴포넌트. 라우팅과 Header를 담고 있음
import App from './app/App.tsx'
// 브라우저의 실제 URL 기반으로 라우팅하는 방식 (클라이언트에서만 URL 처리)
import { BrowserRouter } from 'react-router-dom'
// react-query의 핵심 두 가지
// QueryClient: 서버에서 가져온 데이터를 캐싱/관리하는 저장소 역할
// QueryClientProvider: 그 저장소를 React 컴포넌트 트리 전체에 공급하는 Context Provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 앱 전체에서 공유할 캐시 저장소를 하나 생성
const queryClient = new QueryClient()

// index.html 안에 있는 <div id="root"></div>를 찾아서, 그 안에 React 앱을 그려 넣음
// '!'는 TypeScript의 non-null assertion
createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  
)
