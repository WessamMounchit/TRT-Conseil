import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CompleteCandidatProfile from './pages/Candidates/CompleteProfile'
import CompleteRecruiterProfile from './pages/Recruiters/CompleteProfile'
import PostAJob from './pages/Recruiters/PostAJob'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ConsultantDashboard from './pages/Consultants/ConsultantDashboard'
import AddConsultant from './pages/Admin/AddConsultant'
import Header from "./components/Header";
import CandidateDashboard from './pages/Candidates/CandidateDashboard'
import RecruiterDashboard from './pages/Recruiters/RecruiterDashboard'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route index path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin/add-consultant" element={<AddConsultant />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/candidates" element={<CandidateDashboard />} />
      <Route path="/candidates/complete-profile" element={<CompleteCandidatProfile />} />
      <Route path="/recruiters" element={<RecruiterDashboard />} />
      <Route path="/recruiters/complete-profile" element={<CompleteRecruiterProfile />} />
      <Route path="/recruiters/post-a-job" element={<PostAJob />} />
      <Route path="/consultants" element={<ConsultantDashboard />} />
    </Routes>
    </>

  )
}

export default App
