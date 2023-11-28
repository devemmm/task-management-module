import { Box } from "@mui/material"
import React, { memo } from "react"
import countries from "../utils/countries"
import clsx from "clsx"

const CountryFlag = ({
  country,
  className = "",
  backgroundSize = "24px 3876px"
}) => {
  return (
    <Box
      component="span"
      className={clsx("w-24 h-16 overflow-hidden", className)}
      sx={{
        background: "url('/images/flags.png') no-repeat 0 0",
        backgroundSize,
        backgroundPosition: countries.find((item) => item.name === country)
          ?.flagImagePos
      }}
    />
  )
}

export default memo(CountryFlag)
