import {BiFolderPlus, BiListPlus} from "react-icons/bi";
import {Modal} from "@mui/material";
import {useState} from "react";
import {modalstyleSmall} from "../config/styles";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addTaskList} from "../features/todoSlice";

export default function NewTaskListButton(props) {

    const [modalOpen, setModalOpen] = useState(false)
    const [taskListName, setTaskListName] = useState("")
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => {
        setModalOpen(false)
        setShowError(false)
    };

    const handleFormSubmit = (e) => {
        if (taskListName === "") {
            setShowError(true)
        } else {
            setShowError(false)
            dispatch(addTaskList({
                name: taskListName
            })).then((res) => {
                setTaskListName("")
                handleModalClose()
                navigate(`/app/tasks/list/${res.payload.id}`)
            })
        }
    }

    const setTaskListNameHandler = (e) => {
        setTaskListName(e.target.value)
        setShowError(false)
    }
    return (
        <>

            <button data-tip={"New task list"} onClick={handleModalOpen} className={"hover:bg-indigo-500_ rounded mr-2 flex items-center"}>
                <div className={"flex items-center"}>
                    <BiListPlus className={"text-gray-400 h-8 w-8 hover:text-white p-1 flex items-center"}/>
                </div>
            </button>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <div style={modalstyleSmall} className={"block p-6 rounded shadow-lg bg-white max-w-sm dark:bg-gray-700"}>
                    <div className={"bg-white dark:bg-gray-700 form-group mb-6"}>
                        <label htmlFor="foldername" className="form-label inline-block mb-2 text-gray-700 dark:text-gray-200 font-medium">
                            Create new Task list</label>
                        <input type="text" autoFocus={true} className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                bg-white_ bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none dark:bg-gray-200"
                               id="tasklistname"
                               aria-describedby="emailHelp" placeholder="Enter task list name" value={taskListName}
                               onChange={setTaskListNameHandler}
                               onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                       handleFormSubmit(e)
                                   }
                               }}
                        />

                        <div className={`h-8`}>
                            <span className={`${showError ? "block" : "hidden"} error text-red-500 text-sm`}>Please enter a task list name</span>
                        </div>

                        <button onClick={handleFormSubmit} className="

                                      w-full
                                      px-6
                                      py-2.5
                                      bg-indigo-500
                                      text-white
                                      font-medium
                                      text-xs
                                      leading-tight
                                      uppercase
                                      rounded
                                      shadow-md
                                      hover:bg-indigo-600 hover:shadow-lg
                                      focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0
                                      active:bg-indigo-600 active:shadow-lg
                                      transition
                                      duration-150
                                      ease-in-out">Create
                        </button>
                    </div>
                </div>
            </Modal>
        </>

    )
}
