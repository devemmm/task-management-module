import SignInPage from "./SignInPage"
import SignOutPage from "./SignOutPage"
import SignUpPage from "./SignUpPage"

const authRoutes = [
  {
    path: "login",
    element: <SignInPage />
  },
  {
    path: "logout",
    element: <SignOutPage />
  },
  {
    path: "register",
    element: <SignUpPage />
  }
]

export default authRoutes
