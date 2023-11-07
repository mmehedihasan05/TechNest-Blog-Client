/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateBlog = () => {
    const { blog_id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [blogData, setBlogData] = useState({});

    useEffect(() => {
        axiosSecure
            .get(`/blogDetails/${blog_id}?userid=${undefined}`)
            .then((data) => {
                console.log(data.data);
                setBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const { currentUser } = useContext(AuthContext);

    const handleUpdateBlog = (e) => {
        e.preventDefault();

        const form = e.target;

        const bannerUrl = form.banner_image_url.value;
        const title = form.blog_title.value;
        const category = form.category.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;

        const currentDate = new Date();
        const isoString = currentDate.toISOString();

        const blogData = {
            bannerUrl,
            title,
            category,
            shortDescription,
            longDescription,
            creationTime: isoString,
            authorInfo: {
                name: currentUser.displayName,
                imageUrl: currentUser.photoURL,
                userId: currentUser.uid,
            },
        };
        console.log(blogData);

        return toast.promise(
            axiosSecure
                .post(`/updateBlog/${blog_id}?userid=${currentUser?.uid}`, blogData)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.acknowledged) {
                        form.reset();
                        return <b>Blog Published Successfully.</b>;
                    } else {
                        throw new Error("Failed to publish blog!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                }),
            {
                loading: "Publishing blog...",
                success: (message) => message,
                error: (error) => <b>Failed to publish blog!</b>,
            }
        );
    };

    const { bannerUrl, title, category, shortDescription, longDescription } = blogData;

    return (
        <div className="custom-width sapce-y-10">
            <SectionTitle data={{ title: "Update Blog", noBorder: true }}></SectionTitle>
            <div>
                <form action="" onSubmit={handleUpdateBlog} className="space-y-6 w-[75%] mx-auto">
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
                        <select name="category" id="" className="w-full cursor-pointer" required>
                            <option
                                selected={category === "artificial_intelligence"}
                                value="artificial_intelligence"
                            >
                                Artificial Intelligence
                            </option>
                            <option
                                selected={category === "web_development"}
                                value="web_development"
                            >
                                Web Development
                            </option>
                            <option selected={category === "data_science"} value="data_science">
                                Data Science
                            </option>
                            <option selected={category === "cybersecurity"} value="cybersecurity">
                                Cybersecurity
                            </option>
                            <option selected={category === "robotics"} value="robotics">
                                Robotics
                            </option>
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
        </div>
    );
};

export default UpdateBlog;
