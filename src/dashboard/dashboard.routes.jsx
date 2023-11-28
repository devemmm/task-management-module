import { Navigate, Outlet } from "react-router-dom"
import DashBoard from "./DashBoard"
import ProfilePage from "./profile/ProfilePage"
import ProjectDetailsPage from "./projects/ProjectDetailsPage"
import ProjectsPage from "./projects/ProjectsPage"
import TaskDetailsPage from "./tasks/TaskDetailsPage"
import TasksPage from "./tasks/TasksPage"

const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "",
        element: <Navigate to="projects" />
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        children: [
          {
            path: ":id",
            element: <ProjectDetailsPage />
          },
          {
            path: "create",
            element: <Outlet />
          },
          {
            path: "edit",
            element: <Outlet />
          },
          {
            path: "delete",
            element: <Outlet />
          }
        ]
      },
      {
        path: "tasks",
        element: <TasksPage />,
        children: [
          {
            path: ":id",
            element: <TaskDetailsPage />
          },
          {
            path: "create",
            element: <Outlet />
          },
          {
            path: "edit",
            element: <Outlet />
          },
          {
            path: "delete",
            element: <Outlet />
          }
        ]
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            path: "edit",
            element: <Outlet />
          },
          {
            path: "edit_password",
            element: <Outlet />
          }
        ]
      }
    ]
  }
]

export default dashboardRoutes
