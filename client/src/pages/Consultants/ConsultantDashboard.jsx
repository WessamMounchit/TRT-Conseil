import ListOfApplications from "../../components/Consultants/ListOfApplications";
import ListOfCandidates from "../../components/Consultants/ListOfCandidates";
import ListOfJobs from "../../components/Consultants/ListOfJobs";
import ListOfRecruiters from "../../components/Consultants/ListOfRecruiters";

const ConsultantDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 md:gap-20 mt-24">
      <h1 className="font-semibold text-center text-lg mb-6 md:mb-0 md:text-2xl mx-2">Bienvenue dans le dashboard du consultant :</h1>
      <ListOfCandidates />
      <ListOfRecruiters />
      <ListOfJobs />
      <ListOfApplications />
    </div>
  );
};

export default ConsultantDashboard;
