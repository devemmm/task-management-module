import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import DetailsHeader from "../../components/DetailsHeader"
import Loading from "../../components/Loading"
import CustomTable from "../../components/table/CustomTable"
import { selectTaskById } from "../../store/reducers/tasks.reducer"
import CountryFlag from "../../components/CountryFlag"
import StatusDot from "../../components/StatusDot"
import formatDate from "../../utils/formatDate"

export function downloadFile(url) {
  const fileName = url.split("/").slice(-1)[0]

  fetch(url)
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a")
      aElement.setAttribute("download", fileName)
      const href = URL.createObjectURL(res)
      aElement.href = href
      aElement.setAttribute("target", "_blank")
      aElement.click()
      URL.revokeObjectURL(href)
    })
}

export const userRows = [
  {
    id: "avatar",
    align: "left",
    disablePadding: false,
    label: "Image",
    sort: true,
    format: (url, row) => {
      return (
        <Avatar className="w-40 h-40" src={url} alt={row.fname + "avatar"}>
          {row.fname[0] || "A"}
        </Avatar>
      )
    }
  },
  {
    id: "username",
    align: "left",
    disablePadding: false,
    label: "User Name",
    sort: true
  },
  {
    id: "fname",
    align: "center",
    disablePadding: false,
    label: "First Name",
    sort: true
  },
  {
    id: "lname",
    align: "center",
    disablePadding: false,
    label: "Phone NUmber",
    sort: true
  },
  {
    id: "location",
    align: "center",
    disablePadding: false,
    label: "Address",
    sort: true
  },
  {
    id: "phone",
    align: "center",
    disablePadding: false,
    label: "Phone Number",
    sort: true
  },
  {
    id: "country",
    align: "center",
    disablePadding: false,
    label: "Country",
    sort: true,
    format: (country) => {
      return (
        <span>
          <CountryFlag country={country} />
          {country}
        </span>
      )
    }
  },
  {
    id: "role",
    align: "center",
    disablePadding: false,
    label: "Role",
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
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Joined",
    sort: true,
    format: formatDate
  }
]

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const task = useSelector((state) => selectTaskById(state, id))

  if (!task) return <Loading />

  const { name, status, description, Users, Projects, file } = task

  return (
    <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
      <DetailsHeader {...{ status, to: "/dashboard/tasks", title: name }} />
      <Paper elevation={1} className="w-full h-max p-24 px-32 mt-14">
        <Typography className="text-lg font-bold">Description</Typography>
        <Typography>{description}</Typography>
        <Box className="mt-20 bg-black/20 p-10 rounded-md flex flex-row gap-4 items-center justify-between">
          <Box className="flex flex-row gap-4 items-center truncate">
            <Typography className="font-semibold">Attached File</Typography>
            <Typography
              color={file ? "secondary" : "text.secondary"}
              className="text-sm"
            >
              {file || "No attached file"}
            </Typography>
          </Box>
          <IconButton
            disabled={!file}
            className="bg-white rounded aspect-square"
            onClick={() => file && downloadFile(file)}
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
        </Box>
      </Paper>

      <CustomTable
        className="mt-16"
        title="Users"
        data={Users}
        // handleClick={(n) => navigate(`/dashboard/users/${n.id}`)}
        rows={
          Users.length > 0
            ? userRows.filter((r) => !["actions"].includes(r.id))
            : null
        }
      />
    </Box>
  )
}

export default TaskDetailsPage
