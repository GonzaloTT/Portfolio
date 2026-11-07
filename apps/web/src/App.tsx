import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from './layout/SiteLayout'

export default function App() {
  return <BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<div className="container section"><h1>Portfolio</h1></div>} />
    <Route path="experience" element={<div className="container section"><h1>Professional Experience</h1></div>} />
    <Route path="connect" element={<div className="container section"><h1>Connect with Me</h1></div>} />
  </Route></Routes></BrowserRouter>
}

