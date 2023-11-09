import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { IoIosCreate } from "react-icons/Io";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await register({ email, password, role });

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 justify-center items-center mt-32"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">
        Inscription à TRT Conseil
      </h1>
      <input
        required
        id="email"
        name="email"
        type="text"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs sm:max-w-md"
        onChange={(e) => onChange(e)}
        value={email}
      />
      <div className="w-full relative max-w-xs sm:max-w-md flex justify-center items-center">
      <input
        required
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => onChange(e)}
        id="password"
        name="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full"
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

      <select
        className="select select-bordered w-full max-w-xs sm:max-w-md"
        name="role"
        value={role}
        onChange={(e) => onChange(e)}
      >
        <option disabled value="">
          Choisissez votre rôle
        </option>
        <option value="4">Candidat</option>
        <option value="3">Recruteur</option>
      </select>
      <button className="btn btn-primary mt-5 w-full max-w-xs sm:max-w-md ml-2">
        S&apos;inscrire
        {loading ? (
          <span className="loading loading-spinner ml-2"></span>
        ) : (
          <IoIosCreate className="text-xl ml-2" />
        )}
      </button>
      <Link to="/sign-in">
        <p className="link link-hover text-primary">
          Vous avez deja un compte ? Connectez-vous
        </p>
      </Link>
    </form>
  );
}
