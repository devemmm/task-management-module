import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { createLogger } from "redux-logger"

const middlewares = []

if (process.env.NODE_ENV === "development") {
  const logger = createLogger()

  middlewares.push(logger)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middlewares
  ]
})

export default store
