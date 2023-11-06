/* eslint-disable react/no-unescaped-entities */
const SectionTitle = ({ data }) => {
    const { title, description } = data;
    return (
        <div className="flex items-center justify-center">
            <div className="border-b-[3px] w-36 border-[--text-highlight]"></div>
            <div className="text-center px-4">
                <h1 className="text-primary sectionHeading text-4xl font-semibold ">{title}</h1>
                <div className="">{description}</div>
            </div>
            <div className="border-b-[3px] w-36 border-[--text-highlight]"></div>
        </div>
    );
};

export default SectionTitle;
