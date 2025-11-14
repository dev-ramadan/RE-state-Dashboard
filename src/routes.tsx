import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./Pages/Home";
import Agent from "./Pages/Agent";
import Broker from "./Pages/Broker";
import Customers from "./Pages/Customers";
import Layout from "./layout/Layout";
import Login from "./Pages/Login";


export const route = createBrowserRouter(createRoutesFromElements(
    <>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path="customer" element={<Customers />}></Route>
                <Route path="agent" element={<Agent />}></Route>
                <Route path="broker" element={<Broker />}></Route>
                <Route path="property" element={<Home />}></Route>
            </Route>
        <Route path="login" element={<Login />}></Route>
    </>
))