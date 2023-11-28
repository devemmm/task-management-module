import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Loading from "../Loading"
import CustomTableHead from "./CustomTableHead"
import TableInput from "../TableInput"
import clsx from "clsx"
import * as XLSX from "xlsx"

const CustomTableMain = ({
  name = "data",
  searchText,
  handleClick,
  data,
  rows
}) => {
  const [filteredData, setFilteredData] = useState(data)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  })

  function handleRequestSort(event, property) {
    const id = property
    let direction = "desc"

    if (order.id === property && order.direction === "desc") {
      direction = "asc"
    }

    setOrder({
      direction,
      id
    })
  }

  useEffect(() => {
    if (searchText.length !== 0) {
      setFilteredData(
        _.filter(
          data,
          (item) =>
            item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.fname?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.lname?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.description?.toLowerCase().includes(searchText.toLowerCase())
        )
      )
      setPage(0)
    } else {
      setFilteredData(data)
    }
  }, [data, searchText])

  function handleChangePage(event, value) {
    setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loading />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Box className="flex flex-1 items-center justify-center p-20">
        <Typography color="text.secondary" variant="h5">
          There are no {name}!
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Box className="w-full overflow-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CustomTableHead
            rows={rows}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={filteredData.length}
          />

          <TableBody>
            {_.orderBy(
              filteredData,
              [
                (o) => {
                  switch (order.id) {
                    // case "categories": {
                    //   return o.categories[0]
                    // }
                    default: {
                      return o[order.id]
                    }
                  }
                }
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, i) => {
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    tabIndex={-1}
                    key={n.id}
                    onClick={(event) => handleClick(n, event)}
                  >
                    <TableCell
                      key="-"
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="center"
                    >
                      <span className="font-bold">
                        {i + 1 + page * rowsPerPage}.
                      </span>
                    </TableCell>
                    {rows.map((row) => (
                      <TableCell
                        key={row.id}
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                        align={row.align}
                        {...(row.disablePadding && { padding: "none" })}
                      >
                        {row.format ? row.format(n[row.id], n) : n[row.id]}
                      </TableCell>
                    ))}
                    <TableCell
                      key="--"
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    />
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        className="shrink-0 border-t-1 py-10 px-10"
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
        slotProps={{
          select: {
            classes: {
              root: "pt-[7px]"
            }
          }
        }}
      />
    </>
  )
}

const CustomTable = ({
  title,
  handleClick,
  data,
  rows,
  name,
  className,
  ...props
}) => {
  const [searchText, setSearchText] = useState("")

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  const downloadExcel = (data) => {
    const newData = data.map((row) => {
      delete row.tableData
      return row
    })

    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "data")
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "Data.xlsx")
  }

  return (
    <Paper className={clsx(className)} {...props}>
      <Stack
        gap={2}
        className="flex flex-col sm:flex-row justify-between items-center p-20"
      >
        <Box>
          <Typography
            className="text-2xl font-extrabold "
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>
        <Box className="flex flex-row items-center gap-2">
          <TableInput {...{ searchText, handleChange }} />
          <IconButton
            onClick={() => {
              downloadExcel(data)
            }}
          >
            <svg
              className="text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m2.859 2.878l12.57-1.796a.5.5 0 0 1 .571.495v20.847a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.868a1 1 0 0 1 .859-.99ZM17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4V3Zm-6.8 9L13 8h-2.4L9 10.286L7.4 8H5l2.8 4L5 16h2.4L9 13.714L10.6 16H13l-2.8-4Z"
              />
            </svg>
          </IconButton>
        </Box>
      </Stack>

      <CustomTableMain {...{ searchText, name, handleClick, data, rows }} />
    </Paper>
  )
}

export default CustomTable
