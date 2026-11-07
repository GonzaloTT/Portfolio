import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from './layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { ExperiencePage } from './pages/ExperiencePage'
import { ConnectPage } from './pages/ConnectPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return <BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="experience" element={<ExperiencePage />} />
    <Route path="connect" element={<ConnectPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></BrowserRouter>
}

