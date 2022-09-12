import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { auth } from "../../config/fbConfig";
import { catchErrors, loginUser } from "../../features/project/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  
  const authError = useAppSelector(catchErrors)

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({email, password}))
  };
  return (
    <div className="container">
      <form className="white" onSubmit={handleOnSubmit}>
        <h5 className="grey-text text-darker-3">Sign In</h5>
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
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="red-text center">
            {authError !== "" && <p>{authError}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
