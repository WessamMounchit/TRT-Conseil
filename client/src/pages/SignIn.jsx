import { useState } from "react";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { BiSolidLogIn } from "react-icons/bi";

const SignIn = () => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();

    try {
      const response = await login({ email, password });
      const { role, userEmail, token } = response.data;

      dispatch(authenticateUser({ role, email: userEmail }));
      secureLocalStorage.setItem("token", token);
      secureLocalStorage.setItem("isAuth", "true");
      secureLocalStorage.setItem("email", userEmail);
      secureLocalStorage.setItem("role", role);
      toast.success(response.data.message);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 justify-center items-center h-[100vh]"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">
        Connexion à TRT Conseil
      </h1>
      <input
        required
        id="email"
        name="email"
        type="text"
        autoComplete="current-email"
        placeholder="Email"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
        onChange={(e) => onChange(e)}
        value={email}
      />
      <input
        required
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => onChange(e)}
        id="password"
        name="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
      />
      <button className="btn btn-primary mt-5 w-44">
        Se connecter
        {loading ? (
          <span className="loading loading-spinner ml-2"></span>
        ) : (
          <BiSolidLogIn className="text-xl ml-2" />
        )}
      </button>
    </form>
  );
};

export default SignIn;
