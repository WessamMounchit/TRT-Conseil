import { toast } from "react-toastify";
import { useState } from "react";
import { completeCandidateProfile } from "../../api/candidates";
import { AiFillSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CompleteCandidatProfile() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  });

  const [cv, setCv] = useState(null);

  const handleCvChange = (e) => {
    const selectedFile = e.target.files[0];
    setCv(selectedFile);
  };

  const { firstName, lastName } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("cv", cv);

      const response = await completeCandidateProfile(formData);

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
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">
        Complétez votre profil
      </h1>
      <input
        required
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Prénom"
        className="input input-bordered w-80 sm:w-[32rem]"
        onChange={(e) => onChange(e)}
        value={firstName}
      />
      <input
        required
        type="text"
        value={lastName}
        onChange={(e) => onChange(e)}
        id="lastName"
        name="lastName"
        placeholder="Nom"
        className="input input-bordered w-80 sm:w-[32rem]"
      />
      <input
        required
        accept="application/pdf"
        type="file"
        className="file-input file-input-bordered w-80 sm:w-[32rem]"
        onChange={(e) => handleCvChange(e)}
        id="cv"
        name="cv"
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
