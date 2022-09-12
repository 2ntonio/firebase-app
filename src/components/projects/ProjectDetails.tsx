import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loadProject } from "../../features/project/projectSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();

  useEffect(() => {
    dispatch(loadProject({id: id!, dispatch})).then((action) => {
      setData(action.payload);
    });
  }, [dispatch, id]);

  return (
    <div className="container section project-details">
      {data && (
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{data.title}</span>
            <p>{data.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted By {data.firstName} {data.lastName}
            </div>
            <div>
              {formatDistanceToNow(new Date(data.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
