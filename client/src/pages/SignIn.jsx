import { useState } from "react";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { BiSolidLogIn } from "react-icons/bi";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      className="flex flex-col gap-6 justify-center items-center mt-44"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-xl mb-4">
        Connexion à TRT Conseil
      </h1>
      <input
        required
        id="email"
        name="email"
        type="text"
        autoComplete="current-email"
        placeholder="Email"
        className="input input-bordered w-80 sm:w-[32rem]"
        onChange={(e) => onChange(e)}
        value={email}
      />
      <div className="relative flex justify-center items-center">
        <input
          required
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => onChange(e)}
          id="password"
          name="password"
          placeholder="Mot de passe"
          className="input input-bordered w-80 sm:w-[32rem]"
        />
        {showPassword ? (
          <AiFillEyeInvisible
            className="absolute right-4 text-xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <AiFillEye
            className="absolute right-4 text-xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <button className="btn btn-primary mt-5  w-80 sm:w-[32rem]">
        Se connecter
        {loading ? (
          <span className="loading loading-spinner ml-2"></span>
        ) : (
          <BiSolidLogIn className="text-xl ml-2" />
        )}
      </button>
      <Link to="/sign-up">
        <p className="link link-hover text-primary">
          Vous n&apos;avez pas de compte ? Inscrivez-vous
        </p>
      </Link>
    </form>
  );
};

export default SignIn;
