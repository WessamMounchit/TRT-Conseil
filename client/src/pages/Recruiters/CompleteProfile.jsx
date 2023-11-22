import { toast } from "react-toastify";
import { useState } from "react";
import { completeRecruiterProfile } from "../../api/recruiters";
import { AiFillSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CompleteRecruiterProfile() {
  const navigate = useNavigate()
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
      const response = await completeRecruiterProfile({
        companyName,
        address,
      });

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
    <form
      className="flex flex-col gap-6 justify-center items-center mt-36"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-xl mb-4">
        Complétez votre profil
      </h1>
      <input
        required
        id="companyName"
        name="companyName"
        type="text"
        placeholder="Nom de l'entrprise"
        className="input input-bordered w-80 sm:w-[32rem]"
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
        className="input input-bordered w-80 sm:w-[32rem]"
      />
      <button className="btn btn-primary mt-5 w-80 sm:w-[32rem]">
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
