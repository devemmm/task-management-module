import { Avatar, Box, Divider, Paper } from "@mui/material"
import React from "react"
import DetailsHeader from "../../components/DetailsHeader"
import { useSelector } from "react-redux"
import { selectUserById } from "../../store/reducers/users.reducer"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import { ItemDetail } from "../profile/ProfilePage"
import formatDate from "../../utils/formatDate"
import CustomTable from "../../components/table/CustomTable"
import { projectRows } from "../projects/ProjectsPage"
import { tasksRows } from "../tasks/TasksPage"

const UserDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => selectUserById(state, id))

  if (!user) {
    return <Loading />
  }

  const { status, username, Projects, Tasks } = user

  return (
    <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
      <DetailsHeader {...{ status, to: "/dashboard/users", title: username }} />

      <Box className="w-full max-w-6xl flex flex-col mt-8 p-14 mx-auto">
        <Box className="w-full flex flex-row items-center justify-center gap-36">
          <Avatar
            src={user?.avatar}
            alt="avatar"
            className="aspect-square w-[150px] h-[150px] -mb-[100px]"
          >
            {user?.fname[0] || "A"}
          </Avatar>
        </Box>
        <Paper
          className="p-68 pt-[140px] pb-[40px] flex flex-col sm:flex-row justify-evenly"
          elevation={0}
        >
          <Box className="w-full">
            <Box className="w-max flex flex-col gap-2 sm:mx-auto">
              <ItemDetail title="First Name" value={user.fname} />
              <ItemDetail title="Last Name" value={user.lname} />
              <ItemDetail title="User Name" value={user.username} />
              <ItemDetail title="Role" value={user.role} />
              <ItemDetail title="Phone Number" value={user.phone} />
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            orientation="vertical"
            className="hidden sm:block sm:border-1"
          />
          <Box className="w-full">
            <Box className="w-max flex flex-col gap-2 sm:mx-auto">
              <ItemDetail title="Email" value={user.email} />
              <ItemDetail title="Country" value={user.country} />
              <ItemDetail title="Address" value={user.location} />
              <ItemDetail
                title="Created On"
                value={formatDate(user.createdAt) || "---"}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      <CustomTable
        className="mt-16"
        title="User's Projects"
        data={Projects}
        handleClick={(n) => navigate(`/dashboard/projects/${n.id}`)}
        rows={
          Projects?.length > 0
            ? projectRows.filter((row) => !["actions"].includes(row.id))
            : null
        }
      />

      <CustomTable
        className="mt-16"
        title="User's Tasks"
        name="users"
        data={Tasks}
        handleClick={(n) => navigate(`/dashboard/tasks/${n.id}`)}
        rows={
          Tasks.length > 0
            ? tasksRows.filter(
                (row) => !["Project", "actions"].includes(row.id)
              )
            : null
        }
      />
    </Box>
  )
}

export default UserDetailsPage
