import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import {
  ApproveJob,
  UnapproveJob,
  deleteJob,
  getJobPostings,
} from "../../api/consultants";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ListOfJobs = () => {
  const [jobPostings, setJobPostings] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [openJobsList, setOpenJobsList] = useState(false);

  useEffect(() => {
    fetchData(setJobPostings, getJobPostings);
  }, []);

  const handleJobActivation = async (jobId) => {
    try {
      const response = await ApproveJob(jobId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setJobPostings, getJobPostings);
  };

  const handleJobDesactivation = async (jobId) => {
    try {
      const response = await UnapproveJob(jobId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setJobPostings, getJobPostings);
  };

  const handleJobDeletion = async (jobId) => {
    try {
      const response = await deleteJob(jobId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setJobPostings, getJobPostings);
  };

  let contentDesktop;
  if (jobPostings.loading) {
    contentDesktop = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (jobPostings.error) {
    contentDesktop = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (jobPostings.data?.length === 0) {
    contentDesktop = (
      <p className="font-semibold text-xl text-center my-4">
        Aucune annonce disponible
      </p>
    );
  } else if (jobPostings.data?.length > 0) {
    contentDesktop = (
      <table className="table">
        <thead>
          <tr className="bg-neutral uppercase text-white">
            <th>ID</th>
            <th>Titre</th>
            <th>Lieu</th>
            <th>Description</th>
            <th>Recruteur</th>
            <th>Validation</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {jobPostings.data?.map((job) => (
            <tr key={job.id} className="hover">
              <th>{job.id}</th>
              <td>{job.job_title}</td>
              <td>{job.work_location}</td>
              <td>{`${job.description.slice(0, 15)}...`}</td>
              <td>{`${job.recruiter_id.slice(0, 8)}...`}</td>
              <td
                className="tooltip tooltip-left table-cell pl-[2.4rem]"
                data-tip={
                  job.is_valid ? "Désactiver l'annonce" : "Activer l'annonce"
                }
              >
                {job.is_valid ? (
                  <AiFillCheckCircle
                    className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                    onClick={() => handleJobDesactivation(job.id)}
                  />
                ) : (
                  <BsHourglassSplit
                    className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                    onClick={() => handleJobActivation(job.id)}
                  />
                )}
              </td>
              <td
                className="tooltip tooltip-left table-cell pl-[2.2rem]"
                data-tip="Supprimer l'annonce"
              >
                <BsFillTrashFill
                  className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                  onClick={() => handleJobDeletion(job.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  let contentMobile;
  if (jobPostings.loading && openJobsList) {
    contentMobile = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (jobPostings.error && openJobsList) {
    contentMobile = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (jobPostings.data?.length === 0 && openJobsList) {
    contentMobile = (
      <p className="font-semibold text-xl text-center my-4">
        Aucune annonce disponible
      </p>
    );
  } else if (jobPostings.data?.length > 0 && openJobsList) {
    contentMobile = jobPostings.data?.map((job) => (
      <div
        key={job.id}
        className="card w-80 bg-neutral text-neutral-content md:hidden mb-11"
      >
        <div className="card-body items-center text-center flex gap-3">
          <h2 className="card-title">{job.id}</h2>
          <p>{job.job_title}</p>
          <p>{job.work_location}</p>
          <p>{job.recruiter_id}</p>
          <p>{job.description}</p>
          <div className="card-actions justify-end mt-8 flex gap-4">
            <button
              className="tooltip"
              data-tip={
                job.is_valid ? "Désactiver l'annonce" : "Activer l'annonce"
              }
            >
              {job.is_valid ? (
                <AiFillCheckCircle
                  className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                  onClick={() => handleJobDesactivation(job.id)}
                />
              ) : (
                <BsHourglassSplit
                  className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                  onClick={() => handleJobActivation(job.id)}
                />
              )}
            </button>
            <button className="tooltip" data-tip="Supprimer l'annonce">
              <BsFillTrashFill
                className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                onClick={() => handleJobDeletion(job.id)}
              />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <h1 className="text-3xl text-center font-semibold hidden md:block">
        Liste des annonces
      </h1>
      <div className="overflow-x-auto hidden md:block mx-16">
        {contentDesktop}
      </div>

      {/* MOBILE VIEW */}
      <div className="flex justify-center items-center md:hidden">
        <button
          onClick={() => setOpenJobsList(!openJobsList)}
          className="btn btn-primary w-64 flex justify-between items-center"
        >
          Liste des annonces
          {openJobsList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap md:hidden">
        {contentMobile}
      </div>
    </>
  );
};

export default ListOfJobs;
