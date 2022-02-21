import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TodoList from "./TodoList";
import ReactTooltip from "react-tooltip";
import {setCurrentFolder} from "../features/currentFolderSlice";
import {setSidebarOpen} from "../features/sideSlice";
import {fetchAllNotes} from "../features/noteSlice";
import {getAll} from "../features/todoSlice";
import Documents from "./Documents";

export default function Docs() {
    const sidebar = useSelector((state) => state.side.sidebar)

    const dispatch = useDispatch()
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        ReactTooltip.rebuild()
        dispatch(setCurrentFolder("tasks"))
        dispatch(getAll())
    }, [])

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
            dispatch(setSidebarOpen(
                (window.innerWidth >= 768)
            ))
        }
        window.addEventListener('resize', handleResize)
    })

    return (
        <div className={`flex h-screen bg-white dark:bg-gray-900_ `}>
            <div className={`${sidebar ? "ml-0" : "-ml-72"} z-50  transition-all absolute md:relative w-72 h-screen overflow-y-auto md:h-full bg-gray-900 bg-gray-900 text-gray-300 flex-shrink-0 `}>
                <Sidebar/>
            </div>
            <div className={"flex-grow bg-white dark:bg-gray-900"}>
                <Documents/>
            </div>
            <div onClick={() => dispatch(setSidebarOpen(false))} className={`${sidebar ? "visible md:hidden" : "hidden"} fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full`} id="my-modal"/>
        </div>

    )
}
