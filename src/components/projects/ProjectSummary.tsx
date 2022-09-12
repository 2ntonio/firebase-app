import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { deleteProject } from "../../features/project/projectSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface ProjectData {
  data: {
    id?: string;
    title: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
}
const ProjectSummary: FC<ProjectData> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleDeleteProject = () => {
    dispatch(deleteProject({ id: data.id! }));
  };

  const handleOnClick = () => {
    navigate(`/project/${data.id}`)
  }

  return (
    <div className="card z-depth-0 project-summary grey lighten-2">
      <div
        className="card-content grey-text text-darken-3"
        onClick={handleOnClick}
      >
        <span className="card-title">{data.title}</span>
        <p>
          Posted by {data.firstName} {data.lastName}
          
        </p>
        <p className="grey-text">{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
