import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Modal, Paper, Stack, TextField } from "@mui/material"
import React, { memo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import {
  selectUser,
  updateAuthUserPassword
} from "../../../store/reducers/auth.reducer"
import { selectUserByUserName } from "../../../store/reducers/users.reducer"

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must Contain at least 6 Characters, One Uppercase, One Lowercase and One Number"
    )
    .required("Please enter your current password"),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must Contain at least 6 Characters, One Uppercase, One Lowercase and One Number"
    )
    .required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
})

const defaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
}

const EditPasswordProfileModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userWithId = useSelector((state) =>
    selectUserByUserName(state, user.username)
  )
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit
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

    setLoading(true)
    dispatch(updateAuthUserPassword({ data: form, id })).then(
      ({ error, payload }) => {
        if (error) {
          toast.error(error.message)
        } else {
          toast.success("Updated password successfully")
        }
        setLoading(false)
      }
    )
  }

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
        <form
          name="editProfilePasswordForm"
          noValidate
          className="flex flex-col justify-center w-full pt-32"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Current Password"
                  autoFocus
                  type="password"
                  error={!!errors.oldPassword}
                  helperText={errors?.oldPassword?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="New Password"
                  autoFocus
                  type="password"
                  error={!!errors.newPassword}
                  helperText={errors?.newPassword?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Confirm New Password"
                  autoFocus
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors?.confirmPassword?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

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
          </Box>
        </form>
      </Paper>
    </Modal>
  )
}

export default memo(EditPasswordProfileModal)
