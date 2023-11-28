import { yupResolver } from "@hookform/resolvers/yup"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { addDays } from "date-fns"
import React, { memo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import {
  createProject,
  getAllProjects
} from "../../../store/reducers/projects.reducer"
import DescriptionTextField from "../../../components/DescriptionTextField"

const schema = yup.object().shape({
  name: yup.string().required("You must enter the project name"),
  description: yup.string().required("You must enter the project description"),
  start_date: yup
    .date()
    .min(new Date(), "Start Date can't be before now")
    .required("You must enter the project Start Date"),
  end_date: yup
    .date()
    .min(yup.ref("start_date"), "End Date can't be before Start Date")
    .required("You must enter the project End Date")
})

const defaultValues = {
  name: "",
  description: "",
  start_date: new Date(),
  end_date: new Date(addDays(new Date(), 1))
}

const ProjectCreateModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    !loading && navigate("/dashboard/projects")
  }

  const onSubmit = (form) => {
    setLoading(true)
    dispatch(createProject(form)).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
        setLoading(false)
      } else {
        toast.success("Project created Successfully!")

        dispatch(getAllProjects()).then(({ error, payload }) => {
          if (error) {
            toast.error(error.message)
          }
          setLoading(false)
          handleClose()
        })
      }
    })
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
            Create Project
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
          <Grid columnSpacing={2} container>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Project Name"
                    autoFocus
                    type="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <div className="mb-24 w-full">
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="outlined"
                      error={!!errors.start_date}
                      disablePast
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          onKeyDownCapture: (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }
                      }}
                      fullWidth
                    />
                    {!!errors.start_date && (
                      <Typography color="error" className="ml-14 mt-4 text-12">
                        {errors?.start_date?.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <div className="mb-24 w-full">
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="outlined"
                      error={!!errors.end_date}
                      minDate={new Date(watch("start_date"))}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          onKeyDownCapture: (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }
                      }}
                      fullWidth
                    />
                    {!!errors.end_date && (
                      <Typography color="error" className="ml-14 mt-4 text-12">
                        {errors?.end_date?.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <DescriptionTextField
                    className="mb-24"
                    inputProps={{ ...field }}
                    errors={errors}
                  />
                )}
              />
            </Grid>
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

export default memo(ProjectCreateModal)
