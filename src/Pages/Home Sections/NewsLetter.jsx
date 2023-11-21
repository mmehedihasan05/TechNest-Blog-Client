import SectionTitle from "../../Components/SectionTitle";

import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
const NewsLetter = () => {
    const [email_, setEmail_] = useState("");
    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email_ === "") {
            toast.error("Type your email first");
        } else {
            toast.success("Thanks for subscribing to our newsletter");
        }
    };

    return (
        <div className="space-y-4 mt-8 lg:mt-0">
            <SectionTitle
                data={{
                    title: "Newsletter",
                    description: "Subscribe to your newsletter",
                    noBorder: true,
                }}
            ></SectionTitle>
            <form action="" onSubmit={handleSubscribe} className="space-y-6">
                <div className="max-w-md mx-auto">
                    <TextInput
                        id="email4"
                        type="email"
                        icon={HiMail}
                        placeholder="technest@gmail.com"
                        required
                        value={email_}
                        onChange={(e) => {
                            setEmail_(e.target.value);
                        }}
                    />
                </div>
                <div className="flex justify-center">
                    <button className="_btn _btn-secondary">Subscribe</button>
                </div>
            </form>
        </div>
    );
};

export default NewsLetter;
