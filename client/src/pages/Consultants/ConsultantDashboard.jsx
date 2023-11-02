import ListOfApplications from "./ListOfApplications";
import ListOfJobs from "./ListOfJobs";
import ListOfUsers from "./ListOfUsers";

const ConsultantDashboard = () => {
  return (
    <div>
      <ListOfUsers />
      <ListOfJobs />
      <ListOfApplications />
    </div>
  );
};

export default ConsultantDashboard;
