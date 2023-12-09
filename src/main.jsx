import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

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

import AuthProvider from "./AuthProvider";
import BlogDetails from "./Pages/BlogDetails";
import UpdateBlog from "./Pages/UpdateBlog";
import PrivateRoute from "./PrivateRoute";
import BlogsByCategory from "./Pages/BlogsByCategory";
import Authentications from "./Pages/Authentications";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import Profile from "./Pages/Profile";
import AllUsers from "./Pages/AllUsers";
import DashboardRoot from "./Pages/Dashboard/DashboardRoot";
import { Toaster } from "react-hot-toast";
import Membership from "./Pages/Membership";
import PaymentHistory from "./Pages/Payment/PaymentHistory";
import Dashboard_Home from "./Pages/Dashboard/Dashboard_Home";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "/addblog",
                element: (
                    <PrivateRoute>
                        <AddBlog />
                    </PrivateRoute>
                ),
            },
            {
                path: "/updateBlog/:blog_id",
                element: (
                    <PrivateRoute>
                        <UpdateBlog />
                    </PrivateRoute>
                ),
            },
            { path: "/allblogs", element: <AllBlog /> },
            {
                path: `/blogsbycategory/:categoryname`,
                element: <BlogsByCategory />,
            },
            { path: "/featuredblogs", element: <FeaturedBlogs /> },
            {
                path: `/blogDetails/:blog_id`,
                element: <BlogDetails />,
            },
            {
                path: "/wishlist",
                element: (
                    <PrivateRoute>
                        <Wishlist />
                    </PrivateRoute>
                ),
            },
            {
                path: "/membership",
                element: (
                    <PrivateRoute>
                        <Membership />
                    </PrivateRoute>
                ),
            },
            {
                path: "/payment-history",
                element: (
                    <PrivateRoute>
                        <PaymentHistory />
                    </PrivateRoute>
                ),
            },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/authentications", element: <Authentications /> },

            { path: "/profile", element: <Profile /> },
        ],
    },
    {
        path: "/dashboard/",
        element: <DashboardRoot />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard/",
                element: <Dashboard_Home />,
            },
            {
                path: "/dashboard/allusers",
                element: <AllUsers />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Toaster position="top-center" reverseOrder={false} />
                </AuthProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

/*

* Top visited
* Top posted
* Like/Deslike
* Top liked disliked
* Users posted blogs
* Show total comment of a blog.
* Show total view
	Top commentd Post
Top Interactions
Popular Discussions
Discuss & Discover
Popular Discussions


Search field with multiple category choose.
Short by new old
*/
