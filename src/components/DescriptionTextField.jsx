import { Box, TextField, Typography } from "@mui/material"
import React from "react"

const DescriptionTextField = ({
  errors,
  maxLength = 200,
  inputProps,
  ...props
}) => {
  const { onChange = () => {} } = inputProps

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      onChange(e)
    }
  }

  return (
    <Box {...props}>
      <TextField
        label="Description"
        autoFocus
        type="text"
        error={!!errors.description}
        helperText={errors?.description?.message}
        variant="outlined"
        fullWidth
        required
        multiline
        minRows={5}
        sx={{
          ...(inputProps.value.length === maxLength && {
            ["& .MuiOutlinedInput-notchedOutline"]: {
              borderColor: "#ffdf00 !important"
            }
          })
        }}
        {...inputProps}
        onChange={handleChange}
      />
      <Typography color="text.secondary" className="mt-10">
        Total number of words: {inputProps.value.length} / {maxLength}
      </Typography>
    </Box>
  )
}

export default DescriptionTextField
