import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async () => {
    const res = await catchAxiosError(
      async () => await axiosInstance.get("/project")
    )
    return res.data.data
  }
)

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data) => {
    const res = await catchAxiosError(
      async () => await axiosInstance.post("/project", data)
    )
    return res.data.data
  }
)

export const editProject = createAsyncThunk(
  "projects/editProject",
  async ({ data, id }) => {
    const checkedData = {}
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        checkedData[key] = data[key]
      }
    })
    const res = await catchAxiosError(
      async () => await axiosInstance.patch(`/project/${id}`, checkedData)
    )
    return res.data.data
  }
)

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({ id }) => {
    const res = await catchAxiosError(
      async () => await axiosInstance.delete(`/project/${id}`)
    )
    return res.data.data
  }
)

const projectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.createdAt < b.createdAt ? 1 : -1)
})

export const { selectAll: selectAllProjects, selectById: selectProjectById } =
  projectsAdapter.getSelectors(({ projects }) => projects)

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsAdapter.getInitialState({
    selectedProject: null
  }),
  reducers: {
    setSelectedProject: (state, { payload }) => {
      state.selectedProject = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, { payload }) => {
      projectsAdapter.upsertMany(state, payload)
    })
    builder.addCase(editProject.fulfilled, (state, { payload }) => {
      projectsAdapter.upsertOne(state, payload)
    })
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      projectsAdapter.upsertOne(state, payload)
    })
  }
})

export const selectSelectedProject = ({ projects }) => projects.selectedProject

export const { setSelectedProject } = projectsSlice.actions

const projectsReducer = projectsSlice.reducer
export default projectsReducer
