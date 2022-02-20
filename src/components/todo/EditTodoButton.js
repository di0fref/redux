import {Fade, Modal, Backdrop, Slide} from "@mui/material";
import React, {forwardRef, useEffect, useState} from "react";
import {BiCheckCircle, BiDotsVertical, BiPlus, BiTrash, BiX} from "react-icons/bi";
import {FaRegCalendarAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, toggleTodoCompleted, updateTodo} from "../../features/todoSlice";
import DatePicker from "react-datepicker";
import {Menu} from '@headlessui/react'

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {getPrio, getPrioColor} from "../../config/config";
import SimpleDialog from "../SimpleDialog";

export default function EditTodoButton({canShow, updateModalState, todoId}) {

    const todo = useSelector(state => state.todos.find(todo => todo.id == todoId))
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("")
    const [taskText, setTaskText] = useState("")
    const [taskDue, setTaskDue] = useState(null)
    const [taskPriority, setTaskPriority] = useState("")
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        setTaskDue(todo.due ? new Date(todo.due) : null)
        setTaskName(todo.name)
        setTaskPriority(todo.prio)
        setTaskText(todo.text)
    }, [todoId])

    const handleSubmit = () => {
        const m = moment(taskDue)
        dispatch(updateTodo(
            {
                name: taskName,
                due: m.isValid() ? m.format("YYYY-MM-DD") : null,
                text: taskText,
                id: todo.id,
                prio: taskPriority
            }
        )).then((result) => {
            handleModalClose()
        })
    }

    const deleteTodoHandler = () => {
        // dispatch(deleteTodo(todo.id))
        setOpenDialog(true)
    }

    const doDeleteTodo = () => {
        dispatch(deleteTodo(todo.id))
    }

    const handleModalClose = () => {
        updateModalState()
    };
    const handleDialogClose = () => {
        setOpenDialog(!openDialog)
    }

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={"py-2 px-4 bg-gray-100 rounded-2xl flex items-center text-sm dark:bg-gray-700"} onClick={onClick} ref={ref}>
            <FaRegCalendarAlt className={"text-gray-600 dark:text-gray-400"}/>
            {!value ? <span className={"ml-1 text-sm"}>Not set</span> : <span className={"ml-1"}>{value}</span>}
        </button>
    ));

    return (
        <div>
            <SimpleDialog submitAction={doDeleteTodo} canShow={openDialog} updateModalState={handleDialogClose} title={"Delete task"} text={"Are you sure you want to delete this task? This action cannot be undone!"}/>
            <Modal open={canShow} onClose={handleModalClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 300,
                   }}>
                <Slide in={canShow} direction={"left"}>
                    <div className={"absolute top-0 right-0 md:w-100 w-full "}>
                        <div className={"bg-white h-screen dark:bg-gray-900 dark:text-gray-300"}>
                            <div className={"flex items-center justify-between px-4 py-2"}>
                                <button onClick={() => dispatch(toggleTodoCompleted(todo))} className={"flex items-center gap-x-2 bg-indigo-500_ rounded-3xl py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800"}>
                                    <BiCheckCircle className={`${todo.completed?"text-indigo-500":"text-gray-500"} h-6 w-6 `}/>
                                    <span className={"whitespace-nowrap uppercase text-sm font-semibold text-gray-600 tracking-tighter dark:text-gray-400"}>Mark as complete</span>
                                </button>

                                <Menu as="div" className="relative inline-block text-left w-full flex justify-end mr-4">
                                    <Menu.Button>
                                        <BiDotsVertical className={"h-6 w-6"}/>
                                    </Menu.Button>
                                    <Menu.Items className={"py-1 z-10 dark:highlight-white_ bg-white text-slate-800 dark:bg-slate-700 absolute right-0 _md:left-72 w-72 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                                        <Menu.Item>
                                            {({active}) => (
                                                <div
                                                    onClick={deleteTodoHandler}
                                                    className={`${
                                                        active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                    } group flex items-center  w-full px-2 py-2 text-sm cursor-pointer`}>
                                                    <span className={"mr-4 text-gray-600 dark:text-gray-200"}><BiTrash/></span>
                                                    <span className={"m3-4"}>Delete task</span>

                                                </div>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>


                                <button className={""} onClick={handleModalClose}>
                                    <BiX className={"h-8 w-8"}/>
                                </button>
                            </div>
                            <div className={"px-8 flex flex-col"}>
                                <span className={"font-semibold text-sm mb-2"}>Task title</span>
                                <textarea value={taskName} autoFocus={true} className={"text-sm p-2 ring-1 resize-none rounded ring-gray-300 dark:ring-gray-700 focus:outline-0 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-800"} onChange={(e) => setTaskName(e.target.value)}/>
                            </div>
                            <div className={"flex p-8 gap-x-8 items-center"}>
                                <div className={"flex flex-col"}>
                                    <span className={"font-semibold text-sm mb-2 mt-3"}>Priority</span>
                                    <Menu as="div" className="relative inline-block text-left w-full">
                                        <Menu.Button className={`py-2 px-4 rounded-2xl flex items-center ${getPrioColor(taskPriority)} `}>

                                            <span className={`text-sm`}>{getPrio(taskPriority)}</span>
                                            <span className={"ml-2 text-sm"}>{taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</span>

                                        </Menu.Button>
                                        <Menu.Items className={"py-1 z-10 dark:highlight-white_ bg-white text-slate-800 dark:bg-slate-700 absolute right-0 _md:left-72 w-72 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <div
                                                        onClick={() => setTaskPriority("low")}
                                                        className={`${
                                                            active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                        } group flex items-center justify-between w-full px-2 py-2 text-sm cursor-pointer`}>
                                                        <span className={"ml-4"}>Low</span>
                                                        <span className={"mr-4 text-gray-600 dark:text-gray-200"}>{getPrio("low")}</span>

                                                    </div>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>

                                                {({active}) => (
                                                    <div
                                                        onClick={() => setTaskPriority("normal")}
                                                        className={`${
                                                            active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                        } group flex items-center w-full justify-between px-2 py-2 text-sm cursor-pointer`}>
                                                        <span className={"ml-4"}>Medium</span>
                                                        <span className={"mr-4 text-gray-600 dark:text-gray-200"}>{getPrio("normal")}</span>
                                                    </div>
                                                )}


                                            </Menu.Item>
                                            <Menu.Item>

                                                {({active}) => (
                                                    <div
                                                        onClick={() => setTaskPriority("high")}
                                                        className={`${
                                                            active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                        } group flex items-center justify-between w-full px-2 py-2 text-sm cursor-pointer`}>
                                                        <span className={"ml-4"}>High</span>
                                                        <span className={"mr-4 text-gray-600 dark:text-gray-200"}>{getPrio("high")}</span>
                                                    </div>
                                                )}


                                            </Menu.Item>
                                        </Menu.Items>

                                    </Menu>

                                </div>

                                <div className={"flex flex-col"}>
                                    <span className={"font-semibold text-sm mb-2 mt-3"}>Due date</span>
                                    <DatePicker
                                        selected={taskDue}
                                        onChange={(date) => setTaskDue(date)}
                                        customInput={<DateCustomInput/>}
                                        dateFormat={"yyyy-MM-dd"}
                                    />
                                </div>
                            </div>
                            <div className={"px-8 flex flex-col mb-6"}>
                                <span className={"font-semibold text-sm mb-2"}>Notes</span>
                                <textarea value={taskText} className={"text-sm p-2 ring-1 resize-none rounded ring-gray-300 dark:ring-gray-700 focus:outline-0 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-800"} onChange={(e) => setTaskText(e.target.value)}></textarea>
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
                                ease-in-out`} onClick={handleSubmit}>Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Slide>
            </Modal>
        </div>
    )
}
