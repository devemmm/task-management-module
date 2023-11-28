import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography
} from "@mui/material"
import React, { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  deleteProject,
  selectSelectedProject
} from "../../../store/reducers/projects.reducer"

const ProjectDeleteModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const project = useSelector(selectSelectedProject)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    !loading && navigate("/dashboard/projects")
  }

  const handleClick = () => {
    setLoading(true)
    dispatch(deleteProject({ id: project.id })).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Project deleted Successfully!")
        handleClose()
      }
      setLoading(false)
    })
  }

  if (!project) {
    return
  }

  return (
    <Modal
      className="flex flex-col items-center w-full h-full p-16 overflow-auto"
      open={true}
      onClose={handleClose}
    >
      <Paper className="w-full max-w-sm h-max py-16 px-20 my-auto">
        <Stack
          direction="row"
          gap={2}
          className="w-full items-center justify-between"
        >
          <Typography color="text.secondary" className="text-4xl font-bold">
            Delete Project
          </Typography>

          <IconButton onClick={handleClose} className="w-40 h-40">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Typography className="font-bold">
          You are about to delete <i>{project.name}</i> project!
        </Typography>
        <Typography>If you consent, click the button below.</Typography>

        <Stack
          direction="row"
          gap={2}
          className="items-center justify-between mt-24"
        >
          <Button
            role="button"
            variant="contained"
            color="primary"
            disabled={loading}
            size="medium"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            role="button"
            variant="contained"
            color="secondary"
            disabled={loading}
            size="medium"
          >
            Delete Project
          </Button>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default memo(ProjectDeleteModal)
