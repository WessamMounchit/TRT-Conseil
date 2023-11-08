import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CompleteCandidatProfile from "./pages/Candidates/CompleteProfile";
import CompleteRecruiterProfile from "./pages/Recruiters/CompleteProfile";
import PostAJob from "./pages/Recruiters/PostAJob";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ConsultantDashboard from "./pages/Consultants/ConsultantDashboard";
import AddConsultant from "./pages/Admin/AddConsultant";
import Header from "./components/Header";
import CandidateDashboard from "./pages/Candidates/CandidateDashboard";
import RecruiterDashboard from "./pages/Recruiters/RecruiterDashboard";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  const role = secureLocalStorage.getItem("role");
  let dashboard;

  switch (role) {
    case 1:
      dashboard = "/admin";
      break;
    case 2:
      dashboard = "/consultants";
      break;
    case 3:
      dashboard = "/recruiters";
      break;
    case 4:
      dashboard = "/candidates";
      break;
    default:
      dashboard = "/";
  }


  return (
    <>
      <Header />
      <Routes>
        {!isAuth && (
          <>
            <Route index path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                />
              }
            />
          </>
          
        )}

        {isAuth && (
          <>
            {role === 1 && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/add-consultant"
                  element={<AddConsultant />}
                />
              </>
            )}

            {role === 2 && (
              <Route path="/consultants" element={<ConsultantDashboard />} />
            )}

            {role === 3 && (
              <>
                <Route path="/recruiters" element={<RecruiterDashboard />} />
                <Route
                  path="/recruiters/complete-profile"
                  element={<CompleteRecruiterProfile />}
                />
                <Route path="/recruiters/post-a-job" element={<PostAJob />} />
              </>
            )}

            {role === 4 && (
              <>
                <Route path="/candidates" element={<CandidateDashboard />} />
                <Route
                  path="/candidates/complete-profile"
                  element={<CompleteCandidatProfile />}
                />
              </>
            )}
            <Route
              path="*"
              element={
                <Navigate
                  to={dashboard}
                />
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
