import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import {
  ApproveApplication,
  UnapproveApplication,
  deleteApplication,
  getApplications,
} from "../../api/consultants";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ListOfApplications = () => {
  const [applications, setApplications] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [openApplicationsList, setOpenApplicationsList] = useState(false);

  useEffect(() => {
    fetchData(setApplications, getApplications);
  }, []);

  const handleApplicationsActivation = async (applicationsId) => {
    try {
      const response = await ApproveApplication(applicationsId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setApplications, getApplications);
  };

  const handleApplicationsDesactivation = async (applicationsId) => {
    try {
      const response = await UnapproveApplication(applicationsId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setApplications, getApplications);
  };

  const handleApplicationsDeletion = async (applicationsId) => {
    try {
      const response = await deleteApplication(applicationsId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setApplications, getApplications);
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-11 mt-32 font-semibold hidden md:block">
        Liste des candidatures
      </h1>
      <div className="overflow-x-auto hidden md:block mx-16 h-96">
        <table className="table">
          <thead>
            <tr className="bg-neutral uppercase">
              <th>ID</th>
              <th>Candidat ID</th>
              <th>Job ID</th>
              <th>Consultant ID</th>
              <th>Validation</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {applications.data?.map((application) => (
              <tr key={application.id} className="hover">
                <th>{application.id}</th>
                <td>{`${application.candidate_id.slice(0, 9)}...`}</td>
                <td className="text-center">{application.job_posting_id}</td>
                <td>{application.consultant_id ? `${application.consultant_id.slice(0, 9)}...` : "Non approuvée"}</td>
                <td
                  className="tooltip tooltip-left table-cell pl-[2.4rem]"
                  data-tip={
                    application.is_valid ? "Désapprouver la candidature" : "Approuver la candidature" 
                  }
                >
                  {application.is_valid ? (
                    <AiFillCheckCircle
                      className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                      onClick={() => handleApplicationsDesactivation(application.id)}
                    />
                  ) : (
                    <BsHourglassSplit
                      className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                      onClick={() => handleApplicationsActivation(application.id)}
                    />
                  )}
                </td>
                <td
                  className="tooltip tooltip-left table-cell pl-[2.2rem]"
                  data-tip="Supprimer la candidature"
                >
                  <BsFillTrashFill
                    className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                    onClick={() => handleApplicationsDeletion(application.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex justify-center items-center mt-24 mb-12 md:hidden">
        <button
          onClick={() => setOpenApplicationsList(!openApplicationsList)}
          className="btn btn-primary"
        >
          Liste des candidatures
          {openApplicationsList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex gap-6 justify-center items-center flex-wrap md:hidden">
        {openApplicationsList &&
          applications.data?.map((application) => (
            <div
              key={application.id}
              className="card w-96 md:w-60 bg-neutral text-neutral-content md:hidden"
            >
              <div className="card-body items-center text-center flex gap-3">
                <h2 className="card-title">{application.id}</h2>
                <p>{`ID Candidate : ${application.candidate_id.slice(0, 9)}...`}</p>
                <p>Job ID : {application.job_posting_id}</p>
                <p>{application.consultant_id ? `${application.consultant_id.slice(0, 9)}...` : "Non approuvée"}</p>
                <div className="card-actions justify-end mt-8 flex gap-4">
                  <button
                    className="tooltip"
                    data-tip={
                      application.is_valid
                        ? "Désapprouver la candidature"
                        : "Approuver la candidature"
                    }
                  >
                    {application.is_valid ? (
                      <AiFillCheckCircle
                        className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                        onClick={() => handleApplicationsDesactivation(application.id)}
                      />
                    ) : (
                      <BsHourglassSplit
                        className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                        onClick={() => handleApplicationsActivation(application.id)}
                      />
                    )}
                  </button>
                  <button className="tooltip" data-tip="Supprimer la candidature">
                    <BsFillTrashFill
                      className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                      onClick={() => handleApplicationsDeletion(application.id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListOfApplications;
