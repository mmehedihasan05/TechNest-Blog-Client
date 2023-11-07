import Ads from "./Home Sections/Ads";
import Banner from "./Home Sections/Banner";
import Banner2 from "./Home Sections/Banner2";
import EditorsPick from "./Home Sections/EditorsPick";
import NewsLetter from "./Home Sections/NewsLetter";
import RecentBlogs from "./Home Sections/RecentBlogs";
import ShowByCategories from "./Home Sections/ShowByCategories";

/*

*/

const Home = () => {
    return (
        <div className="custom-width space-y-12">
            {/* banner full width */}
            <div className="">
                {/* <Banner2></Banner2> */}
                <Banner></Banner>
            </div>

            {/* Home Page Contents Full Width */}
            <div className="mt-8 mb-8 grid grid-cols-4 gap-4">
                {/* Main 2 Blog : 3 Part */}
                <div className="col-span-3  space-y-20">
                    <div>
                        <RecentBlogs></RecentBlogs>
                    </div>
                    <div className="mt-8">
                        <EditorsPick></EditorsPick>
                    </div>
                </div>

                {/* Right Side Small : 1 Part */}
                <div className=" space-y-12">
                    <div>
                        ShowByCategories
                        <ShowByCategories></ShowByCategories>
                    </div>
                    <div className="mt-8">
                        Ads
                        <Ads></Ads>
                    </div>
                    <div className="mt-8">
                        NewsLetter
                        <NewsLetter></NewsLetter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
