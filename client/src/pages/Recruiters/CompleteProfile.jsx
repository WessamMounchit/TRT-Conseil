import { toast } from "react-toastify";
import { useState } from "react";
import { completeRecruiterProfile } from "../../api/recruiters";
import { AiFillSave } from "react-icons/ai";

export default function CompleteRecruiterProfile() {
  const [loading, setloading] = useState(false);
  const [inputs, setInputs] = useState({
    companyName: "",
    address: "",
  });

  const { companyName, address } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();

    try {
      const response = await completeRecruiterProfile({ companyName, address });

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
        Complétez votre profil
      </h1>
      <input
        required
        id="companyName"
        name="companyName"
        type="text"
        placeholder="Nom de l'entrprise"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
        onChange={(e) => onChange(e)}
        value={companyName}
      />
      <input
        required
        type="text"
        value={address}
        onChange={(e) => onChange(e)}
        id="address"
        name="address"
        placeholder="Adresse"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
      />
      <button className="btn btn-primary mt-5 w-44">
        Enregistrer
        {loading ? (
          <span className="loading loading-spinner ml-2"></span>
        ) : (
          <AiFillSave className="text-xl ml-2" />
        )}
      </button>
    </form>
  );
}
