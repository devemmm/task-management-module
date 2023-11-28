import { Stack } from "@mui/material"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import useThemeMediaQuery from "../hooks/useThemeMediaQuery"
import NavBar from "./partials/NavBar"
import ToolBar from "./partials/ToolBar"
import { setUser } from "../store/reducers/auth.reducer"
import { useDispatch } from "react-redux"
import { getAllProjects } from "../store/reducers/projects.reducer"
import { getAllTasks } from "../store/reducers/tasks.reducer"
import { getAllUsers } from "../store/reducers/users.reducer"

const DashBoard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("md"))
  const [openNavBar, setOpenNavBar] = useState(isMobile ? false : true)
  const token = localStorage.getItem("token")

  const handleToggleNavBar = useCallback(() => {
    setOpenNavBar(!openNavBar)
  }, [openNavBar])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch(setUser(user))

    dispatch(getAllProjects())
    dispatch(getAllTasks())
    dispatch(getAllUsers())
  }, [])

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <>
      <Stack className="w-full h-full">
        <div className="flex flex-auto min-w-0">
          <NavBar open={openNavBar} setOpen={setOpenNavBar} />

          <main className="flex flex-col flex-auto min-h-full min-w-0 relative z-10">
            <ToolBar
              {...{ openNavBar, handleToggleNavBar }}
              className="sticky top-0"
            />

            <div className="flex flex-col flex-auto min-h-0 relative z-10">
              <Outlet />
            </div>
          </main>
        </div>
      </Stack>
    </>
  )
}

export default DashBoard
