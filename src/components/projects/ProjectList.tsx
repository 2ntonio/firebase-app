import { FC } from "react";
import ProjectSummary from "./ProjectSummary";

interface InitProject {
  data: {
    id?: string;
    title: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  }[];
}

const ProjectList: FC<InitProject> = ({ data }) => {

  return (
    <div className="project-list section">
      {data && data.map((data) => (
        <ProjectSummary data={data} key={data.id}/>
      ))}
    </div>
  );
};

export default ProjectList;
