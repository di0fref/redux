import Sidebar from "./Sidebar";
import Notelist from "./Notelist";
import Content from "./Content";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import TodoList from "./TodoList";
import {setCurrentFolder} from "../features/currentFolderSlice";
import {setCurrentNote} from "../features/currentNoteSlice";
import {useParams} from "react-router-dom";
import {fetchAllNotes} from "../features/noteSlice";
import {setSidebarOpen} from "../features/sideSlice";

export default function Main() {
    const sidebar = useSelector((state) => state.side.sidebar)
    const notelist = useSelector((state) => state.side.notelist)

    const currentFolder = useSelector(state => state.currentFolder)
    let params = useParams()
    const dispatch = useDispatch();
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        ReactTooltip.rebuild()
        dispatch(fetchAllNotes())
    }, [])

    useEffect(() => {
        if(params.folder_id){
            dispatch(setCurrentFolder(params.folder_id))
        }
        else{
            dispatch(setCurrentFolder("docs"))
        }
        if(!params.note_id)
        dispatch(setCurrentNote(null))

    }, [params.folder_id])
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
            <div className={`print:hidden flex ${sidebar ? "ml-0" : "-ml-72"} transition-all absolute md:relative z-10 w-full md:w-auto`}>
                <div className={`${sidebar ? "ml-0" : "md:ml-0 -ml-72"} md:w-72 w-1/2 h-screen overflow-y-auto md:h-full bg-gray-900 bg-gray-900 text-gray-300 flex-shrink-0 `}>
                    <Sidebar/>
                </div>
                {/*<div className={`${notelist ? "ml-0" : "md:ml-0 -ml-80"} md:w-80 w-1/2 h-screen md:h-full bg-white dark:bg-gray-800 flex-shrink-0 `}>*/}
                {/*    <Notelist/>*/}
                {/*</div>*/}
            </div>
            <div className={"flex-grow h-full bg-white dark:bg-gray-900 editor"}>
                <Content/>
            </div>
        </div>
        // <div className={`flex h-screen bg-white dark:bg-gray-900_ `}>
        //     <div className={`${sidebar ? "ml-0" : "-ml-72"} z-50  transition-all absolute md:relative w-72 h-screen overflow-y-auto md:h-full bg-gray-900 bg-gray-900 text-gray-300 flex-shrink-0 `}>
        //         <Sidebar/>
        //     </div>
        //     <div
        //         // style={{backgroundColor: "rgb(241 245 249)"}}
        //         className={"flex-grow bg-gray-100 dark:bg-gray-900"}>
        //         <Content/>
        //     </div>
        //     <div onClick={() => dispatch(setSidebarOpen(false))} className={`${sidebar ? "visible md:hidden" : "hidden"} fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full`} id="my-modal"/>
        // </div>

    )
}
