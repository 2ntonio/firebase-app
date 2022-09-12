import { useAppSelector } from "../../app/hooks";
import { selectProjects } from "../../features/project/projectSlice";
import ProjectList from "../projects/ProjectList";
import Notifications from "./Notifications";

const Dashboard = () => {
  const project = useAppSelector(selectProjects);

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ProjectList data={project} />
        </div>
        <div className="col s12 m5 offset-m1">
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
