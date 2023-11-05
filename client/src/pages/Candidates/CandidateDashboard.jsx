import { useEffect, useState } from "react";
import ListOfJobApplied from "./ListOfJobApplied";
import ListOfJobPostings from "./ListOfJobPostings";
import { checkIfActive, getJobApplied, getJobPostings } from "../../api/candidates";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import fetchData from "../../utils/fetchData";

const CandidateDashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [jobApplied, setJobApplied] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: false,
    data: [],
  });


  useEffect(() => {
    checkIfActive()
      .then((response) => {
        setIsActive(response.data);
      })
      .catch(() =>
        console.log(
          "Une erreur est survenue lors de la verification du compte."
        )
      );
    fetchData(setJobApplied, getJobApplied);
    fetchData(setJobPostings, getJobPostings);
  }, []);

  const refreshData = () => {
    fetchData(setJobApplied, getJobApplied);
    fetchData(setJobPostings, getJobPostings);
  }

  return (
    <>
      {isActive ? (
        <div className="flex flex-col justify-center items-center mt-64 gap-3">
          <h1 className="font-semibold text-2xl mb-5">
            Bienvenue dans le dashboard du candidat :
          </h1>
          <ListOfJobPostings jobPostings={jobPostings} refreshData={refreshData} />
          <ListOfJobApplied jobApplied={jobApplied} refreshData={refreshData} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
          <h1 className="font-semibold text-2xl">
            Veuillez compléter votre profil pour accéder aux annonces :
          </h1>
          <Link to="/candidates/complete-profile">
            <button className="btn btn-primary w-64 flex justify-between items-center">
              Compléter mon profil <ImProfile className="text-3xl" />
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CandidateDashboard;
