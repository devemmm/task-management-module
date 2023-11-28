import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import clsx from "clsx"

function Loading({ style = {}, backgroundColor = "palette.secondary.main" }) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center justify-center p-24 w-full h-full"
      )}
    >
      <Typography
        className="text-13 sm:text-20 font-medium -mb-16"
        color="text.secondary"
      >
        Loading
      </Typography>
      <Box
        id="spinner"
        sx={{
          "& > div": {
            backgroundColor
          }
        }}
      >
        <div className="bounce1" style={style} />
        <div className="bounce2" style={style} />
        <div className="bounce3" style={style} />
      </Box>
    </div>
  )
}

export default Loading
