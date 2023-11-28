import clsx from "clsx"
import React from "react"

const StatusDot = ({ status }) => {
  return (
    <i
      className={clsx(
        "inline-block w-12 h-12 rounded-lg mx-4",
        status ? "bg-green" : "bg-red"
      )}
    />
  )
}

export default StatusDot
