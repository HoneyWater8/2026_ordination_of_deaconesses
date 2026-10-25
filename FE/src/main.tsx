import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App'
import { initErrorTracking } from './utils/analytics'

// 앱보다 먼저 — 첫 렌더 중 오류도 GA exception으로 남긴다
initErrorTracking()
createRoot(document.getElementById('root')!).render(<App />)
