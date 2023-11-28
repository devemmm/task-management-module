import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const authRegister = createAsyncThunk("auth/register", async (data) => {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  await catchAxiosError(
    async () => await axiosInstance.post("/user/signup", formData)
  )
})

export const authLogin = createAsyncThunk("auth/login", async (data) => {
  const res = await catchAxiosError(
    async () => await axiosInstance.post("/user/signin", data)
  )
  return res.data.data.user
})

export const updateAuthUser = createAsyncThunk(
  "auth/updateUser",
  async ({ data, id }) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key])
      }
    })

    const res = await catchAxiosError(
      async () => await axiosInstance.patch(`/user/${id}`, formData)
    )
    return res.data.data
  }
)

export const updateAuthUserPassword = createAsyncThunk(
  "auth/updateAuthUserPassword",
  async ({ data, id }) => {
    const formData = new FormData()

    console.log(data)

    console.log(data)

    const res = await catchAxiosError(
      async () => await axiosInstance.patch(`/user/changePassword/${id}`, data)
    )

    console.log(res)
  }
)

const initialState = {
  user: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(updateAuthUser.fulfilled, (state, action) => {
      state.user = action.payload
      const oldUser = localStorage.getItem("user")
      const parsedOldUser = oldUser ? JSON.parse(oldUser) : {}
      localStorage.setItem(
        "user",
        JSON.stringify({ ...parsedOldUser, ...action.payload })
      )
    })
  }
})

export const { setUser } = authSlice.actions

export const selectUser = ({ auth }) => auth.user

const authReducer = authSlice.reducer
export default authReducer
