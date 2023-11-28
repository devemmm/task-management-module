import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  const res = await catchAxiosError(
    async () => await axiosInstance.get("/task")
  )
  return res.data.data
})

export const createTask = createAsyncThunk("tasks/createTask", async (data) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  const res = await catchAxiosError(
    async () => await axiosInstance.post("/task", formData)
  )
  return res.data.data
})

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ data, id }) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key])
      }
    })

    const res = await catchAxiosError(
      async () => await axiosInstance.patch(`/task/${id}`, formData)
    )
    return res.data.data
  }
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ id }) => {
    const res = await catchAxiosError(
      async () => await axiosInstance.delete(`/task/${id}`)
    )
    return res.data.data
  }
)

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.createdAt < b.createdAt ? 1 : -1)
})

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors(({ tasks }) => tasks)

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({
    selectedTask: null
  }),
  reducers: {
    setSelectedTask: (state, { payload }) => {
      state.selectedTask = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      tasksAdapter.upsertMany(state, payload)
    })
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      tasksAdapter.upsertOne(state, payload)
    })
  }
})

export const selectSelectedTask = ({ tasks }) => tasks.selectedTask

export const { setSelectedTask } = tasksSlice.actions

const tasksReducer = tasksSlice.reducer
export default tasksReducer
