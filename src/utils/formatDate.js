import { format } from "date-fns"

const formatDate = (date) => {
  if (!date) return null
  return format(new Date(date), "iii dd/LL/yyyy")
}

export default formatDate
