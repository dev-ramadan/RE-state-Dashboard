import {  RouterProvider } from "react-router"
import { route } from "./routes"
import "./App.css"
import { Toaster } from "react-hot-toast"

function App() {



  return (
    <>
      <RouterProvider router={route}>
      </RouterProvider>
        <Toaster/> 
    </>
  )
}

export default App
