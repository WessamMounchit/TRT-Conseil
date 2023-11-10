import { useState } from "react";
import { applyToJob } from "../../api/candidates";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsFillSendCheckFill } from "react-icons/bs";
import { AiFillCaretUp } from "react-icons/ai";
import { toast } from "react-toastify";

const ListOfJobPostings = ({ jobPostings, refreshData }) => {
  const [openJobPostingsList, setOpenJobPostingsList] = useState(false);

  const handleJobApplication = async (jobId) => {
    try {
      const response = await applyToJob(jobId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    refreshData();
  };

  let content;
  if (jobPostings.loading && openJobPostingsList) {
    content = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (jobPostings.error && openJobPostingsList) {
    content = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (jobPostings.data?.length === 0 && openJobPostingsList) {
    content = (
      <p className="font-semibold text-xl text-center my-4">
        Aucune Annonce disponible
      </p>
    );
  } else if (jobPostings.data?.length > 0) {
    content =
      openJobPostingsList &&
      jobPostings.data?.map((job) => (
        <div
          key={job.id}
          className="card w-80 bg-neutral text-neutral-content mb-11"
        >
          <div className="card-body items-center text-center flex gap-3">
            <h2 className="card-title">{job.job_title}</h2>
            <p>{job.work_location}</p>
            <p>{job.description}</p>
            <div className="card-actions justify-end mt-8 flex gap-4">
              <button
                onClick={() => handleJobApplication(job.id)}
                className="btn btn-secondary flex justify-between items-center"
              >
                Postuler <BsFillSendCheckFill />
              </button>
            </div>
          </div>
        </div>
      ));
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={() => setOpenJobPostingsList(!openJobPostingsList)}
          className="btn btn-primary w-64 flex justify-between items-center"
        >
          Annonces non-postulées
          {openJobPostingsList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap">
        {content}
      </div>
    </>
  );
};

export default ListOfJobPostings;
