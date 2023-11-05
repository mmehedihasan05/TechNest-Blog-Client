import Ads from "./Home Sections/Ads";
import Banner from "./Home Sections/Banner";
import EditorsPick from "./Home Sections/EditorsPick";
import NewsLetter from "./Home Sections/NewsLetter";
import RecentBlogs from "./Home Sections/RecentBlogs";
import ShowByCategories from "./Home Sections/ShowByCategories";

const Home = () => {
    return (
        <>
            {/* banner full width */}
            <div className="mt-8">
                <Banner></Banner>
            </div>

            {/* Home Page Contents Full Width */}
            <div className="mt-8 mb-8">
                {/* Main 2 Blog : 3 Part */}
                <div>
                    <div>
                        <RecentBlogs></RecentBlogs>
                    </div>
                    <div className="mt-8">
                        <EditorsPick></EditorsPick>
                    </div>
                </div>

                {/* Right Side Small : 1 Part */}
                <div>
                    <div>
                        <ShowByCategories></ShowByCategories>
                    </div>
                    <div className="mt-8">
                        <Ads></Ads>
                    </div>
                    <div className="mt-8">
                        <NewsLetter></NewsLetter>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
