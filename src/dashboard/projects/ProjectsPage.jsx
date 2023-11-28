import AddRoundedIcon from "@mui/icons-material/AddRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header"
import StatusDot from "../../components/StatusDot"
import CustomTable from "../../components/table/CustomTable"
import {
  selectAllProjects,
  setSelectedProject
} from "../../store/reducers/projects.reducer"
import formatDate from "../../utils/formatDate"
import ProjectCreateModal from "./partials/ProjectCreateModal"
import ProjectDeleteModal from "./partials/ProjectDeleteModal"
import ProjectEditModal from "./partials/ProjectEditModal"

export const ProjectsActions = ({ project }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.stopPropagation()
    dispatch(setSelectedProject(project))
    navigate(`/dashboard/projects/edit`)
  }
  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(setSelectedProject(project))
    navigate(`/dashboard/projects/delete`)
  }

  return (
    <Box className="flex flex-row gap-1 items-center justify-center">
      <IconButton color="secondary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={handleDelete}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    </Box>
  )
}

export const projectRows = [
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true
  },
  {
    id: "description",
    align: "left",
    disablePadding: false,
    label: "Description",
    sort: true
  },
  {
    id: "status",
    align: "center",
    disablePadding: false,
    label: "Status",
    sort: true,
    format: (value) => (
      <div className="flex flex-row items-center justify-center">
        <StatusDot status={value} />
        {value ? "Active" : "Inactive"}
      </div>
    )
  },
  {
    id: "start_date",
    align: "center",
    disablePadding: false,
    label: "Start Date",
    sort: true,
    format: formatDate
  },
  {
    id: "end_date",
    align: "center",
    disablePadding: false,
    label: "End Date",
    sort: true,
    format: formatDate
  },
  {
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Created At",
    sort: true,
    format: formatDate
  },
  {
    id: "actions",
    align: "center",
    disablePadding: false,
    label: "Actions",
    sort: false,
    format: (_, n) => {
      return <ProjectsActions project={n} />
    }
  }
]

const ProjectsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [selected, setSelected] = useState(null)
  const projects = useSelector(selectAllProjects)
  const [openProjectModal, setOpenProjectModal] = useState(false)

  const handleClick = (n) => {
    navigate(`/dashboard/projects/${n.id}`)
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/projects/create") {
      setOpenProjectModal("create")
    } else if (location.pathname === "/dashboard/projects/edit") {
      setOpenProjectModal("edit")
    } else if (location.pathname === "/dashboard/projects/delete") {
      setOpenProjectModal("delete")
    } else {
      setOpenProjectModal(null)
    }
  }, [location.pathname])

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header
          title="Projects"
          actions={[
            <Button
              variant="contained"
              color="secondary"
              key={1}
              onClick={() => {
                navigate("/dashboard/projects/create")
              }}
            >
              <AddRoundedIcon className="w-40" />
              <Typography>Create Project</Typography>
            </Button>
          ]}
        />
        <Paper className="overflow-auto mt-14 min-h-36" elevation={0}>
          <CustomTable
            rows={projectRows}
            handleClick={handleClick}
            data={projects}
          />
        </Paper>
      </Box>
      {openProjectModal === "create" && <ProjectCreateModal />}
      {openProjectModal === "edit" && <ProjectEditModal />}
      {openProjectModal === "delete" && <ProjectDeleteModal />}
    </>
  )
}

export default ProjectsPage
