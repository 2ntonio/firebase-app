import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { RootState } from "../../app/store";
import { auth, db } from "../../config/fbConfig";

export interface projectState {
  value: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  error: string | undefined;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: projectState = {
  value: {
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  },
  error: "",
  status: "idle",
};

export const createNewUser = createAsyncThunk(
  "user/signup",
  async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (cred) => {
        const colRef = doc(db, "users", `${cred.user.uid}`);
        await setDoc(colRef, {
          initials: data.firstName[0] + data.lastName[0],
          firstName: data.firstName,
          lastName: data.lastName,
        });
      })
      .catch((err) => {
        throw Error(err.message);
      });
  }
);

export const loginUser = createAsyncThunk(
  "user/signin",
  async (data: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((cred) => {
        console.log("User signed in: ", cred);
      })
      .catch((err) => {
        throw Error(err.message);
      });
  }
);

export const loadUser = createAsyncThunk(
  "user/load",
  async (data: { id: string }) => {
    if(data.id === "false"){
      throw Error("User not logged in")
    }
    // get collection data
    const docRef = doc(db, "users", data.id);
    const response: any = await getDoc(docRef);
    return response.data();
  }
);

export const userReducer = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUser.fulfilled, (state) => {
        state.status = "succeeded";
      }).addCase(loadUser.rejected, (state) => {
        state.status = "succeeded"
      })
  },
});

export const {} = userReducer.actions;

export const catchErrors = (state: RootState) => state.user.error;
export const getUserStatus = (state: RootState) => state.user.status;

export default userReducer.reducer;
