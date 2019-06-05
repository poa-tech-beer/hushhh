import React from "react"
import Layout from "./components/Layout"

// import 'node_modules/modern-normalize/modern-normalize.css'
import "typeface-nanum-pen-script"

export const AppContext = React.createContext()

const App = ({ element, props }) => {
  return (
    <AppContext.Provider value={{}}>
      <Layout {...props}>{element}</Layout>
    </AppContext.Provider>
  )
}

export default App
