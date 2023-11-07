import NavBar from "./Sections/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Sections/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <div id="appRoot" className="pt-4 space-y-8">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Root;
