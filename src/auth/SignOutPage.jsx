import { Button } from "@mui/material"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Link, Navigate } from "react-router-dom"

function SignOutPage() {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-360 sm:w-320 mx-auto sm:mx-0 flex flex-col gap-4">
          <Typography className="text-4xl font-extrabold tracking-tight leading-tight">
            About to be signed out!
          </Typography>

          <Typography>Do you really want to Sign Out?</Typography>

          <Button
            LinkComponent={Link}
            to="/login"
            variant="contained"
            color="secondary"
            className="mt-8"
            onClick={() => {
              localStorage.removeItem("token")
            }}
            fullWidth
          >
            Sign Out
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default SignOutPage
