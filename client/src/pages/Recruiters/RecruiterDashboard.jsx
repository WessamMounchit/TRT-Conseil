import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { BsFillSendCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  checkIfRecruiterActive,
  checkIfRecruiterProfileComplete,
  getJobs,
} from "../../api/recruiters";
import fetchData from "../../utils/fetchData";
import ListOfJobs from "../../components/Recruiters/ListOfJobs";
import { BsHourglassSplit } from "react-icons/bs";

const RecruiterDashboard = () => {
  const [recruiterState, setRecruiterState] = useState({
    isActive: false,
    isProfileComplete: false,
    loading: false,
    error: false
  });

  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: false,
    data: [],
  });

  useEffect(() => {
    fetchData(setJobPostings, getJobs);
    setRecruiterState((recruiterState) => ({...recruiterState, loading: true}))

    Promise.all([checkIfRecruiterActive(), checkIfRecruiterProfileComplete()])
      .then(([isActiveResponse, isProfileCompleteResponse]) => {
        setRecruiterState({
          isActive: isActiveResponse.data,
          isProfileComplete: isProfileCompleteResponse.data,
        });
      })
      .catch(() => {
        setRecruiterState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
        }));
      });
  }, []);

  if (recruiterState.loading || jobPostings.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (jobPostings.error || recruiterState.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-semibold text-2xl">Une erreur est survenue...</h1>
      </div>
    )
  }

  if (recruiterState.isActive) {
    if (recruiterState.isProfileComplete) {      return (
        <div className="flex flex-col justify-center items-center mt-64 gap-3">
          <h1 className="font-semibold text-lg md:text-2xl mb-5 text-center">
            Bienvenue dans le dashboard du recruteur :
          </h1>
          <Link to="/recruiters/post-a-job">
            <button className="btn btn-primary w-64 flex justify-between items-center">
              Poster une annonce <BsFillSendCheckFill className="text-3xl" />
            </button>
          </Link>
          <ListOfJobs jobPostings={jobPostings} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
          <h1 className="font-semibold text-2xl text-center">
            Veuillez compléter votre profil pour poster des annonces :
          </h1>
          <Link to="/recruiters/complete-profile">
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
          Votre compte est en cours de verification, veuillez attendre
          qu&apos;un consultant le valide pour accéder a votre dashboard
        </h1>
      </div>
    );
  }
};

export default RecruiterDashboard;
