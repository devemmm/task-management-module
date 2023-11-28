import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from "./reducers/users.reducer"
import authReducer from "./reducers/auth.reducer"
import projectsReducer from "./reducers/projects.reducer"
import tasksReducer from "./reducers/tasks.reducer"

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer
})

export default rootReducer
