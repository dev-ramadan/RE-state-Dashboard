import {  RouterProvider } from "react-router"
import { route } from "./routes"
import "./App.css"

function App() {



  return (
    <>
      <RouterProvider router={route}>
      </RouterProvider>
    </>
  )
}

export default App
