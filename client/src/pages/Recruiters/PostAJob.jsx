import { toast } from "react-toastify";
import { useState } from "react";
import { createJobOffer } from "../../api/recruiters";

export default function PostAJob() {
  const [inputs, setInputs] = useState({
    jobTitle: "",
    workLocation: "",
    description: "",
  });

  const { jobTitle, workLocation, description } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createJobOffer({
        jobTitle,
        workLocation,
        description,
      });

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
      <h1 className="font-semibold text-xl sm:text-3xl mb-4">
        Poster une offre d&apos;emploi
      </h1>
      <input
        required
        id="jobTitle"
        name="jobTitle"
        type="text"
        placeholder="Titre de l'annonce"
        className="input input-bordered w-full max-w-sm sm:max-w-md"
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
        className="input input-bordered w-full max-w-sm sm:max-w-md"
      />
      <textarea
        className="textarea textarea-bordered w-full max-w-sm sm:max-w-md"
        placeholder="Description"
        value={workLocation}
        onChange={(e) => onChange(e)}
        id="description"
        name="description"
      ></textarea>
      <button className="btn btn-primary mt-5 w-44">Poster</button>
    </form>
  );
}
