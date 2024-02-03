import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import OptionsItem from "./OptionsItem";
import ModalProvider from "./Modal";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import Button from "./Button";
import { useState } from "react";

function Options({
    handleOptions,
    userId,
    deleteHandler,
    currentItem,
    tweetEdit,
}) {
    const { currentUser } = useCurrentUser();
    const [content, setContent] = useState(tweetEdit?.tweet);

    return (
        <div className="absolute right-2 top-1 flex flex-col justify-end items-end text-sm rotate-90">
            <ModalProvider>
                <ModalProvider.ModalOpen opens="options">
                    <HiOutlineDotsVertical
                        className="cursor-pointer"
                        onClick={handleOptions}
                    />
                </ModalProvider.ModalOpen>

                <ModalProvider.ModalWindow
                    window="options"
                    clickOutside={false}
                >
                    <OptionsItem>
                        <FaShare /> Share
                    </OptionsItem>
                    {currentUser?.data?._id === userId && (
                        <>
                            <OptionsItem>
                                <ModalProvider>
                                    <ModalProvider.ModalOpen opens="input">
                                        <button className="flex gap-4 items-center">
                                            <FaEdit /> Edit
                                        </button>
                                    </ModalProvider.ModalOpen>
                                    <ModalProvider.ModalWindow
                                        window="input"
                                        clickOutside={false}
                                    >
                                        {/* {tweet edit window} */}
                                        {tweetEdit && (
                                            <form
                                                onSubmit={(e) =>
                                                    tweetEdit?.editHandler(
                                                        e,
                                                        tweetEdit?.tweetId,
                                                        { content: content }
                                                    )
                                                }
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <input
                                                    onChange={(e) =>
                                                        setContent(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-transparent outline-none border-[0.5px] border-zinc-400 rounded-md p-2 text-zinc-100"
                                                    type="text"
                                                    defaultValue={
                                                        tweetEdit?.tweet
                                                    }
                                                />
                                                <Button
                                                    disabled={
                                                        tweetEdit?.loading
                                                    }
                                                    extrastyles="rounded-sm h-[30px]"
                                                    type="primary"
                                                >
                                                    SAVE
                                                </Button>
                                            </form>
                                        )}
                                    </ModalProvider.ModalWindow>
                                </ModalProvider>
                            </OptionsItem>

                            <OptionsItem>
                                <Button
                                    onClick={() => {
                                        deleteHandler(currentItem);
                                    }}
                                    type="danger"
                                >
                                    <MdDelete />
                                    Delete
                                </Button>
                            </OptionsItem>
                        </>
                    )}
                </ModalProvider.ModalWindow>
            </ModalProvider>
        </div>
    );
}

export default Options;
