const CommentCard = ({ commentData }) => {
    const { comment, commented_userImage, commented_userName } = commentData;
    return (
        <div className="flex items-center gap-4 bg-white shadow-md px-4 py-4 rounded-md">
            <div>
                <img src={commented_userImage} alt="" className="h-[45px] w-[45px] rounded-full" />
            </div>
            <div>
                <h3 className="text-primary font-semibold text-base">{commented_userName}</h3>
                <p className="text-secondary">{comment}</p>
            </div>
        </div>
    );
};

export default CommentCard;
