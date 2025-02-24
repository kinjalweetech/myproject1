import React from 'react'

const Home = React.lazy(() => import("./Component/Home"))
const AboutUs = React.lazy(() => import("./Component/AboutUs"))
const Service = React.lazy(() => import("./Component/Service"))
const Login = React.lazy(() => import("./Component/LoginPage"))
export const router = [
    {
        path: "/Home",
        name: "Home",
        element: Home
    },
    {
        path: "/about",
        name: "AboutUs",
        element: AboutUs
    },
    {
        path: "/service",
        name: "Service",
        element: Service
    },
    {
        path: "/login",
        name: "Login",
        element: Login
    }

]