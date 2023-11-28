import { ThemeProvider } from "@emotion/react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Tooltip from "@mui/material/Tooltip"
import { darkTheme } from "../../theme"

function CustomTableHead({ rows, order, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <TableHead>
        <TableRow className="h-48 sm:h-64">
          <TableCell
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main
            }}
            padding="none"
            className="w-40 md:w-64 text-center z-99"
          >
            <span className="cursor-pointer">#</span>
          </TableCell>
          {rows.map((row) => {
            return (
              <TableCell
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main
                }}
                className="p-4 md:p-16"
                key={row.id}
                align={row.align}
                padding={row.disablePadding ? "none" : "normal"}
                sortDirection={order.id === row.id ? order.direction : false}
              >
                {!row.sort && (
                  <span className="cursor-pointer">{row.label}</span>
                )}
                {row.sort && (
                  <Tooltip
                    title="Sort"
                    placement={
                      row.align === "right" ? "bottom-end" : "bottom-start"
                    }
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={order.id === row.id}
                      direction={order.direction}
                      onClick={createSortHandler(row.id)}
                      className="font-semibold"
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                )}
              </TableCell>
            )
          }, this)}
          <TableCell
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main
            }}
            padding="none"
            className="w-40 md:w-64 text-center z-99"
          ></TableCell>
        </TableRow>
      </TableHead>
    </ThemeProvider>
  )
}

export default CustomTableHead
