import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await register({ email, password, role });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 justify-center items-center h-[100vh]"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">Inscription à TRT Conseil</h1>
      <input
        required
        id="email"
        name="email"
        type="text"
        placeholder="Email"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
        onChange={e => onChange(e)}
        value={email}
      />
      <input
        required
        type="text"
        value={password}
        onChange={e => onChange(e)}
        id="password"
        name="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
      />
      <select
        className="select select-bordered w-full max-w-sm sm:max-w-md"
        name="role"
        value={role}
        onChange={e => onChange(e)}
      >
        <option disabled value="">
          Choisissez votre rôle
        </option>
        <option value="4">Candidat</option>
        <option value="3">Recruteur</option>
      </select>
      <button className="btn btn-primary mt-5 w-44">Se connecter</button>
    </form>
  );
}