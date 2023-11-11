import { useEffect, useState } from "react";
import ListOfApplications from "../../components/Consultants/ListOfApplications";
import ListOfCandidates from "../../components/Consultants/ListOfCandidates";
import ListOfJobs from "../../components/Consultants/ListOfJobs";
import ListOfRecruiters from "../../components/Consultants/ListOfRecruiters";
import fetchData from "../../utils/fetchData";
import { getApplications, getCandidates, getJobPostings, getRecruiters } from "../../api/consultants";

const ConsultantDashboard = () => {
  const [candidates, setCandidates] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [recruiters, setRecruiters] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [applications, setApplications] = useState({
    loading: false,
    error: false,
    data: [],
  });




  useEffect(() => {
    fetchData(setCandidates, getCandidates);
    fetchData(setRecruiters, getRecruiters);
    fetchData(setJobPostings, getJobPostings);
    fetchData(setApplications, getApplications);
  }, []);

  const refreshData = () => {
    fetchData(setCandidates, getCandidates);
  };


  return (
    <div className="flex flex-col justify-center items-center gap-5 md:gap-20 mt-32">
      <h1 className="font-semibold text-center text-lg mb-6 md:mb-0 md:text-2xl mx-6">Bienvenue dans le dashboard du consultant :</h1>
      <ListOfCandidates candidates={candidates} refreshData={refreshData} />
      <ListOfRecruiters recruiters={recruiters} refreshData={refreshData} />
      <ListOfJobs jobPostings={jobPostings} refreshData={refreshData} />
      <ListOfApplications applications={applications} refreshData={refreshData} />
    </div>
  );
};

export default ConsultantDashboard;
