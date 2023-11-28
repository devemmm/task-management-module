import EditIcon from "@mui/icons-material/Edit"
import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material"
import { capitalize } from "lodash"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import { selectUser } from "../../store/reducers/auth.reducer"
import formatDate from "../../utils/formatDate"
import EditProfileModal from "./partials/EditProfileModal"
import EditPasswordProfileModal from "./partials/EditPasswordProfileModal"

const ProfilePage = () => {
  const user = useSelector(selectUser)
  const location = useLocation()
  const [editModalOpen, setEditModalOpen] = useState(null)

  useEffect(() => {
    if (location.pathname === "/dashboard/profile/edit") {
      setEditModalOpen("edit")
    } else if (location.pathname === "/dashboard/profile/edit_password") {
      setEditModalOpen("edit_password")
    } else {
      setEditModalOpen(null)
    }
  }, [location.pathname])

  if (!user) {
    return <Loading />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header
          title="Profile"
          actions={[
            <Button
              LinkComponent={Link}
              to="/dashboard/profile/edit"
              variant="contained"
              color="secondary"
              key={1}
            >
              {/* <EditIcon className="w-20" /> */}
              <Typography className="ml-4">Edit Profile</Typography>
            </Button>,
            <Button
              LinkComponent={Link}
              to="/dashboard/profile/edit_password"
              variant="contained"
              color="secondary"
              key={2}
            >
              {/* <EditIcon className="w-20" /> */}
              <Typography className="ml-4">Edit Password</Typography>
            </Button>
          ]}
        />
        <Box className="w-full h-full max-w-6xl flex flex-col mt-8 p-14 mx-auto">
          <Box className="w-full flex flex-row items-center justify-center gap-36">
            <Avatar
              src={user.avatar}
              className="aspect-square w-[150px] h-[150px] -mb-[100px]"
            >
              {user.fname[0] || "A"}
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
      </Box>
      {editModalOpen === "edit" && <EditProfileModal />}
      {editModalOpen === "edit_password" && <EditPasswordProfileModal />}
    </>
  )
}

export const ItemDetail = ({ title, value }) => {
  return (
    <Box className="flex flex-col gap-0">
      <Typography className="font-bold text-lg">{capitalize(title)}</Typography>
      <Typography className="font-light">{capitalize(value)}</Typography>
    </Box>
  )
}

export default ProfilePage
