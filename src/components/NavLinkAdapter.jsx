import { forwardRef } from "react"
import { NavLink } from "react-router-dom"

// eslint-disable-next-line react/display-name
const NavLinkAdapter = forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null)
        })}
      />
    )
  }
)

export default NavLinkAdapter
