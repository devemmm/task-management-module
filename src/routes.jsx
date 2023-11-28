import { Navigate, createBrowserRouter } from "react-router-dom"
import authRoutes from "./auth/auth.routes"
import dashboardRoutes from "./dashboard/dashboard.routes"

const router = createBrowserRouter([
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "*",
    element: <Navigate to="/login" />
  }
])

export default router
