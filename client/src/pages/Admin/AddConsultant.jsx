import { toast } from "react-toastify";
import { useState } from "react";
import { createConsultant } from "../../api/admin";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

export default function AddConsultant() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createConsultant({ email, password, role: 2 });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
    <form
      className="flex flex-col gap-6 justify-center items-center h-[100vh]"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-3xl mb-4 flex items-center gap-3">
       <BiSolidUser /> Ajouter un consultant 
      </h1>
      <input
        required
        id="email"
        name="email"
        type="text"
        placeholder="Email"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
        onChange={(e) => onChange(e)}
        value={email}
      />
      <input
        required
        type="password"
        value={password}
        onChange={(e) => onChange(e)}
        id="password"
        name="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
      />
      <button className="btn btn-primary mt-5 w-44">Ajouter <AiOutlinePlus /></button>
    </form>
    </>
  );
}
