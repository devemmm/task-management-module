import { Input, Paper } from "@mui/material"
import React from "react"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"

const TableInput = ({ searchText, handleChange }) => {
  return (
    <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
      <Paper className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
        <SearchRoundedIcon />

        <Input
          placeholder="Search"
          className="flex flex-1"
          disableUnderline
          fullWidth
          value={searchText}
          inputProps={{
            "aria-label": "Search"
          }}
          onChange={(ev) => handleChange(ev)}
        />
      </Paper>
    </div>
  )
}

export default TableInput
