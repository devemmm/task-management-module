import { yupResolver } from "@hookform/resolvers/yup"
import {
  Avatar,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from "@mui/material"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import GuardAuthRoot from "./GuardAuthRoot"
import countries from "../utils/countries"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authRegister } from "../store/reducers/auth.reducer"
import { toast } from "react-toastify"
import CountryFlag from "../components/CountryFlag"
import handleReadFileAsync from "../utils/handleReadFileAsync"

const schema = yup.object().shape({
  username: yup.string().required("You must enter your user name"),
  fname: yup.string().required("You must enter your first name"),
  lname: yup.string().required("You must enter your last name"),
  phone: yup.number().required("You must enter your phone number"),
  country: yup.string().required("You must enter your country"),
  location: yup.string().required("You must enter your Address"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "invalid email address"
    )
    .required("You must enter your email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must Contain at least 6 Characters, One Uppercase, One Lowercase and One Number"
    )
    .required("Please enter your password."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must Contain at least 6 Characters, One Uppercase, One Lowercase and One Number"
    )
})

const defaultValues = {
  fname: "",
  lname: "",
  phone: "",
  country: "Rwanda",
  location: "",
  email: "",
  username: "",
  password: "",
  passwordConfirm: ""
}

function SignUpPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { isDirt, isValid, errors },
    handleSubmit,
    watch
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema)
  })

  function onSubmit(form) {
    const formData = form
    delete formData.passwordConfirm
    delete formData.avatar

    if (image) {
      formData.avatar = image.file
    }

    setLoading(true)
    dispatch(authRegister(formData)).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Registered successfully. Redirecting to login shortly!")
        setTimeout(() => {
          navigate("/login")
        }, [3000])
      }
      setLoading(false)
    })
  }

  return (
    <>
      <GuardAuthRoot>
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0 h-full w-full overflow-y-auto">
          <Paper className="h-full sm:h-auto sm:max-h-full max-w-[620px] md:max-w-full md:flex md:items-center md:justify-end w-full md:h-full md:w-1/2 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 overflow-auto">
            <div className="py-8 px-16 sm:p-48 md:p-64 pt-32 w-full max-w-[620px] mx-auto sm:mx-0 max-h-full overflow-y-auto">
              <Typography className="text-4xl font-extrabold tracking-tight leading-tight">
                Sign up
              </Typography>
              <div className="flex items-baseline mt-2 font-medium">
                <Typography>Already have an account?</Typography>
                <Link className="ml-4" to="/login">
                  Sign in
                </Link>
              </div>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full pt-32"
                onSubmit={handleSubmit(onSubmit, (...props) => {
                  console.error(props)
                })}
              >
                <Stack direction="row" gap={1} className="items-center mb-24">
                  <Box className="aspect-square h-[100px]">
                    <Avatar
                      sx={{
                        backgroundColor: "background.default",
                        color: "text.secondary"
                      }}
                      className="object-cover w-full h-full text-64 font-bold"
                      src={image?.url}
                      alt="image url"
                    >
                      {"A"}
                    </Avatar>
                  </Box>
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        onChange={async (e) => {
                          setImage(await handleReadFileAsync(e))
                        }}
                        InputLabelProps={{ shrink: true }}
                        label="Image Url"
                        autoFocus
                        type="file"
                        error={!!errors.avatar}
                        helperText={errors?.avatar?.message}
                        inputProps={{ accept: "image/*" }}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                <Controller
                  name="fname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="First name"
                      autoFocus
                      type="name"
                      error={!!errors.fname}
                      helperText={errors?.fname?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="lname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Last name"
                      autoFocus
                      type="name"
                      error={!!errors.lname}
                      helperText={errors?.lname?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="User name"
                      autoFocus
                      type="name"
                      error={!!errors.username}
                      helperText={errors?.username?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Phone Number"
                      autoFocus
                      type="tel"
                      error={!!errors.phone}
                      helperText={errors?.phone?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl required>
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        {...field}
                        id="country"
                        className="mb-24"
                        label="Country"
                        autoFocus
                        type="text"
                        error={!!errors.country}
                        variant="outlined"
                        required
                        fullWidth
                        startAdornment={
                          countries.find(
                            (country) => country.name === watch("country")
                          ) && (
                            <InputAdornment position="start">
                              <CountryFlag country={watch("country")} />
                            </InputAdornment>
                          )
                        }
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.iso} value={country.name}>
                            <Box
                              component="span"
                              className="w-24 h-16 overflow-hidden"
                              sx={{
                                background:
                                  "url('/images/flags.png') no-repeat 0 0",
                                backgroundSize: "24px 3876px",
                                backgroundPosition: country.flagImagePos
                              }}
                            />
                            <span className="ml-8 font-medium">
                              {country.name}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Address"
                      type="text"
                      error={!!errors.location}
                      helperText={errors?.location?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Email"
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

                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Password (Confirm)"
                      type="password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Button
                  role="button"
                  variant="contained"
                  color="secondary"
                  className="w-full mt-24"
                  aria-label="Register"
                  disabled={loading}
                  type="submit"
                  size="large"
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Paper>

          <Stack
            className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
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
                with this task management module you will able to create a
                project, manage create, update, deletetask and assign the task
                to the regisered user as well. Join us today and start managing
                the Company and personal project.
              </div>
            </div>
          </Stack>
        </div>
      </GuardAuthRoot>
    </>
  )
}

export default SignUpPage
