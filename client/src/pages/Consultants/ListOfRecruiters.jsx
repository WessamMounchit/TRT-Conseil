import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import {
  activeRecruiterAccount,
  desactiveRecruiterAccount,
  deleteAccount,
  getRecruiters,
} from "../../api/consultants";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ListOfRecruiters = () => {
  const [recruiters, setRecruiters] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [openRecruitersList, setOpenRecruitersList] = useState(false);

  useEffect(() => {
    fetchData(setRecruiters, getRecruiters);
  }, []);

  const handleRecruiterActivation = async (accountId) => {
    try {
      const response = await activeRecruiterAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setRecruiters, getRecruiters);
  };

  const handleRecruiterDesactivation = async (accountId) => {
    try {
      const response = await desactiveRecruiterAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setRecruiters, getRecruiters);
  };

  const handleRecruiterDeletion = async (accountId) => {
    try {
      const response = await deleteAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setRecruiters, getRecruiters);
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-11 mt-32 font-semibold hidden md:block">
        Liste des recruteurs
      </h1>
      <div className="overflow-x-auto hidden md:block mx-24">
        <table className="table">
          <thead>
            <tr className="bg-neutral uppercase">
              <th>ID</th>
              <th>Email</th>
              <th>Nom de l&apos;entrprise</th>
              <th>Actif</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.data?.map((recruiter) => (
              <tr key={recruiter.id} className="hover">
                <th>{`${recruiter.id.slice(0, 9)}...`}</th>
                <td>{recruiter.email}</td>
                <td>{recruiter.company_name}</td>
                <td
                  className="tooltip tooltip-left table-cell pl-[1.4rem]"
                  data-tip={
                    recruiter.is_active
                      ? "Désactiver le compte"
                      : "Activer le compte"
                  }
                >
                  {recruiter.is_active ? (
                    <AiFillCheckCircle
                      className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                      onClick={() => handleRecruiterDesactivation(recruiter.id)}
                    />
                  ) : (
                    <BsHourglassSplit
                      className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                      onClick={() => handleRecruiterActivation(recruiter.id)}
                    />
                  )}
                </td>
                <td
                  className="tooltip tooltip-left table-cell pl-[2.2rem]"
                  data-tip="Supprimer le compte"
                >
                  <BsFillTrashFill
                    className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                    onClick={() => handleRecruiterDeletion(recruiter.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex justify-center items-center md:hidden">
        <button
          onClick={() => setOpenRecruitersList(!openRecruitersList)}
          className="btn btn-primary w-64 flex justify-between items-center"
        >
          Liste des recruteurs
          {openRecruitersList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center flex-wrap md:hidden">
        {openRecruitersList &&
          recruiters.data?.map((recruiter) => (
            <div
              key={recruiter.id}
              className="card w-96 h-72 bg-neutral text-neutral-content md:hidden mb-11"
            >
              <div className="card-body items-center text-center flex gap-3">
                <h2 className="card-title">{`${recruiter.id.slice(0, 9)}...`}</h2>
                <p>{recruiter.company_name}</p>
                <p>{recruiter.email}</p>
                <div className="card-actions justify-end mt-8 flex gap-4">
                  <button
                    className="tooltip"
                    data-tip={
                      recruiter.is_active
                        ? "Désactiver le compte"
                        : "Activer le compte"
                    }
                  >
                    {recruiter.is_active ? (
                      <AiFillCheckCircle
                        className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                        onClick={() => handleRecruiterDesactivation(recruiter.id)}
                      />
                    ) : (
                      <BsHourglassSplit
                        className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                        onClick={() => handleRecruiterActivation(recruiter.id)}
                      />
                    )}
                  </button>
                  <button className="tooltip" data-tip="Supprimer le compte">
                    <BsFillTrashFill
                      className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                      onClick={() => handleRecruiterDeletion(recruiter.id)}
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

export default ListOfRecruiters;
