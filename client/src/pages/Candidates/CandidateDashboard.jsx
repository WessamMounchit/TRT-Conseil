import { useEffect, useState } from "react";
import ListOfJobApplied from "./ListOfJobApplied";
import ListOfJobPostings from "./ListOfJobPostings";
import {
  checkIfActive,
  checkIfCandidateProfileComplete,
  getJobApplied,
  getJobPostings,
} from "../../api/candidates";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { BsHourglassSplit } from "react-icons/bs";
import fetchData from "../../utils/fetchData";

const CandidateDashboard = () => {
  const [candidateState, setCandidateState] = useState({
    isActive: false,
    isProfileComplete: false,
    loading: true,
  });

  const [jobApplied, setJobApplied] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: null,
    data: [],
  });

  useEffect(() => {
    fetchData(setJobApplied, getJobApplied);
    fetchData(setJobPostings, getJobPostings);

    Promise.all([checkIfActive(), checkIfCandidateProfileComplete()])
      .then(([isActiveResponse, isProfileCompleteResponse]) => {
        setCandidateState({
          isActive: isActiveResponse.data,
          isProfileComplete: isProfileCompleteResponse.data,
          loading: false,
        });
      })
      .catch(() => {
        setJobApplied((prevState) => ({
          ...prevState,
          loading: false,
          error: "Une erreur est survenue lors de la vérification du compte.",
        }));
        setJobPostings((prevState) => ({
          ...prevState,
          loading: false,
          error: "Une erreur est survenue lors de la vérification du profil.",
        }));
      });
  }, []);

  const refreshData = () => {
    fetchData(setJobApplied, getJobApplied);
    fetchData(setJobPostings, getJobPostings);
  };

  if (candidateState.loading || jobApplied.loading || jobPostings.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (candidateState.isActive) {
    if (candidateState.isProfileComplete) {
      return (
        <div className="flex flex-col justify-center items-center mt-64 gap-3">
          <h1 className="font-semibold text-2xl mb-5 text-center">
            Bienvenue dans le dashboard du candidat :
          </h1>
          <ListOfJobPostings
            jobPostings={jobPostings}
            refreshData={refreshData}
          />
          <ListOfJobApplied jobApplied={jobApplied} refreshData={refreshData} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
          <h1 className="font-semibold text-2xl text-center">
            Veuillez compléter votre profil pour accéder aux annonces :
          </h1>
          <Link to="/candidates/complete-profile">
            <button className="btn btn-primary w-64 flex justify-between items-center">
              Compléter mon profil <ImProfile className="text-3xl" />
            </button>
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <div className="flex justify-center items-center text-9xl text-amber-400">
          <BsHourglassSplit />
        </div>
        <h1 className="font-semibold text-2xl text-center">
          Votre compte est en cours de vérification, veuillez attendre
          qu&apos;un consultant le valide pour accéder à votre dashboard
        </h1>
      </div>
    );
  }
};

export default CandidateDashboard;