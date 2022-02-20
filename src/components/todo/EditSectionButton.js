import {Fade, Modal, Backdrop, Slide} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BiDotsVertical, BiTrash, BiX} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, updateTodo} from "../../features/todoSlice";
import "react-datepicker/dist/react-datepicker.css";
import {Menu} from "@headlessui/react";
import SimpleDialog from "../SimpleDialog";


export default function EditSectionButton({canShow, updateModalState, todoId}) {

    const todo = useSelector(state => state.todos.find(todo => todo.id == todoId))

    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("")
    const [taskText, setTaskText] = useState("")
    const [openDialog, setOpenDialog] = useState(false)

    const handleSubmit = () => {
        dispatch(updateTodo(
            {
                name: taskName,
                text: taskText,
                id: todo.id
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
    useEffect(() => {
        setTaskName(todo.name)
        setTaskText(todo.text)
    }, [todoId])


    const handleModalClose = () => {
        updateModalState()
    };
    const handleDialogClose = () => {
        setOpenDialog(!openDialog)
    }
    return (
        <div>
            <SimpleDialog submitAction={doDeleteTodo} canShow={openDialog} updateModalState={handleDialogClose} title={"Delete section"} text={"Are you sure you want to delete this section? This action cannot be undone!"}/>

            <Modal open={canShow} onClose={handleModalClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 300,
                   }}>
                <Slide  in={canShow} direction={"left"}>
                    <div className={"absolute top-0 right-0 md:w-100 w-full "}>
                        <div className={"bg-white h-screen dark:bg-gray-900 dark:text-gray-300"}>
                            <div className={"flex items-center justify-end px-4 py-2"}>
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
                                                    <span className={"m3-4"}>Delete section</span>

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
                                <span className={"font-semibold text-sm mb-2"}>Section title</span>
                                <textarea value={taskName} autoFocus={true} className={"text-sm p-2 ring-1 resize-none rounded ring-gray-300 dark:ring-gray-700 focus:outline-0 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-800"} onChange={(e) => setTaskName(e.target.value)}/>
                            </div>
                            <div className={"px-8 flex flex-col mb-6"}>
                                <span className={"font-semibold text-sm mb-2 mt-4"}>Notes</span>
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
