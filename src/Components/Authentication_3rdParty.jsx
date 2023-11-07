import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const Authentication_3rdParty = ({ actionName }) => {
    const { googleLogin, githubLogin } = useContext(AuthContext);

    const handleUserCreate_3rdParty = (media) => {
        if (actionName === "login") {
            return media("Logged in Successfully");
        } else if (actionName === "register") {
            return media("Registered Successfully");
        }
    };

    return (
        <div className="w-full">
            {/* Continue Using Text */}
            <div className="flex items-center justify-center w-[90%] mx-auto">
                <div className="border border-[var(--text-medium)] flex-1 h-0"></div>
                <h1 className="text-base font-semibold px-2 py-2 _text-medium">Continue Using</h1>
                <div className="border border-[var(--text-medium)] flex-1 h-0"></div>
            </div>

            {/* Login With Google/Github */}
            <div className="flex gap-4 mt-4 justify-center">
                {/* Google */}
                <div className="">
                    <button
                        className="_btn _btn-primary social-login
                                flex justify-center items-center
                                px-2"
                        onClick={() => handleUserCreate_3rdParty(googleLogin)}
                    >
                        <div>Google</div>
                    </button>
                </div>

                {/* Github */}
                <div>
                    <button
                        className=" _btn _btn-primary social-login
                                flex justify-center items-center
                                px-2"
                        onClick={() => handleUserCreate_3rdParty(githubLogin)}
                    >
                        <div>Github</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Authentication_3rdParty;
