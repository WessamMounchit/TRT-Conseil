import { toast } from "react-toastify";
import { useState } from "react";
import { createConsultant } from "../../api/admin";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AddConsultant() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await createConsultant({ email, password, role: 2 });

      toast.success(response.data.message);
      setloading(false);
      navigate("/")
    } catch (error) {
      setloading(false);
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 justify-center items-center mt-44"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-xl sm:text-3xl mb-4 flex items-center gap-3">
          <IoMdPersonAdd /> Ajouter un consultant
        </h1>
        <input
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          className="input input-bordered w-80 sm:w-[32rem]"
          onChange={(e) => onChange(e)}
          value={email}
        />
        <div className="relative flex justify-center items-center">
          <input
            required
            type={showPassword ? "text" : "password"}
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
        <button className="btn btn-primary mt-5 w-80 sm:w-[32rem]">
          Ajouter
          {loading ? (
            <span className="loading loading-spinner ml-2"></span>
          ) : (
            <MdAddBox className="text-xl ml-2" />
          )}
        </button>
      </form>
    </>
  );
}
