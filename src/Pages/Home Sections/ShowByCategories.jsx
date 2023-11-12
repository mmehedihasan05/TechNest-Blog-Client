/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const ShowByCategories = () => {
    const axiosSecure = useAxiosSecure();
    const [categories, setCategories] = useState({});

    // get category list
    useEffect(() => {
        axiosSecure
            .get(`/category-names`)
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="space-y-8">
            <SectionTitle
                data={{ title: "Categories", description: "Read by categories", noBorder: true }}
            ></SectionTitle>
            <div>
                <ul className="flex flex-col gap-4">
                    {Object.keys(categories).map((categoryName, idx) => (
                        <li
                            className="flex items-center gap-2 text-[--text-primary] font-medium hover:text-[--text-highlight] hover:font-semibold"
                            value={categories[categoryName]}
                            key={idx}
                        >
                            <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                            <NavLink to={`/blogsbycategory/${categories[categoryName]}`}>
                                {categoryName}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowByCategories;
