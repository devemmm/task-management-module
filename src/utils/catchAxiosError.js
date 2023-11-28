const catchAxiosError = async (axiosFunc) => {
  try {
    return await axiosFunc()
  } catch (error) {
    const additionalErrorMEssage = error.response?.data?.additional_message
      ? "  --  Additional Message:  " + error.response?.data?.additional_message
      : ""
    throw new Error(
      error.response?.data?.message + additionalErrorMEssage || error.message
    )
  }
}

export default catchAxiosError
