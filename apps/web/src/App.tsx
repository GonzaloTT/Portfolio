import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from './layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { ExperiencePage } from './pages/ExperiencePage'

export default function App() {
  return <BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="experience" element={<ExperiencePage />} />
    <Route path="connect" element={<div className="container section"><h1>Connect with Me</h1></div>} />
  </Route></Routes></BrowserRouter>
}

