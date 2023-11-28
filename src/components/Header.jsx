import { Box, Divider, Typography } from "@mui/material"
import React from "react"

const Header = ({ title, actions }) => {
  return (
    <Box>
      <Box className="flex flex-col sm:flex-row items-center justify-between">
        <Typography
          color="text.secondary"
          className="text-4xl sm:text-6xl font-extrabold"
        >
          {title}
        </Typography>
        <Box className="flex flex-row items-center gap-2">{actions}</Box>
      </Box>
      <Divider
        color="text.secondary"
        className="border-[1px] border-black/75 rounded-xl mt-10"
      />
    </Box>
  )
}

export default Header
