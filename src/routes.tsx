import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./Pages/Home";
import Agent from "./Pages/Agent";
import Broker from "./Pages/Broker";
import Customers from "./Pages/Customers";
import Layout from "./layout/Layout";
import Login from "./Pages/Login";
import UserDetails from "./Pages/UserDetails";
import Properties from "./Pages/Property";
import PropertyDetails from "./Pages/PropertyDetails";


export const route = createBrowserRouter(createRoutesFromElements(
    <>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path="customer" element={<Customers />}></Route>
                <Route path="agent" element={<Agent />}></Route>
                <Route path="broker" element={<Broker />}></Route>
                <Route path="property" element={<Properties />}></Route>
                <Route path="userDetails/:id" element={<UserDetails/>}></Route>
                <Route path="propertyDetails/:id" element={<PropertyDetails/>}></Route>
            </Route>
        <Route path="login" element={<Login />}></Route>
    </>
))