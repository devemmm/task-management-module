import { Avatar } from "@mui/material"
import React from "react"
import CountryFlag from "../../components/CountryFlag"
import StatusDot from "../../components/StatusDot"
import formatDate from "../../utils/formatDate"

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

export default userRows
