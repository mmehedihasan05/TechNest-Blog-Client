import { Card } from "flowbite-react";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import "../CssStyles/Buttons.css";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const BlogCard = ({ blogData }) => {
    const axiosSecure = useAxiosSecure();

    const { _id, bannerUrl, title, category, shortDescription, isBookmarked } = blogData;

    const addBookmarkMutation = useMutation(async (bookmarkData) => {
        const response = await axiosSecure.patch("/addBookMark", bookmarkData);
        return response.data;
    });

    const AddBookmark = () => {
        addBookmarkMutation.mutate({ blogId: _id, userId: "123456" });
    };

    const RemoveBookmark = () => {};

    return (
        <Card className="" imgSrc={bannerUrl}>
            <div className="flex-auto">
                <p className="text-highlight font-medium ">{category}</p>
                <h5 className=" text-primary text-2xl font-bold tracking-tight ">{title}</h5>
            </div>

            <p className="text-secondary font-normal flex-auto">{shortDescription}</p>
            <div className="flex items-center justify-between ">
                <NavLink to={`/blogDetails/${_id}`}>
                    <button className="_btn _btn-readmore">Read Full Blog</button>
                </NavLink>
                <div className="text-2xl cursor-pointer">
                    {isBookmarked ? (
                        <button className="_btn" onClick={RemoveBookmark}>
                            <BsBookmarkCheckFill className="text-[--text-primary]" />
                        </button>
                    ) : (
                        <button className="_btn" onClick={AddBookmark}>
                            <BsBookmarkCheck className="text-[--text-primary]" />
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default BlogCard;

/*
{
    "_id": "65489521fa30c3ff3a45a05b",
    "bannerUrl": "https://i.ibb.co/wSzMTy1/Cybersecurity-4.jpg",
    "title": "Defending the Digital Fortress",
    "authorInfo": {
        "name": "Tania Akter",
        "imageUrl": "",
        "userId": ""
    },
    "category": "Cybersecurity",
    "creationTime": "2023-11-05T14:28:51.765Z",
    "shortDescription": "Explore the critical strategies and technologies that organizations and individuals can employ to safeguard their digital assets from cyber threats in an increasingly interconnected world.",
    "longDescription": "The digital age has brought unprecedented convenience and connectivity, but it has also given rise to a new breed of threats in the form of cyberattacks. In this blog, we embark on a journey to explore the essential strategies, tools, and technologies that empower organizations and individuals to protect their digital fortresses from cyber threats and security breaches.\n\n**The Changing Threat Landscape**\n\nThe world of cybersecurity is in a constant state of evolution. Cyber threats range from common viruses and malware to sophisticated, nation-state-sponsored attacks. As technology advances, so do the methods employed by cybercriminals, necessitating a dynamic defense strategy.\n\n**Understanding Cybersecurity**\n\nAt its core, cybersecurity is the practice of protecting digital systems, networks, and data from theft, damage, or unauthorized access. It encompasses a vast array of strategies and technologies that collectively act as the guardians of our digital realm.\n\n**Defense in Layers**\n\nA fundamental principle of cybersecurity is defense in depth. This strategy involves deploying multiple layers of security, each designed to counteract specific threats. It may include firewalls, intrusion detection systems, encryption, and secure access controls.\n\n**The Human Element: Awareness and Training**\n\nHuman error remains one of the leading causes of security breaches. Awareness and training programs are crucial for educating employees and individuals on cybersecurity best practices, from recognizing phishing attempts to using strong passwords.\n\n**Zero Trust: A New Paradigm**\n\nThe traditional approach of assuming trust within the perimeter of a network is evolving. The Zero Trust model advocates the concept of never trust, always verify. It involves rigorous identity verification for every user and device, even those within the network.\n\n**Artificial Intelligence and Machine Learning**\n\nAI and machine learning are revolutionizing cybersecurity. They are used to detect anomalies and potential threats in real time, helping organizations respond quickly to security incidents.\n\n**Encryption: Protecting Data at Rest and in Transit**\n\nEncryption is a vital component of cybersecurity. It ensures that data is protected both when it's stored and when it's transmitted. Encryption algorithms create a secure and unreadable version of data that can only be decrypted with the correct keys.\n\n**Incident Response and Recovery**\n\nDespite best efforts, breaches can occur. Preparedness is key. Organizations need an incident response plan to contain the threat, mitigate the damage, and recover from an attack.\n\n**Conclusion: Fortifying the Digital Fortress**\n\nIn an era when our digital lives are intrinsically intertwined with our physical world, cybersecurity is no longer an option but a necessity. Defending the digital fortress is an ongoing process that requires vigilance, education, and the strategic use of technology. As we face the ever-evolving landscape of cyber threats, we must adapt, innovate, and unite in our commitment to safeguarding our digital domain."
}
*/
