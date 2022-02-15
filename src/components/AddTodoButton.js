import {Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BiCheckCircle, BiPlus, BiX} from "react-icons/bi";
import {modalstyleRight} from "../config/styles";
import {FaCalendar, FaClock, FaRegCalendarAlt, FaRulerHorizontal, FaTimes} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addTodo} from "../features/todoSlice";
import {MdHorizontalRule} from "react-icons/md";

export default function AddTodoButton() {

    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => {
        setModalOpen(true)
        // dispatch(addTodo({
        //     task_list_id: 0
        // }))
    };
    const handleModalClose = () => {
        setModalOpen(false)
    };

    useEffect(() => {
        console.log("useEffect")
    }, [])

    return (
        <>
            <div className={"flex items-center"}>
                <button className={"bg-indigo-500 hover:bg-indigo-700 rounded rounded-3xl px-5 py-2 flex items-center"} onClick={handleModalOpen}>
                    <span><BiPlus className={"text-white font-bold h-5 w-5"}/></span>
                    <span className={"text-white text-sm font-medium"}>Add task</span>
                </button>
            </div>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <div className={"absolute top-0 right-0 md:w-1/2 w-full"}>
                    <div className={"bg-white h-screen"}>
                        <div className={"flex items-center justify-between px-4 py-6"}>
                            <button className={"flex items-center gap-x-2 bg-indigo-500_ rounded-3xl py-2 px-3 hover:bg-gray-200"}>
                                <BiCheckCircle className={"h-6 w-6 text-gray-500"}/>
                                <span className={"uppercase text-sm font-semibold text-gray-600 tracking-tighter"}>Mark as complete</span>
                            </button>
                            <button className={""} onClick={handleModalClose}>
                                <BiX className={"h-8 w-8"}/>
                            </button>
                        </div>
                        <div className={"px-8 flex flex-col"}>
                            <span className={"font-semibold text-sm mb-2"}>Task title</span>
                            <textarea className={"p-4 ring-1 resize-none rounded ring-gray-300 focus:outline-0 focus:ring-indigo-500"} onChange={(e) => setTaskTitle(e.target.value)}></textarea>
                        </div>
                        <div className={"flex p-8 gap-x-8"}>

                            <div className={"flex flex-col"}>
                                <span className={"font-semibold text-sm mb-2 mt-6"}>Priority</span>
                                <button className={"py-2 px-4 bg-gray-100 rounded-2xl flex items-center"}>
                                    <MdHorizontalRule className={"text-gray-600"}/>
                                    <span className={"ml-1 text-sm"}>Not set</span>
                                </button>
                            </div>

                            <div className={"flex flex-col"}>
                                <span className={"font-semibold text-sm mb-2 mt-6"}>Due date</span>
                                <button className={"py-2 px-4 bg-gray-100 rounded-2xl flex items-center"}>
                                    <FaRegCalendarAlt className={"text-gray-600"}/>
                                    <span className={"ml-1 text-sm"}>Not set</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
