import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin/Admin'
import CompleteCandidatProfile from './pages/Candidates/CompleteProfile'
import CompleteRecruiterProfile from './pages/Recruiters/CompleteProfile'
import PostAJob from './pages/Recruiters/PostAJob'
import AdminDashboard from './pages/Admin/AdminDashboard'
function App() {

  return (
    <>
    <Routes>
      <Route index path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin/add-consultant" element={<Admin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/candidates/complete-profile" element={<CompleteCandidatProfile />} />
      <Route path="/recruiters/complete-profile" element={<CompleteRecruiterProfile />} />
      <Route path="/recruiters/post-a-job" element={<PostAJob />} />
    </Routes>
    </>

  )
}

export default App
