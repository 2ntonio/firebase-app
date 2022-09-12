import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { catchErrors, createNewUser } from "../../features/project/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const dispatch = useAppDispatch();
  const authError = useAppSelector(catchErrors);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createNewUser({ email, password, firstName, lastName }));
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleOnSubmit}>
        <h5 className="grey-text text-darker-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            value={firstName}
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastName}
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          <div className="red-text center">
            {authError !== "" && <p>{authError}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
