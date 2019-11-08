import React from "react"

import Layout from "./components/Layout"
import { GlobalStyle } from "./components/style"

export const AppContext = React.createContext()

const App = ({ element, props }) => {
  return (
    <AppContext.Provider value={{}}>
      <GlobalStyle />
      <Layout {...props}>{element}</Layout>
    </AppContext.Provider>
  )
}

export default App
