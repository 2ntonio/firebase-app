import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createNewProject } from "../../features/project/projectSlice";
import { nanoid } from 'nanoid'

const CreateProject: FC<any> = ({data}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      createNewProject({
        id: nanoid(),
        title,
        content,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: ""
      })
    );
    navigate("/");
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleOnSubmit}>
        <h5 className="grey-text text-darker-3">Create New Project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
            className="materialize-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
