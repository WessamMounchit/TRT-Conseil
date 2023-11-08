import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import {
  activeCandidateAccount,
  desactiveCandidateAccount,
  deleteAccount,
  getCandidates,
} from "../../api/consultants";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ListOfCandidates = () => {
  const [candidates, setCandidates] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [openCandidatesList, setOpenCandidatesList] = useState(false);

  useEffect(() => {
    fetchData(setCandidates, getCandidates);
  }, []);

  const handleCandidateActivation = async (accountId) => {
    try {
      const response = await activeCandidateAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setCandidates, getCandidates);
  };

  const handleCandidateDesactivation = async (accountId) => {
    try {
      const response = await desactiveCandidateAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setCandidates, getCandidates);
  };

  const handleCandidateDeletion = async (accountId) => {
    try {
      const response = await deleteAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setCandidates, getCandidates);
  };

  let contentDesktop;
  if (candidates.loading) {
    contentDesktop = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (candidates.error) {
    contentDesktop = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (candidates.data?.length === 0) {
    contentDesktop = (
      <p className="font-semibold text-xl text-center my-4">
        Aucun candidat disponible
      </p>
    );
  } else if (candidates.data?.length > 0) {
    contentDesktop = (
      <table className="table">
        <thead>
          <tr className="bg-neutral uppercase">
            <th>ID</th>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Actif</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {candidates.data?.map((candidate) => (
            <tr key={candidate.id} className="hover">
              <th>{`${candidate.id.slice(0, 8)}...`}</th>
              <td>{candidate.email}</td>
              <td>{candidate.first_name}</td>
              <td>{candidate.last_name}</td>
              <td
                className="tooltip tooltip-left table-cell pl-[1.4rem]"
                data-tip={
                  candidate.is_active
                    ? "Désactiver le compte"
                    : "Activer le compte"
                }
              >
                {candidate.is_active ? (
                  <AiFillCheckCircle
                    className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                    onClick={() => handleCandidateDesactivation(candidate.id)}
                  />
                ) : (
                  <BsHourglassSplit
                    className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                    onClick={() => handleCandidateActivation(candidate.id)}
                  />
                )}
              </td>
              <td
                className="tooltip tooltip-left table-cell pl-[2.2rem]"
                data-tip="Supprimer le compte"
              >
                <BsFillTrashFill
                  className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                  onClick={() => handleCandidateDeletion(candidate.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  let contentMobile;
  if (candidates.loading && openCandidatesList) {
    contentMobile = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (candidates.error && openCandidatesList) {
    contentMobile = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (candidates.data?.length === 0 && openCandidatesList) {
    contentMobile = (
      <p className="font-semibold text-xl text-center my-4">
        Aucun candidat disponible
      </p>
    );
  } else if (candidates.data?.length > 0 && openCandidatesList) {
    contentMobile =
      candidates.data?.map((candidate) => (
        <div
          key={candidate.id}
          className="card w-96 h-72 bg-neutral text-neutral-content md:hidden mb-11"
        >
          <div className="card-body items-center text-center flex gap-3">
            <h2 className="card-title">{`${candidate.id.slice(0, 8)}...`}</h2>
            <p>{candidate.first_name}</p>
            <p>{candidate.last_name}</p>
            <p>{candidate.email}</p>
            <div className="card-actions justify-end mt-8 flex gap-4">
              <button
                className="tooltip"
                data-tip={
                  candidate.is_active
                    ? "Désactiver le compte"
                    : "Activer le compte"
                }
              >
                {candidate.is_active ? (
                  <AiFillCheckCircle
                    className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                    onClick={() => handleCandidateDesactivation(candidate.id)}
                  />
                ) : (
                  <BsHourglassSplit
                    className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                    onClick={() => handleCandidateActivation(candidate.id)}
                  />
                )}
              </button>
              <button className="tooltip" data-tip="Supprimer le compte">
                <BsFillTrashFill
                  className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                  onClick={() => handleCandidateDeletion(candidate.id)}
                />
              </button>
            </div>
          </div>
        </div>
      ));
  }

  return (
    <>
      <h1 className="text-3xl text-center mb-11 mt-32 font-semibold hidden md:block">
        Liste des candidats
      </h1>
      <div className="overflow-x-auto hidden md:block mx-24">
        {contentDesktop}
      </div>

      {/* MOBILE VIEW */}
      <div className="flex justify-center items-center md:hidden">
        <button
          onClick={() => setOpenCandidatesList(!openCandidatesList)}
          className="btn btn-primary w-64 flex justify-between items-center"
        >
          Liste des candidats
          {openCandidatesList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center flex-wrap md:hidden">
        {contentMobile}
      </div>
    </>
  );
};

export default ListOfCandidates;
