import axios from "axios"

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL })

axiosInstance.interceptors.request.use((request) => {
  // Do something before request is sent
  request.headers.authorization = `${"Bearer" + " "}${localStorage.getItem(
    "token"
  )}`
  return request
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return new Promise((resolve, reject) => {
      if (err.response.status === 401) {
        // if you ever get an unauthorized response, logout the user
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
      throw err
    })
  }
)

export default axiosInstance
