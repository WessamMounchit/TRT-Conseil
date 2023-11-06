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
import ListOfJobs from "./ListOfJobs";
import { BsHourglassSplit } from "react-icons/bs";

const RecruiterDashboard = () => {
  const [recruiterState, setRecruiterState] = useState({
    isActive: false,
    isProfileComplete: false,
    loading: true,
  });

  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: null,
    data: [],
  });

  useEffect(() => {
    fetchData(setJobPostings, getJobs);

    Promise.all([checkIfRecruiterActive(), checkIfRecruiterProfileComplete()])
      .then(([isActiveResponse, isProfileCompleteResponse]) => {
        setRecruiterState({
          isActive: isActiveResponse.data,
          isProfileComplete: isProfileCompleteResponse.data,
          loading: false,
        });
      })
      .catch(() => {
        setJobPostings((prevState) => ({
          ...prevState,
          loading: false,
          error: "Une erreur est survenue lors de la vérification.",
        }));
      });
  }, []);

  if (recruiterState.loading || jobPostings.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (recruiterState.isActive) {
    if (recruiterState.isProfileComplete) {      return (
        <div className="flex flex-col justify-center items-center mt-64 gap-3">
          <h1 className="font-semibold text-2xl mb-5 text-center">
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
