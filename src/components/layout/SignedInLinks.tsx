import { signOut } from "firebase/auth";
import { FC } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/fbConfig";

const SignedInLinks: FC<any> = ({data}) => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message)
      });
  };
  return (
    <ul className="right">
      <li>
        <Link to="/create">New Projects</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogOut}>
          Logout
        </Link>
      </li>
      <li>
        <Link to="/" className="btn btn-floating pink lighten-1">
          {data && data.initials}
        </Link>
      </li>
    </ul>
  );
};

export default SignedInLinks;
