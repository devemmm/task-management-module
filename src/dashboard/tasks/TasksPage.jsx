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
  selectAllTasks,
  setSelectedTask
} from "../../store/reducers/tasks.reducer"
import formatDate from "../../utils/formatDate"
import TaskCreateModal from "./partials/TaskCreateModal"
import TaskDeleteModal from "./partials/TaskDeleteModal"
import TaskEditModal from "./partials/TaskEditModal"
import { downloadFile } from "./TaskDetailsPage"
import StraightRoundedIcon from "@mui/icons-material/StraightRounded"
import { capitalize } from "lodash"

export const TasksActions = ({ task }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.stopPropagation()
    dispatch(setSelectedTask(task))
    navigate(`/dashboard/tasks/edit`)
  }
  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(setSelectedTask(task))
    navigate(`/dashboard/tasks/delete`)
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

export const PriorityIcon = ({ value }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      {value === "HIGH" && <StraightRoundedIcon color="success" />}

      {value === "MEDIUM" && <StraightRoundedIcon color="success" />}

      {value === "LOW" && (
        <StraightRoundedIcon color="error" className="rotate-180" />
      )}

      <Typography>{capitalize(value)}</Typography>
    </div>
  )
}

export const tasksRows = [
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
    id: "priority",
    align: "center",
    disablePadding: false,
    label: "Priority",
    sort: true,
    format: (value) => (
      <div className="flex flex-row items-center justify-center">
        <PriorityIcon value={value} />
      </div>
    )
  },
  {
    id: "Users",
    align: "center",
    disablePadding: false,
    label: "Users",
    sort: false,
    format: (usersArr) =>
      usersArr?.length > 0 ? usersArr.map((u) => u.username).join(",") : "None"
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
    id: "file",
    align: "right",
    disablePadding: false,
    label: "File",
    sort: true,
    format: (value) => {
      return value ? (
        <IconButton
          color="secondary"
          disabled={!value}
          className="bg-white rounded aspect-square"
          onClick={(e) => {
            e.stopPropagation()
            return value && downloadFile(value)
          }}
        >
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </Box>
        </IconButton>
      ) : (
        "No FIle"
      )
    }
  },
  {
    id: "actions",
    align: "center",
    disablePadding: true,
    label: "Actions",
    sort: false,
    format: (_, n) => <TasksActions task={n} />
  }
]

const TasksPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const tasks = useSelector(selectAllTasks)
  const [openTaskModal, setOpenTaskModal] = useState(false)

  const handleClick = (n) => {
    navigate(`/dashboard/tasks/${n.id}`)
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/tasks/create") {
      setOpenTaskModal("create")
    } else if (location.pathname === "/dashboard/tasks/edit") {
      setOpenTaskModal("edit")
    } else if (location.pathname === "/dashboard/tasks/delete") {
      setOpenTaskModal("delete")
    } else {
      setOpenTaskModal(null)
    }
  }, [location.pathname])

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header
          title="Tasks"
          actions={[
            <Button
              variant="contained"
              color="secondary"
              key={1}
              onClick={() => {
                navigate("/dashboard/tasks/create")
              }}
            >
              <AddRoundedIcon className="w-40" />
              <Typography>Create Task</Typography>
            </Button>
          ]}
        />
        <Paper className="overflow-auto mt-14 min-h-36" elevation={0}>
          <CustomTable
            rows={tasksRows}
            handleClick={handleClick}
            data={tasks}
          />
        </Paper>
      </Box>

      {openTaskModal === "create" && <TaskCreateModal />}
      {openTaskModal === "edit" && <TaskEditModal />}
      {openTaskModal === "delete" && <TaskDeleteModal />}
    </>
  )
}

export default TasksPage
