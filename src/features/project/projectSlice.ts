import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Unsubscribe } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Dispatch } from "react";
import { RootState } from "../../app/store";
import { db } from "../../config/fbConfig";

export interface projectState {
  value: {
    id?: string;
    title: string;
    content: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  }[];
  status: "idle" | "loading" | "failed";
}

export interface CreateProjectInit {
  id: string;
  title: string;
  content: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const initialState: projectState = {
  value: [],
  status: "idle",
};

const colRef = collection(db, "projects");

export const loadProjects = createAsyncThunk(
  "project/loadProjects",
  async (dispatch: Dispatch<Object>) => {
    // get collection data
    let project: CreateProjectInit[] = [];
    let q = query(colRef, orderBy("createdAt", "desc"));
    await getDocs(q).then((snapshot: any) => {
      snapshot.docs.forEach((doc: any) => {
        project.push({
          ...doc.data(),
          id: doc.id,
          createdAt:
            doc._document.data.value.mapValue.fields.createdAt.timestampValue,
        });
      });
    });
    dispatch(addProject(project));
    // onSnapshot(q, (snapshot) => {
    //   snapshot.docs.forEach((doc: any) => {
    //     project.push({
    //       ...doc.data(),
    //       id: doc.id,
    //       createdAt:
    //         doc._document.data.value.mapValue.fields.createdAt.timestampValue,
    //     });
    //   });
    //   dispatch(addProject(project));
    // });
  }
);

export const loadProject = createAsyncThunk(
  "project/loadProject",
  async (data: { id: string; dispatch: Dispatch<Object> }) => {
    // get collection data
    const docRef = doc(db, "projects", data.id);
    const response: any = await getDoc(docRef);
    return {
      ...response.data(),
      createdAt:
        response._document.data.value.mapValue.fields.createdAt.timestampValue,
    };
  }
);

export const createNewProject = createAsyncThunk(
  "project/createProject",
  async (data: CreateProjectInit) => {
    const id = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
    }).then(async (i) => {
      const colRefUpdate = doc(db, "projects", i.id);
      await updateDoc(colRefUpdate, { id: i.id }).then(async () => {});
      return i.id;
    });
    const colRefUpdate = doc(db, "projects", id);
    const response: any = await getDoc(colRefUpdate);
    return {
      ...response.data(),
      createdAt:
        response._document.data.value.mapValue.fields.createdAt.timestampValue,
    };
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (data: { id: string }) => {
    const colRefDelete = doc(db, "projects", data.id);
    await deleteDoc(colRefDelete);
    return data.id;
  }
);

export const projectReducer = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<CreateProjectInit[]>) => {
      state.value.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.value.unshift({
          id: action.payload.id,
          title: action.payload.title,
          content: action.payload.content,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          createdAt: action.payload.createdAt,
        });
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const id = state.value.findIndex((i) => i.id === action.payload);
        state.value.splice(id, 1);
      });
  },
});

export const { addProject } = projectReducer.actions;

export const selectProjects = (state: RootState) => state.project.value;

export default projectReducer.reducer;
