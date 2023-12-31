import { toast } from "react-toastify";
import { useState } from "react";
import { createJobOffer } from "../../api/recruiters";
import { BsFillSendCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PostAJob() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false);
  const [inputs, setInputs] = useState({
    jobTitle: "",
    workLocation: "",
    description: "",
  });

  const { jobTitle, workLocation, description } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();

    try {
      const response = await createJobOffer({
        jobTitle,
        workLocation,
        description,
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
      className="flex flex-col gap-6 justify-center items-center mt-24"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">
        Poster une offre d&apos;emploi
      </h1>
      <input
        required
        id="jobTitle"
        name="jobTitle"
        type="text"
        placeholder="Titre de l'annonce"
        className="input input-bordered w-80 sm:w-[32rem]"
        onChange={(e) => onChange(e)}
        value={jobTitle}
      />
      <input
        required
        type="text"
        value={workLocation}
        onChange={(e) => onChange(e)}
        id="workLocation"
        name="workLocation"
        placeholder="Lieu du travail"
        className="input input-bordered w-80 sm:w-[32rem]"
      />
      <textarea
        className="textarea textarea-bordered w-80 sm:w-[32rem]"
        placeholder="Description"
        value={description}
        onChange={(e) => onChange(e)}
        id="description"
        name="description"
      ></textarea>
      <button className="btn btn-primary mt-5 w-80 sm:w-[32rem]">
        Poster
        {loading ? (
          <span className="loading loading-spinner ml-2"></span>
        ) : (
          <BsFillSendCheckFill className="text-xl ml-2" />
        )}
      </button>
    </form>
  );
}
