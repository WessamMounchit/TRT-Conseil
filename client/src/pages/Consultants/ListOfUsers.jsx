import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import {
  ActivateAccount,
  DesactivateAccount,
  deleteAccount,
  getUsers,
} from "../../api/consultants";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ListOfUsers = () => {
  const [users, setUsers] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [openUsersList, setOpenUsersList] = useState(false);

  useEffect(() => {
    fetchData(setUsers, getUsers);
  }, []);

  const handleAccountActivation = async (accountId) => {
    try {
      const response = await ActivateAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setUsers, getUsers);
  };

  const handleAccountDesactivation = async (accountId) => {
    try {
      const response = await DesactivateAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setUsers, getUsers);
  };

  const handleAccountDeletion = async (accountId) => {
    try {
      const response = await deleteAccount(accountId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setUsers, getUsers);
  };

  return (
    <>
        <h1 className="text-3xl text-center mb-11 mt-32 font-semibold hidden md:block">Liste des utilisateurs</h1>
      <div className="overflow-x-auto hidden md:block mx-24 h-96">
        <table className="table">
          <thead>
            <tr className="bg-neutral uppercase">
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actif</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user) => (
              <tr key={user.id} className="hover">
                <th>{`${user.id.slice(0, 9)}...`}</th>
                <td>{user.email}</td>
                <td>
                  {user.role_id === 1
                    ? "Admin"
                    : user.role_id === 2
                    ? "Consultant"
                    : user.role_id === 3
                    ? "Recruteur"
                    : user.role_id === 4
                    ? "Candidat"
                    : "Inconnu"}
                </td>
                <td
                  className="tooltip tooltip-left table-cell pl-[1.4rem]"
                  data-tip={
                    user.is_active
                      ? "Désactiver le compte"
                      : "Activer le compte"
                  }
                >
                  {user.is_active ? (
                    <AiFillCheckCircle
                      className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                      onClick={() => handleAccountDesactivation(user.id)}
                    />
                  ) : (
                    <BsHourglassSplit
                      className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                      onClick={() => handleAccountActivation(user.id)}
                    />
                  )}
                </td>
                <td
                  className="tooltip tooltip-left table-cell pl-[2.2rem]"
                  data-tip="Supprimer le compte"
                >
                  <BsFillTrashFill
                    className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                    onClick={() => handleAccountDeletion(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-24 mb-12 md:hidden">
        <button onClick={() => setOpenUsersList(!openUsersList)} className="btn btn-primary">
          Liste des utilisateurs {openUsersList ? <AiFillCaretUp className="text-2xl" /> : <AiOutlineCaretDown className="text-2xl" />}
        </button>
      </div>

      <div className="flex gap-6 justify-center items-center flex-wrap md:hidden">
        {openUsersList &&
          users.data?.map((user) => (
            <div
              key={user.id}
              className="card w-96 sm:w-60 bg-neutral text-neutral-content md:hidden"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{`${user.id.slice(0, 9)}...`}</h2>
                <p>{user.email}</p>
                <p>
                  {user.role_id === 1
                    ? "Admin"
                    : user.role_id === 2
                    ? "Consultant"
                    : user.role_id === 3
                    ? "Recruteur"
                    : user.role_id === 4
                    ? "Candidat"
                    : "Inconnu"}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="tooltip"
                    data-tip={
                      user.is_active
                        ? "Désactiver le compte"
                        : "Activer le compte"
                    }
                  >
                    {user.is_active ? (
                      <AiFillCheckCircle
                        className="cursor-pointer text-green-600 text-xl hover:text-emerald-400"
                        onClick={() => handleAccountDesactivation(user.id)}
                      />
                    ) : (
                      <BsHourglassSplit
                        className="cursor-pointer text-amber-400 text-xl hover:text-yellow-200"
                        onClick={() => handleAccountActivation(user.id)}
                      />
                    )}
                  </button>
                  <button className="tooltip" data-tip="Supprimer le compte">
                    <BsFillTrashFill
                      className="cursor-pointer text-red-600 text-xl hover:text-red-300"
                      onClick={() => handleAccountDeletion(user.id)}
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

export default ListOfUsers;
