/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { categoryFormatter } from "../Utilities/Functionalities";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UpdateBlog = () => {
    const { blog_id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [blogData, setBlogData] = useState({});
    const navigate = useNavigate();
    const [categoryInputVal, setCategoryInputVal] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/blogDetails/${blog_id}`)
            .then((data) => {
                // console.log(data.data);
                setBlogData(data.data);
                setCategoryInputVal(data.data?.category);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const { currentUser, logout } = useContext(AuthContext);

    const handleUpdateBlog = (e) => {
        e.preventDefault();

        const form = e.target;

        const bannerUrl = form.banner_image_url.value;
        const title = form.blog_title.value;
        const category = form.category.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;

        const dataToPost = {
            userId: currentUser?.uid,
            email: currentUser?.email,
            blogData: {
                bannerUrl,
                title,
                category,
                shortDescription,
                longDescription,
            },
        };

        return toast.promise(
            axiosSecure
                .put(`/updateBlog/${blog_id}`, dataToPost)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data.acknowledged) {
                        navigate(`/blogDetails/${blog_id}`);

                        return <b>Blog Updated Successfully.</b>;
                    } else {
                        throw new Error("Failed to update blog!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401 && currentUser) {
                        logout()
                            .then((response) => {
                                toast.error("Unauthorized Access! Logged Out.");
                            })
                            .catch((error) => {
                                toast.error("Unauthorized Access! Log Out Failed.");
                            });
                    }
                    throw new Error("Failed to update blog!");
                }),
            {
                loading: "Updating blog...",
                success: (message) => message,
                error: (error) => <b>Failed to update blog!</b>,
            }
        );
    };

    const handleCategoryChange = (e) => {
        setCategoryInputVal(e.target.value);
    };

    const { bannerUrl, title, category, shortDescription, longDescription } = blogData;
    // console.log(category);

    return (
        <div className="custom-width sapce-y-10">
            <SectionTitle data={{ title: "Update Blog", noBorder: true }}></SectionTitle>
            {loading ? (
                <div>
                    <Skeleton height={30} count={4} />
                    <Skeleton height={50} count={1} />
                    <Skeleton height={30} count={1} />
                </div>
            ) : (
                <div>
                    <form
                        action=""
                        onSubmit={handleUpdateBlog}
                        className="space-y-6 w-[95%] md:w-[75%] mx-auto"
                    >
                        <div className="">
                            <div>Banner Image Url</div>
                            <input
                                type="text"
                                placeholder="Banner Image URL"
                                name="banner_image_url"
                                className="_input w-full"
                                required
                                defaultValue={bannerUrl}
                            />
                        </div>
                        <div>
                            <div>Blog Title</div>
                            <input
                                type="text"
                                placeholder="Title"
                                name="blog_title"
                                className="_input w-full"
                                required
                                defaultValue={title}
                            />
                        </div>
                        <div>
                            <div>Category</div>
                            <select
                                name="category"
                                id=""
                                className="w-full cursor-pointer"
                                required
                                value={categoryInputVal}
                                onChange={handleCategoryChange}
                            >
                                <option value="artificial_intelligence">
                                    Artificial Intelligence
                                </option>
                                <option value="web_development">Web Development</option>
                                <option value="data_science">Data Science</option>
                                <option value="cybersecurity">Cybersecurity</option>
                                <option value="robotics">Robotics</option>
                            </select>
                        </div>
                        <div>
                            <div>Short Description</div>
                            <textarea
                                name="shortDescription"
                                className="w-full rounded-md"
                                id=""
                                placeholder="Short Description"
                                required
                                defaultValue={shortDescription}
                            ></textarea>
                        </div>
                        <div>
                            <div>Long Description</div>
                            <textarea
                                name="longDescription"
                                className="w-full rounded-md"
                                id=""
                                rows="7"
                                placeholder="Long Description"
                                required
                                defaultValue={longDescription}
                            ></textarea>
                        </div>

                        <div>
                            <input
                                type="submit"
                                className="_btn _btn-primary w-full"
                                value="Update Blog"
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateBlog;
