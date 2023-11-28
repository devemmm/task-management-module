import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from "@mui/material"
import React, { useState } from "react"
import { selectUser } from "../../store/reducers/auth.reducer"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

const UserMenu = () => {
  const [userMenu, setUserMenu] = useState(null)
  const user = useSelector(selectUser)

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget)
  }

  const userMenuClose = () => {
    setUserMenu(null)
  }

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user?.fname} {user?.lname}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="text.secondary"
          >
            {user?.role.toString()}
            {(!user?.role ||
              (Array.isArray(user?.role) && user?.role.length === 0)) &&
              "Guest"}
          </Typography>
        </div>

        {user?.avatar ? (
          <Avatar className="md:mx-4" alt="user photo" src={user?.avatar} />
        ) : (
          <Avatar className="md:mx-4">{user?.fname[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: "py-8"
        }}
      >
        <MenuItem
          component={Link}
          to="/dashboard/profile"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <AccountCircleOutlinedIcon size="20" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/logout"
          onClick={() => {
            userMenuClose()
          }}
        >
          <ListItemIcon className="min-w-40">
            <LogoutOutlinedIcon size="20" />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Popover>
    </>
  )
}

export default UserMenu
