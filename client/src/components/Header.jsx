import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { unauthenticateUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const role = secureLocalStorage.getItem("role");
  const email = secureLocalStorage.getItem("email");
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let roleText;

  switch (role) {
    case 1:
      roleText = "Admin";
      break;
    case 2:
      roleText = "Consultant";
      break;
    case 3:
      roleText = "Recruteur";
      break;
    case 4:
      roleText = "Candidat";
      break;
  }

  const logout = async (e) => {
    try {
      e.preventDefault();

      secureLocalStorage.clear();
      dispatch(unauthenticateUser());

      toast.success("Déconnexion réalisée avec succès");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {isAuth && (
        <div>
          <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3 font-semibold ml-4 mt-4 text-sm sm:text-base">
            <p>Connecté en tant que : </p>
            <p>
              {roleText} ({email})
            </p>
          </div>
          <div className="absolute top-4 right-4 tooltip tooltip-left" data-tip="Se déconnecter">
            <FiLogOut
              className="text-2xl  cursor-pointer hover:text-slate-500"
              onClick={(e) => logout(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
