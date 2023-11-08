import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletorForCard = () => {
    return (
        <div>
            <Skeleton height={200} count={1} />
            <Skeleton height={50} count={1} />
            <Skeleton count={5} />

            <Skeleton height={50} count={1} />
        </div>
    );
};

export default SkeletorForCard;
