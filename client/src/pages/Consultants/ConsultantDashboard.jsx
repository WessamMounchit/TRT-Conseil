import ListOfApplications from "./ListOfApplications";
import ListOfCandidates from "./ListOfCandidates";
import ListOfJobs from "./ListOfJobs";
import ListOfRecruiters from "./ListOfRecruiters";

const ConsultantDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-40">
      <h1 className="font-semibold text-2xl">Bienvenue dans le dashboard du consultant :</h1>
      <ListOfCandidates />
      <ListOfRecruiters />
      <ListOfJobs />
      <ListOfApplications />
    </div>
  );
};

export default ConsultantDashboard;
