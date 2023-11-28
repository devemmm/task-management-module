import { yupResolver } from "@hookform/resolvers/yup"
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { addDays } from "date-fns"
import React, { memo, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import DescriptionTextField from "../../../components/DescriptionTextField"
import { selectAllProjects } from "../../../store/reducers/projects.reducer"
import { selectAllUsers } from "../../../store/reducers/users.reducer"
import {
  editTask,
  getAllTasks,
  selectSelectedTask
} from "../../../store/reducers/tasks.reducer"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  start_date: yup.date(),
  end_date: yup
    .date()
    .min(yup.ref("start_date"), "End Date can't be before Start Date"),
  project_id: yup.string(),
  users: yup.array(),
  priority: yup.string()
})

const defaultValues = {
  name: "",
  description: "",
  users: [],
  start_date: new Date(),
  end_date: new Date(addDays(new Date(), 1)),
  project_id: "",
  priority: "NORMAL"
}

const TaskEditModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const projects = useSelector(selectAllProjects)
  const users = useSelector(selectAllUsers)
  const task = useSelector(selectSelectedTask)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    !loading && navigate("/dashboard/tasks")
  }

  const onSubmit = (form) => {
    const formData = { ...form }
    file && (formData.file = file)
    formData.assignees = JSON.stringify(
      formData.users.map(
        (formUser) => users.find((n) => n.username === formUser).id
      )
    )
    delete formData.users

    setLoading(true)
    dispatch(editTask({ data: formData, id: task.id })).then(
      ({ error, payload }) => {
        if (error) {
          toast.error(error.message)
          setLoading(false)
        } else {
          toast.success("Task updated Successfully!")
          dispatch(getAllTasks()).then(({ error, payload }) => {
            if (error) {
              toast.error(error.message)
            } else {
              handleClose()
            }
            setLoading(false)
          })
        }
      }
    )
  }

  useEffect(() => {
    if (task) {
      Object.keys(defaultValues).map((key) => {
        if (["end_date", "start_date"].includes(key)) {
          setValue(key, new Date(task[key]), {
            shouldDirty: true,
            shouldTouch: true
          })
        } else if (key === "users") {
          setValue(
            "users",
            task.Users.map((u) => u.username),
            {
              shouldDirty: true,
              shouldTouch: true
            }
          )
        } else {
          setValue(key, task[key], { shouldDirty: true, shouldTouch: true })
        }
      })
    }
  }, [task, users])

  if (!task) {
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
            Edit Task
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
                    label="Task Name"
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
                      slotProps={{
                        textField: {
                          required: true,
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
                      slotProps={{
                        textField: {
                          required: true,
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
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl required fullWidth>
                    <InputLabel id="priority">Task Priority</InputLabel>
                    <Select
                      {...field}
                      id="priority"
                      className="mb-24"
                      label="Task Priority"
                      autoFocus
                      error={!!errors.priority}
                      helperText={!!errors.priority && errors.priority.message}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      <MenuItem value="HIGH">High</MenuItem>
                      <MenuItem value="MEDIUM">Medium</MenuItem>
                      <MenuItem value="LOW">Low</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <FormControl required fullWidth>
                    <InputLabel id="project_id">Choose Project</InputLabel>
                    <Select
                      {...field}
                      id="project_id"
                      className="mb-24"
                      label="Choose Project"
                      autoFocus
                      error={!!errors.project_id}
                      helperText={
                        !!errors.project_id && errors.project_id.message
                      }
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="users"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth className="mb-24">
                    <InputLabel id="users">Users</InputLabel>
                    <Select
                      {...field}
                      labelId="users"
                      id="users"
                      multiple
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Users"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      // MenuProps={MenuProps}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.username}>
                          {user.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

          {file && (
            <Box className=" bg-black/20 p-10 rounded-md flex flex-row gap-4 items-center justify-between">
              <Typography>{file.name}</Typography>
              <IconButton
                className="bg-white rounded aspect-square mt-0"
                onClick={() => {
                  setFile(null)
                }}
              >
                <CloseRoundedIcon className="w-20 h-20" />
              </IconButton>
            </Box>
          )}

          <Stack
            direction="row"
            gap={2}
            className="items-center justify-between mt-24"
          >
            <input
              accept=".pdf"
              type="file"
              id="pdf-file-upload"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
              onClick={(event) => {
                event.currentTarget.value = null
              }}
            ></input>
            <IconButton component="label" htmlFor="pdf-file-upload">
              <AttachFileOutlinedIcon />
            </IconButton>
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
          </Stack>
        </form>
      </Paper>
    </Modal>
  )
}

export default memo(TaskEditModal)
