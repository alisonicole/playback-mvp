import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Playback from './pages/Playback.jsx'

export default function App() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" element={<Landing onEnterApp={() => navigate('/app')} />} />
      <Route path="/app" element={<Playback />} />
    </Routes>
  )
}