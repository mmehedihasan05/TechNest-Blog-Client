const userDelete = ({ targetedUserData, handleUserDelete }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2_delete" className="modal">
                <div className="modal-box space-y-8">
                    <h3 className="font-bold text-lg">Do you really want to delete this user?</h3>
                    <div className="flex items-center gap-4">
                        <img
                            src={targetedUserData?.photoURL}
                            className="w-8 h-8 rounded-full"
                            alt=""
                        />
                        <div>
                            <p className="">{targetedUserData?.displayName}</p>
                            <p className="">{targetedUserData?.email}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            className="_btn _btn-secondary flex mx-auto"
                            onClick={() => {
                                handleUserDelete(targetedUserData);
                            }}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button id="modal_close_delete">close</button>
                </form>
            </dialog>
        </div>
    );
};

export default userDelete;
