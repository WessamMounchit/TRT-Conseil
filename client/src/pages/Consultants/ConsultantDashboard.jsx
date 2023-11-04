import ListOfApplications from "./ListOfApplications";
import ListOfCandidates from "./ListOfCandidates";
import ListOfJobs from "./ListOfJobs";
import ListOfRecruiters from "./ListOfRecruiters";

const ConsultantDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-40 md:mt-0">
      <h1 className="font-semibold text-2xl mb-6">Bienvenue dans le dashboard du Consultant :</h1>
      <ListOfCandidates />
      <ListOfRecruiters />
      <ListOfJobs />
      <ListOfApplications />
    </div>
  );
};

export default ConsultantDashboard;
