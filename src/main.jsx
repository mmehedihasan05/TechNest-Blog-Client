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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthProvider";
import BlogDetails from "./Pages/BlogDetails";
import UpdateBlog from "./Pages/UpdateBlog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/addblog", element: <AddBlog /> },
            {
                path: "/updateBlog/:blog_id",
                element: <UpdateBlog />,
            },
            { path: "/allblogs", element: <AllBlog /> },
            { path: "/featuredblogs", element: <FeaturedBlogs /> },
            {
                path: `/blogDetails/:blog_id`,
                element: <BlogDetails />,
            },
            { path: "/wishlist", element: <Wishlist /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
