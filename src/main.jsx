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

import AuthProvider from "./AuthProvider";
import BlogDetails from "./Pages/BlogDetails";
import UpdateBlog from "./Pages/UpdateBlog";
import PrivateRoute from "./PrivateRoute";
import BlogsByCategory from "./Pages/BlogsByCategory";

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
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
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
