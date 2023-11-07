import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    /*
        const {

            bannerUrl,
        title,
        category,
        shortDescription,
        longDescription,

        authorInfo: { name: authorName, imageUrl: authorImage, userId: authorUserId },
    } = blogData;
    */
    const { currentUser } = useContext(AuthContext);

    const handleAddBlog = (e) => {
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
                .post("/addBlog", blogData)
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

    return (
        <div className="custom-width sapce-y-10">
            <SectionTitle data={{ title: "Add Blog", noBorder: true }}></SectionTitle>
            <div>
                <form action="" onSubmit={handleAddBlog} className="space-y-6 w-[75%] mx-auto">
                    <div className="">
                        <div>Banner Image Url</div>
                        <input
                            type="text"
                            placeholder="Banner Image URL"
                            name="banner_image_url"
                            className="_input w-full"
                            required
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
                        />
                    </div>
                    <div>
                        <div>Category</div>
                        <select name="category" id="" className="w-full cursor-pointer" required>
                            <option value="artificial_intelligence">Artificial Intelligence</option>
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
                        ></textarea>
                    </div>

                    <div>
                        <input
                            type="submit"
                            className="_btn _btn-primary w-full"
                            value="Publish Blog"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
