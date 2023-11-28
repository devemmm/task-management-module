import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"
import { Box, Button, Divider, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import StatusDot from "./StatusDot"

const DetailsHeader = ({ title, actions, status, to }) => {
  const navigate = useNavigate()

  return (
    <Box>
      <Box className="flex flex-row items-center justify-between">
        <Box className="flex flex-row items-center gap-4 ">
          <Button
            variant="text"
            onClick={() => navigate(to || -1)}
            color="secondary"
          >
            <ArrowBackIosRoundedIcon fontSize="10" className="w-20" />
            <Typography>back</Typography>
          </Button>

          <Typography color="text.secondary" className="text-2xl font-bold">
            {title}
            <span>{<StatusDot {...{ status }} />}</span>
          </Typography>
        </Box>

        <Box className="flex flex-row items-center gap-2 mb-10">{actions}</Box>
      </Box>

      <Divider
        color="text.secondary"
        className="border-[1px] border-black/75 rounded-xl"
      />
    </Box>
  )
}

export default DetailsHeader
