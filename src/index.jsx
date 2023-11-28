import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
  alpha
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import router from "./routes"
import store from "./store/store"
import { lightTheme } from "./theme"

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        backgroundColor: `${theme.palette.background.default}!important`,
        color: `${theme.palette.text.primary}!important`
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      },
      /*  'code:not([class*="language-"])': {
        color: theme.palette.secondary.dark,
        backgroundColor:
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
        padding: '2px 3px',
        borderRadius: 2,
        lineHeight: 1.7,
      }, */
      "table.simple tbody tr th": {
        borderColor: theme.palette.divider
      },
      "table.simple thead tr th": {
        borderColor: theme.palette.divider
      },
      "a:not([role=button]):not(.MuiButtonBase-root)": {
        color: theme.palette.secondary.main,
        textDecoration: "underline",
        "&:hover": {}
      },
      "a.link, a:not([role=button])[target=_blank]": {
        background: alpha(theme.palette.secondary.main, 0.2),
        color: "inherit",
        borderBottom: `1px solid ${theme.palette.divider}`,
        textDecoration: "none",
        "&:hover": {
          background: alpha(theme.palette.secondary.main, 0.3),
          textDecoration: "none"
        }
      },
      '[class^="border"]': {
        borderColor: theme.palette.divider
      },
      '[class*="border"]': {
        borderColor: theme.palette.divider
      },
      '[class*="divide-"] > :not([hidden]) ~ :not([hidden])': {
        borderColor: theme.palette.divider
      },
      hr: {
        borderColor: theme.palette.divider
      },

      "::-webkit-scrollbar-thumb": {
        boxShadow: `inset 0 0 0 20px ${
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.24)"
            : "rgba(255, 255, 255, 0.24)"
        }`
      },
      "::-webkit-scrollbar-thumb:active": {
        boxShadow: `inset 0 0 0 20px ${
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.37)"
            : "rgba(255, 255, 255, 0.37)"
        }`
      }
    })}
  />
)

const cache = createCache({
  key: "css",
  insertionPoint: document.getElementById("emotion-insertion-point")
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lightTheme}>
          <CacheProvider value={cache}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {inputGlobalStyles}
              <ToastContainer />
              <RouterProvider router={router} />
            </LocalizationProvider>
          </CacheProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
