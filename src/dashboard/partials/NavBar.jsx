import { ThemeProvider } from "@emotion/react"
import GroupIcon from "@mui/icons-material/Group"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import ReorderIcon from "@mui/icons-material/Reorder"
import {
  Avatar,
  Divider,
  Hidden,
  IconButton,
  List,
  Stack,
  SwipeableDrawer,
  Typography,
  styled
} from "@mui/material"
import clsx from "clsx"
import React, { memo } from "react"
import { darkTheme } from "../../theme"
import NavBarItem from "./NavBarItem"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/reducers/auth.reducer"

const navbarWidth = 280

const StyledNavBar = styled("div")(({ theme, open, position }) => ({
  minWidth: navbarWidth,
  width: navbarWidth,
  maxWidth: navbarWidth,
  background: theme.palette.background.paper,

  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(position === "left" && {
      marginLeft: `-${navbarWidth}px`
    }),
    ...(position === "right" && {
      marginRight: `-${navbarWidth}px`
    })
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))
const StyledList = styled(List)(({ theme }) => ({
  padding: 4,

  "& .fuse-list-item": {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)"
    },
    "&:focus:not(.active)": {
      backgroundColor: "rgba(255, 255, 255, 0.06)"
    },
    padding: "8px 12px 8px 12px",
    height: 40,
    minHeight: 40,
    "& .fuse-list-item-text": {
      padding: "0 0 0 8px"
    }
  }
}))

const StyledNavBarMobile = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth
  }
}))

const NavBar = ({ open, setOpen }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Hidden mdDown>
        <StyledNavBar
          className="flex-col flex-auto sticky top-0 overflow-hidden h-screen shrink-0 z-20 shadow-5"
          open={open}
          position="left"
        >
          <NavBarContent {...{ setOpen, open }} />
        </StyledNavBar>
      </Hidden>

      <Hidden mdUp>
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full"
          }}
          anchor="left"
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <NavBarContent {...{ setOpen, open }} />
        </StyledNavBarMobile>
      </Hidden>
    </ThemeProvider>
  )
}

const NavBarContent = ({ setOpen, open }) => {
  const user = useSelector(selectUser)

  return (
    <Stack className="flex flex-auto flex-col overflow-y-auto h-full">
      <div className="flex flex-row items-center shrink-0 h-48 md:h-72 px-20">
        <IconButton
          className="w-40 h-40 p-0"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen((open) => !open)
          }}
        >
          <ReorderIcon size={20} color="action" />
        </IconButton>
      </div>

      <Stack className="flex flex-1 flex-col min-h-0">
        <Stack className="user relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
          <div className="flex items-center justify-center mb-24">
            <Avatar
              sx={{
                backgroundColor: "background.paper",
                color: "text.secondary"
              }}
              className="avatar text-32 font-bold w-96 h-96 border-[0.5px] border-white"
              src={user?.avatar}
              alt="avatar"
            >
              {user?.fname[0] || "A"}
            </Avatar>
          </div>
          <Typography className="username text-14 whitespace-nowrap font-medium text-white">
            {user?.username}
          </Typography>
          <Typography
            className="email text-13 whitespace-nowrap font-medium"
            color="text.secondary"
          >
            {user?.email}
          </Typography>
        </Stack>

        <StyledList
          className={clsx(
            "navigation whitespace-nowrap px-12 py-12 h-full flex flex-col"
          )}
        >
          <NavBarItem
            item={{
              url: "/dashboard/projects",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2Zm-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1Zm-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z"
                  />
                </svg>
              ),
              title: "Projects"
            }}
          />
          <NavBarItem
            item={{
              url: "/dashboard/tasks",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.75 2.001a2.25 2.25 0 0 1 2.245 2.096L20 4.25v10.128c-.12.08-.235.174-.341.28l-3.409 3.408l-.908-.91a2.242 2.242 0 0 0-1.5-.657h2.408a.75.75 0 1 0 0-1.5h-5.004a.75.75 0 0 0 0 1.5h2.413a2.25 2.25 0 0 0-1.5 3.838L13.817 22H6.25a2.25 2.25 0 0 1-2.245-2.096L4 19.75V4.251a2.25 2.25 0 0 1 2.096-2.245l.154-.005h11.5ZM9 7.751a1 1 0 1 0-2 0a1 1 0 0 0 2 0ZM11.246 7a.75.75 0 0 0 0 1.5h5.004a.75.75 0 1 0 0-1.5h-5.004Zm-.75 4.75c0 .414.336.75.75.75h5.004a.75.75 0 1 0 0-1.5h-5.004a.75.75 0 0 0-.75.75ZM9 11.75a1 1 0 1 0-2 0a1 1 0 0 0 2 0Zm0 3.998a1 1 0 1 0-2 0a1 1 0 0 0 2 0Zm7.25 4.441l4.47-4.47a.75.75 0 1 1 1.06 1.061l-5 5a.75.75 0 0 1-1.06 0l-2.5-2.501a.75.75 0 0 1 1.06-1.06l1.97 1.97Z"
                  />
                </svg>
              ),
              title: "Tasks"
            }}
          />

          <Divider variant="fullWidth" className=" bg-white mt-auto mb-8" />
          <NavBarItem
            item={{
              url: "/dashboard/profile",
              icon: <PersonIcon size="20" />,
              title: "profile"
            }}
          />
          <NavBarItem
            item={{
              url: "/logout",
              icon: <LogoutIcon size="20" />,
              title: "Sign out",
              className: "self-end"
            }}
          />
        </StyledList>
      </Stack>
    </Stack>
  )
}

export default memo(NavBar)
