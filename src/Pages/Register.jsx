/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Authentication_3rdParty from "../Components/Authentication_3rdParty";
import SectionTitle from "../Components/SectionTitle";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "react-simple-captcha";
import { TfiReload } from "react-icons/tfi";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { userCreate, currentUser } = useContext(AuthContext);

    const location = useLocation();

    useEffect(() => {
        loadCaptchaEnginge(6, "#eeeefe");
    }, []);

    if (currentUser?.email && location?.state) {
        return <Navigate to={location.state} />;
    } else if (currentUser?.email && !location?.state) {
        return <Navigate to="/" />;
    }

    const handleUserCreate_emailPass = (e) => {
        e.preventDefault();

        // Getting data from Form
        let data = {
            userFullName: e.target.full_name?.value,
            userProfileImageUrl: e.target.profile_image_url?.value,
            userEmail: e.target.email?.value,
            userPassword: e.target.password?.value,
        };

        // captcha and password validation
        function validation(data, validate) {
            const uppercaseRegex = /^(?=.*[A-Z]).+$/;
            var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?~]+/;
            const numericCharRegex = /^(?=.*\d).+$/;

            if (!validate) return { success: true, msg: "" };

            if (!validateCaptcha(e.target.captcha.value)) {
                return "Captcha is not matched!";
            } else if (data.userPassword.length < 6) {
                return {
                    success: false,
                    msg: "Password should be equal or more than 6 characters",
                };
            } else if (!uppercaseRegex.test(data.userPassword)) {
                return { success: false, msg: "Password must contain an uppercase character" };
            } else if (!specialCharRegex.test(data.userPassword)) {
                return { success: false, msg: "Password must contain a special character" };
            } else if (!numericCharRegex.test(data.userPassword)) {
                return { success: false, msg: "Password must contain a numeric character" };
            } else {
                return { success: true, msg: "" };
            }
        }

        let response = validation(data);

        if (response.success) {
            userCreate(data)
                .then((response) => {
                    // Reset form after successfull login
                    e.target.reset();
                })
                .catch((error) => {});
        } else {
            toast.error(response.msg);
        }
    };

    return (
        <div className="custom-width  rounded-lg">
            <div
                className="loginRegister_Page "
                style={{
                    backgroundImage: `url(/images/register-bg.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="h-full w-full _overlay"></div>

                {/* Full Form */}
                <div
                    className="w-[85%] md:w-[90%] mx-auto lg:h-[80vh]
                 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 
                 py-8"
                >
                    <div
                        className=" _sub-content
                    col-span-2 lg:col-span-3 px-6 space-y-4
                    hidden md:flex flex-col justify-center
                    rounded-l-lg shadow-lg
                    "
                    >
                        <h2 className=" text-3xl lg:text-5xl text-white font-bold">
                            Already Have an Account?
                        </h2>
                        <div className="text-xl flex justify-center">
                            <Link to="/login">
                                <button className="_btn _btn-readmore ml-4">Login</button>
                            </Link>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div
                        className="col-span-2 rounded-lg md:rounded-none md:rounded-r-lg space-y-2
                    flex flex-col items-center justify-evenly py-4 px-4
                    contactFormParent shadow-lg"
                    >
                        <div className="">
                            <SectionTitle
                                data={{ title: "Register", noBorder: true }}
                            ></SectionTitle>
                        </div>
                        <div className="flex flex-col w-full">
                            <form
                                onSubmit={handleUserCreate_emailPass}
                                className="contactFormParent w-full 
                        flex flex-col gap-6"
                            >
                                {/* Full Name */}
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="full_name"
                                    className="_input"
                                    required
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    className="_input"
                                    required
                                />

                                {/* password */}
                                <div className="passwordParent">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        className="_input password"
                                        required
                                    />
                                    <div className="text-2xl cursor-pointer place-self-center passwordEye">
                                        {showPassword ? (
                                            <AiFillEye
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></AiFillEye>
                                        ) : (
                                            <AiFillEyeInvisible
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></AiFillEyeInvisible>
                                        )}
                                    </div>
                                </div>

                                {/* Image upload option */}
                                <div>
                                    <div>Upload your image</div>
                                    <input
                                        type="file"
                                        name="profile_image_url"
                                        className="file-input file-input-bordered w-full max-w-xs"
                                        required
                                    />
                                </div>

                                {/* Captcha */}
                                <div className="flex items-center gap-2">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Captcha"
                                            name="captcha"
                                            className="_input"
                                            required
                                        />
                                    </div>
                                    <div id="captchaShow" className="">
                                        <LoadCanvasTemplate reloadText=" " reloadColor="#454360" />
                                    </div>
                                </div>

                                <input
                                    className="_btn _btn-primary "
                                    type="submit"
                                    value="Register"
                                />
                            </form>

                            <Authentication_3rdParty actionName="register"></Authentication_3rdParty>
                        </div>
                    </div>

                    {/* For mobile */}
                    <div
                        className=" block md:hidden w-full col-span-2 my-8 
                    rounded-lg px-2 py-4 authentication-toggle"
                    >
                        <h2 className="text-lg  _text-deep font-bold pb-2">
                            Already Have an Account?
                        </h2>
                        <div className="text-xl flex justify-center">
                            <Link to="/login">
                                <button className="_btn _btn-readmore">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Helmet>
                <title>Register - Technest</title>
            </Helmet>
        </div>
    );
};

export default Register;
