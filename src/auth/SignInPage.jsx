import { yupResolver } from "@hookform/resolvers/yup"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { authLogin } from "../store/reducers/auth.reducer"
import GuardAuthRoot from "./GuardAuthRoot"
import { useState } from "react"

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "invalid email address"
    )
    .required("You must enter a email"),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password.")
})

const defaultValues = {
  email: "",
  password: ""
}

function SignInPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema)
  })

  function onSubmit({ email, password }) {
    setLoading(true)
    dispatch(authLogin({ email, password })).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
      } else {
        localStorage.setItem("token", payload.token)
        localStorage.setItem("user", JSON.stringify(payload))
        navigate("dashboard")
      }
      setLoading(false)
    })
  }

  return (
    <GuardAuthRoot>
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0 h-full">
        <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 overflow-auto">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
              Sign in
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>Don&apos;t have an account?</Typography>
              <Link className="ml-4" to="/register">
                Sign up
              </Link>
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-16"
                aria-label="Sign in"
                disabled={loading}
                type="submit"
                size="large"
              >
                Sign in
              </Button>
            </form>
          </div>
        </Paper>

        <Stack
          className="relative hidden md:flex flex-auto items-center justify-center p-64 lg:px-112 h-full min-h-max overflow-hidden"
          sx={{ backgroundColor: "primary.main" }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Stack
              component="g"
              sx={{ color: "primary.light" }}
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </Stack>
          </svg>
          <Stack
            component="svg"
            className="absolute -top-64 -right-64 opacity-20"
            sx={{ color: "primary.light" }}
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="220"
              height="192"
              fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
            />
          </Stack>

          <div className="z-10 relative w-full max-w-2xl">
            <div className="text-7xl font-bold leading-none text-gray-100">
              <div>Welcome to</div>
              <div>QT Global Software Ltd community</div>
            </div>
            <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
              welcome back task management module where you will able to create
              a project, manage create, update, deletetask and assign the task
              to the regisered user as well. Join us today and start managing
              the Company and personal project.
            </div>
          </div>
        </Stack>
      </div>
    </GuardAuthRoot>
  )
}

export default SignInPage
