/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Authentication_3rdParty from "../Components/Authentication_3rdParty";
import SectionTitle from "../Components/SectionTitle";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const { userCreate, currentUser } = useContext(AuthContext);

    const location = useLocation();

    if (currentUser?.email && location?.state) {
        return <Navigate to={location.state} />;
    } else if (currentUser?.email && !location?.state) {
        return <Navigate to="/" />;
    }

    const handleUserCreate_emailPass = (e) => {
        e.preventDefault();
        setError("");

        // Getting data from Form
        let data = {
            userFullName: e.target.full_name?.value,
            userProfileImageUrl: e.target.profile_image_url?.value,
            userEmail: e.target.email?.value,
            userPassword: e.target.password?.value,
        };

        function passwordValidation() {
            // Validation
            const uppercaseRegex = /^(?=.*[A-Z]).+$/;
            var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?~]+/;

            if (data.userPassword.length < 6) {
                setError("Password should be equal or more than 6 characters");
                return "";
            } else if (!uppercaseRegex.test(data.userPassword)) {
                setError("Password must contain an uppercase character");
                return;
            } else if (!specialCharRegex.test(data.userPassword)) {
                setError("Password must contain a special character");
                return;
            }
        }
        // passwordValidation();

        userCreate(data)
            .then((response) => {
                // Reset form after successfull login
                e.target.reset();
            })
            .catch((error) => {});
    };

    return (
        <div className="max-w-7xl mx-auto rounded-lg">
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
                    className="w-[85%] md:w-[90%] mx-auto h-[80vh]
                 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 
                 py-8 "
                >
                    <div
                        className=" _sub-content
                    col-span-2 lg:col-span-3 px-6 space-y-4
                    hidden md:flex flex-col justify-center
                    rounded-l-lg
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

                    {/* Login Form */}
                    <div
                        className="col-span-2 rounded-lg md:rounded-none md:rounded-r-lg space-y-2
                    flex flex-col items-center justify-evenly py-4 px-4
                    contactFormParent"
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
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="full_name"
                                    className="_input"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Profile Image URL"
                                    name="profile_image_url"
                                    className="_input"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    className="_input"
                                    required
                                />

                                <div className="passwordParent">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        className="_input password"
                                        required
                                        defaultValue="sad##sad55_"
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
                            Don't Have an Account?
                        </h2>
                        <div className="text-xl flex justify-center">
                            <Link to="/register">
                                <button className="_btn _btn-fill ml-4 px-16">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
