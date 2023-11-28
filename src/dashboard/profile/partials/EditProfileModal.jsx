import { yupResolver } from "@hookform/resolvers/yup"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import React, { memo, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import CountryFlag from "../../../components/CountryFlag"
import {
  selectUser,
  updateAuthUser
} from "../../../store/reducers/auth.reducer"
import { selectUserByUserName } from "../../../store/reducers/users.reducer"
import countries from "../../../utils/countries"
import handleReadFileAsync from "../../../utils/handleReadFileAsync"

const schema = yup.object().shape({
  fname: yup.string(),
  lname: yup.string(),
  phone: yup.string(),
  country: yup.string(),
  location: yup.string()
})

const defaultValues = {
  fname: "",
  lname: "",
  phone: "",
  country: "Rwanda",
  location: ""
}

const EditProfileModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const user = useSelector(selectUser)
  const userWithId = useSelector((state) =>
    selectUserByUserName(state, user.username)
  )
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    !loading && navigate("/dashboard/profile")
  }

  function onSubmit(form) {
    const id = userWithId?.id

    if (!id) return

    const formData = form
    delete formData.avatar

    if (image?.file) {
      formData.avatar = image.file
    }

    setLoading(true)
    dispatch(updateAuthUser({ data: formData, id })).then(
      ({ error, payload }) => {
        if (error) {
          toast.error(error.message)
        } else {
          toast.success("Updated profile successfully")
        }
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (user) {
      Object.keys(defaultValues).map((key) => {
        setValue(key, user[key], { shouldDirty: true, shouldTouch: true })
      })
    }
  }, [user])

  if (!user) {
    return
  }

  return (
    <Modal
      className="flex flex-col items-center w-full h-full p-16 overflow-auto"
      open={true}
      onClose={handleClose}
    >
      <Paper className="w-full max-w-3xl h-max py-16 px-20">
        <Stack
          direction="row"
          gap={2}
          className="w-full items-center justify-between"
        >
          <Typography color="text.secondary" className="text-4xl font-bold">
            Edit Profile
          </Typography>

          <IconButton onClick={handleClose} className="w-40 h-40">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <form
          name="editProfileForm"
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

          <Grid columnSpacing={2} container>
            <GridItem>
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
            </GridItem>
            <GridItem>
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
            </GridItem>
            <GridItem>
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
            </GridItem>
            <GridItem>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <FormControl required fullWidth>
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
            </GridItem>
            <GridItem>
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
            </GridItem>
          </Grid>

          <Stack
            direction="row"
            gap={2}
            className="items-center justify-between"
          >
            <Button
              role="button"
              variant="contained"
              color="primary"
              disabled={loading}
              type="reset"
              size="medium"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              role="button"
              variant="contained"
              color="secondary"
              disabled={loading}
              type="submit"
              size="medium"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  )
}

const GridItem = ({ children }) => {
  return (
    <Grid item xs={12} sm={6}>
      {children}
    </Grid>
  )
}

export default memo(EditProfileModal)
