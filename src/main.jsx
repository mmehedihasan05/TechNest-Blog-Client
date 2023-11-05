import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Root from "./Root";
import Home from "./Pages/Home";
import ErrorPage from "./ErrorPage";
import AddBlog from "./Pages/AddBlog";
import AllBlog from "./Pages/AllBlog";
import FeaturedBlogs from "./Pages/FeaturedBlogs";
import Wishlist from "./Pages/Wishlist";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/addblog", element: <AddBlog /> },
            { path: "/allblogs", element: <AllBlog /> },
            { path: "/featuredblogs", element: <FeaturedBlogs /> },
            { path: "/wishlist", element: <Wishlist /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
