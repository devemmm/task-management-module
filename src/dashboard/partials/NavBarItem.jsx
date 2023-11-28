import { ButtonBase } from "@mui/material"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { alpha, styled } from "@mui/material/styles"
import clsx from "clsx"
import { memo, useMemo } from "react"
import NavLinkAdapter from "../../components/NavLinkAdapter"
import { ThemeProvider } from "@emotion/react"
import { darkTheme } from "../../theme"

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: "100%",
  borderRadius: "6px",
  margin: "0 0 4px 0",
  paddingRight: 16,
  paddingLeft: 80,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: "pointer",
  textDecoration: "none!important",
  "&:hover": {
    color: theme.palette.text.primary
  },
  "&.active": {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, .05)!important"
        : "rgba(255, 255, 255, .1)!important",
    pointerEvents: "none",
    transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
    "& > .fuse-list-item-text-primary": {
      color: "inherit"
    },
    "& > .fuse-list-item-icon": {
      color: "inherit"
    }
  },
  "& >.fuse-list-item-icon": {
    marginRight: 16,
    color: "inherit"
  },
  "& > .fuse-list-item-text": {}
}))

function NavBarItem({ item, onItemClick }) {
  return useMemo(
    () => (
      <ThemeProvider theme={darkTheme}>
        <Root
          button
          component={NavLinkAdapter}
          to={item.url || ""}
          activeClassName={item.url ? "active" : ""}
          className={clsx(
            "fuse-list-item",
            item.active && "active",
            item.className
          )}
          onClick={() => onItemClick && onItemClick(item)}
          end={item.end}
          itempadding={16}
          role="button"
          sx={item.sx}
          disabled={item.disabled}
        >
          {item.icon}

          <ListItemText
            className="fuse-list-item-text"
            primary={item.title}
            classes={{
              primary:
                "text-13 font-medium fuse-list-item-text-primary truncate",
              secondary:
                "text-11 font-medium fuse-list-item-text-secondary leading-normal truncate"
            }}
          />
        </Root>
      </ThemeProvider>
    ),
    [item, onItemClick]
  )
}

export default memo(NavBarItem)
