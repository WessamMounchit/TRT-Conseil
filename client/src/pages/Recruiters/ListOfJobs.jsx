import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdOutlineSupervisorAccount } from "react-icons/Md";
import { AiFillCaretUp } from "react-icons/ai";
import fetchData from "../../utils/fetchData";
import { getCandidates } from "../../api/recruiters";

const ListOfJobs = ({ jobPostings }) => {
  const [openJobPostingsList, setOpenJobPostingsList] = useState(false);
  const [candidates, setCandidates] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const onClick = async (jobId) => {
    const response = await fetchData(setCandidates, () => getCandidates(jobId));
    console.log(response);
    document.getElementById("my_modal_2").showModal();
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
        Aucune Annonce Postée
      </p>
    );
  } else if (jobPostings.data?.length > 0) {
    content =
      openJobPostingsList &&
      jobPostings.data?.map((job) => (
        <div
          key={job.id}
          className="card w-96 h-72 bg-neutral text-neutral-content md:hidden mb-11"
        >
          <div className="card-body items-center text-center flex gap-3">
            <h2 className="card-title">{job.job_title}</h2>
            <p>{job.work_location}</p>
            <p>{job.description}</p>
            <div className="card-actions justify-end mt-8 flex gap-4">
              <button
                className="btn btn-secondary flex justify-between items-center"
                onClick={() => onClick(job.id)}
              >
                Voir candidats <MdOutlineSupervisorAccount />
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-secondary">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg mb-7">
                    Liste des candidats ayant postulé à cette annonce
                  </h3>
                  {candidates.data?.map((candidate, index) => (
                    <ul key={candidate.user_id}>
                      <li className="text-center">{`${
                        index + 1
                      } - ${candidate.user_id.slice(0, 8)} ${
                        candidate.first_name
                      } ${candidate.last_name}`}</li>
                    </ul>
                  ))}
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
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
          Annonces Postées
          {openJobPostingsList ? (
            <AiFillCaretUp className="text-2xl" />
          ) : (
            <AiOutlineCaretDown className="text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center flex-wrap md:hidden">
        {content}
      </div>
    </>
  );
};

export default ListOfJobs;
