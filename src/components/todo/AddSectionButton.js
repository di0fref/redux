import {Fade, Modal, Backdrop, Slide} from "@mui/material";
import React, {forwardRef, useState} from "react";
import {BiCheckCircle, BiPlus, BiX} from "react-icons/bi";
import {FaRegCalendarAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addTodo} from "../../features/todoSlice";
import DatePicker from "react-datepicker";
import {Menu} from '@headlessui/react'

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {getPrio} from "../../config/config";
import ReactTooltip from "react-tooltip";

export default function AddSectionButton() {

    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("")
    const [taskText, setTaskText] = useState("")

    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    };

    const handleSubmit = () => {
        dispatch(addTodo(
            {
                name: taskName,
                due: null,
                text: taskText,
                prio: "normal",
                type: "section"
            }
        )).then((result) => {
            handleModalClose()
        })
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setTaskText("")
        setTaskName("")
        ReactTooltip.rebuild();
    };


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={"py-2 px-4 bg-gray-100 rounded-2xl flex items-center text-sm dark:bg-gray-700"} onClick={onClick} ref={ref}>
            <FaRegCalendarAlt className={"text-gray-600 dark:text-gray-400"}/>
            {!value ? <span className={"ml-1 text-sm"}>Not set</span> : <span className={"ml-1"}>{value}</span>}
        </button>
    ));

    return (
        <div>
            <div className={"flex items-center"}>
                <button className={"bg-black hover:bg-black/70 dark:bg-gray-600 hover:bg-black rounded rounded-3xl px-5 py-2 flex items-center dark:hover:bg-gray-700"} onClick={handleModalOpen}>
                    <span><BiPlus className={"text-white font-bold h-5 w-5"}/></span>
                    <span className={"text-white text-sm font-medium"}>Section</span>
                </button>
            </div>
            <Modal open={modalOpen} onClose={handleModalClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 300,
                   }}>
                <Slide  in={modalOpen} direction={"left"}>
                    <div className={"absolute top-0 right-0 md:w-100 w-full "}>
                        <div className={"bg-white h-screen dark:bg-gray-900 dark:text-gray-300"}>
                            <div className={"flex items-center justify-end px-4 py-2"}>
                                <button className={""} onClick={handleModalClose}>
                                    <BiX className={"h-8 w-8"}/>
                                </button>
                            </div>
                            <div className={"px-8 flex flex-col"}>
                                <span className={"font-semibold text-sm mb-2"}>Section title</span>
                                <textarea autoFocus={true} className={"text-sm p-2 ring-1 resize-none rounded ring-gray-300 dark:ring-gray-700 focus:outline-0 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-800"} onChange={(e) => setTaskName(e.target.value)}/>
                            </div>
                            <div className={"px-8 flex flex-col mb-6"}>
                                <span className={"font-semibold text-sm mb-2 mt-4"}>Notes</span>
                                <textarea className={"text-sm p-2 ring-1 resize-none rounded ring-gray-300 dark:ring-gray-700 focus:outline-0 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-800"} onChange={(e) => setTaskText(e.target.value)}></textarea>
                            </div>
                            <div className={"mx-8"}>
                                <button className={`w-full
                                px-6
                                py-2.5
                                bg-indigo-500
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                rounded-2xl
                                shadow-md
                                hover:bg-indigo-600 hover:shadow-lg
                                focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-indigo-600 active:shadow-lg
                                transition
                                duration-150
                                ease-in-out`} onClick={handleSubmit}>Create
                                </button>
                            </div>
                        </div>
                    </div>
                </Slide>
            </Modal>
        </div>
    )
}
