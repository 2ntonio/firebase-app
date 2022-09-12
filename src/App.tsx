import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "materialize-css/dist/css/materialize.min.css";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadProjects } from "./features/project/projectSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/fbConfig";
import { getUserStatus, loadUser } from "./features/project/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);
  const [userAuth, setUserAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loadUser({ id: user.uid })).then((action) => {
          setUserInfo(action.payload);
        });
        setUserAuth(true);
      } else {
        dispatch(loadUser({ id: "none" }))
        setUserAuth(false);
      }
    });
  }, [auth]);

  useEffect(() => {
    dispatch(loadProjects(dispatch));
  }, [dispatch]);

  let contentData;
  if (userStatus === "idle") {
    contentData = <div className="center padding-10">Loading!</div>;
  }
  if (userStatus === "succeeded") {
    contentData = (
      <Routes>
        <Route
          path="/"
          element={!userAuth ? <Navigate to="/signin" /> : <Dashboard />}
        ></Route>
        <Route
          path="/project/:id"
          element={!userAuth ? <Navigate to="/signin" /> : <ProjectDetails />}
        ></Route>
        <Route
          path="/create"
          element={!userAuth ? <Navigate to="/signin" /> : <CreateProject data={userInfo}/>}
        ></Route>

        <Route
          path="/signin"
          element={!userAuth ? <SignIn /> : <Dashboard />}
        ></Route>
        <Route
          path="/signup"
          element={!userAuth ? <SignUp /> : <Dashboard />}
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar auth={userAuth} data={userInfo} />
      </div>
      {contentData}
    </BrowserRouter>
  );
}

export default App;
