import { useTheme } from "@emotion/react"
import { AppBar, Hidden, IconButton, Toolbar } from "@mui/material"
import clsx from "clsx"
import React, { memo } from "react"
import ReorderIcon from "@mui/icons-material/Reorder"
import UserMenu from "./UserMenu"

const ToolBar = ({ openNavBar, handleToggleNavBar }) => {
  const toolbarTheme = useTheme()
  return (
    <AppBar
      id="fuse-toolbar"
      className={clsx("flex relative z-20 shadow-md", "sticky top-0")}
      color="default"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? toolbarTheme.palette.background.paper
            : toolbarTheme.palette.background.default
      }}
      position="static"
    >
      <Toolbar className="p-0 min-h-48 md:min-h-64">
        <div className="flex flex-1 px-16">
          <>
            <Hidden mdDown>
              {!openNavBar && (
                <IconButton onClick={handleToggleNavBar}>
                  <ReorderIcon size={20} />
                </IconButton>
              )}
            </Hidden>

            <Hidden mdUp>
              <IconButton onClick={handleToggleNavBar}>
                <ReorderIcon size={20} />
              </IconButton>
            </Hidden>
          </>
        </div>

        <div className="flex items-center px-8 h-full overflow-x-auto">
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default memo(ToolBar)
