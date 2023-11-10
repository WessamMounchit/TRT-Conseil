import { useState } from "react";
import { removeApplication } from "../../api/candidates";
import { toast } from "react-toastify";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { AiFillCaretUp } from "react-icons/ai";

const ListOfJobApplied = ({ jobApplied, refreshData }) => {
  const [openJobAppliedList, setOpenJobAppliedList] = useState(false);

  const handleRemoveApplication = async (jobId) => {
    try {
      const response = await removeApplication(jobId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    refreshData();
  };

  let content;
  if (jobApplied.loading && openJobAppliedList) {
    content = (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  } else if (jobApplied.error && openJobAppliedList) {
    content = (
      <p className="font-semibold text-xl text-center my-4">
        Une erreur est survenue...
      </p>
    );
  } else if (jobApplied.data?.length === 0 && openJobAppliedList) {
    content = (
      <p className="font-semibold text-xl text-center my-4">
        Aucune Annonce postulée
      </p>
    );
  } else if (jobApplied.data?.length > 0) {
    content =
      openJobAppliedList &&
      jobApplied.data?.map((job) => (
        <div
          key={job.id}
          className="card w-80 bg-neutral text-neutral-content md:hidden mb-11"
        >
          <div className="card-body items-center text-center flex gap-3">
            <h2 className="card-title">{job.job_title}</h2>
            <p>{job.work_location}</p>
            <p>{job.description}</p>
            <div className="card-actions justify-end mt-8 flex gap-4">
              <button
                onClick={() => handleRemoveApplication(job.id)}
                className="btn btn-error flex justify-between items-center"
              >
                Postuler <IoIosRemoveCircleOutline className="text-xl" />
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
          onClick={() => setOpenJobAppliedList(!openJobAppliedList)}
          className="btn btn-primary w-64 flex justify-between items-center"
        >
          Annonces postulées
          {openJobAppliedList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap md:hidden">
        {content}
      </div>
    </>
  );
};

export default ListOfJobApplied;
