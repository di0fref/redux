import Sidebar from "./Sidebar";
import Notelist from "./Notelist";
import Content from "./Content";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import TodoList from "./TodoList";
import {setCurrentFolder} from "../features/currentFolderSlice";
import {setCurrentNote} from "../features/currentNoteSlice";
import {useParams} from "react-router-dom";
import {fetchAllNotes, updateBookMark, updateLock} from "../features/noteSlice";
import {setDocView, setNotelistOpen, setSidebarOpen} from "../features/sideSlice";
import {BiLock, BiMenu} from "react-icons/bi";
import {FaBars, FaRegStar, FaStar} from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import NoteMenu from "./menus/noteMenu";
import {createSelector} from "reselect";
import {BsLayoutSidebar, BsLayoutThreeColumns} from "react-icons/bs";
import LayoutButtons from "./LayoutButtons";

export default function Main() {
    const sidebar = useSelector((state) => state.side.sidebar)
    const notelist = useSelector((state) => state.side.notelist)
    const currentNote = useSelector((state) => state.currentNote)

    const selectNote = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).find(note => note.id == currentNote)
    )
    const note = useSelector(selectNote);
    const currentFolder = useSelector(state => state.currentFolder)
    let params = useParams()
    const dispatch = useDispatch();
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        ReactTooltip.rebuild()
        dispatch(fetchAllNotes())
    }, [])

    useEffect(() => {
        if (params.folder_id) {
            dispatch(setCurrentFolder(params.folder_id))
        } else {
            dispatch(setCurrentFolder("docs"))
        }

    }, [params.folder_id,])

    // useEffect(() => {
    //     console.log(params);
    //     dispatch(setCurrentNote(params.note_id))
    // }, [params.note_id])


    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
            dispatch(setSidebarOpen(
                (window.innerWidth >= 768)
            ))
        }

        window.addEventListener('resize', handleResize)
    })

    const bookMarkHandler = () => {
        dispatch(updateBookMark({
            bookmark: note.bookmark ? 0 : 1,
            id: currentNote
        })).then((r) => {
            ReactTooltip.rebuild()
        })
    }

    const lockHandler = () => {
        dispatch(updateLock({
            locked: note.locked ? 0 : 1,
            id: currentNote
        })).then((r) => {
            ReactTooltip.rebuild()
        })
    }
    return (
        <div className={`flex _h-screen bg-white dark:bg-gray-900_ `}>
            <div className={`${sidebar ? "ml-0" : "-ml-72"} transition-all absolute md:relative z-20 md:w-72 w-1/2 h-screen overflow-y-auto md:h-full bg-gray-900 bg-gray-900 text-gray-300 flex-shrink-0 `}>
                <Sidebar/>
            </div>


            <div className={"w-full"}>
                <div className={"text-slate-500 print:hidden bg-gray-200 border-b-gray-300/50 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
                    <button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"} onClick={() => dispatch(setSidebarOpen(!sidebar))}>
                        <BiMenu className={"h-6 w-6"}/>
                    </button>
                    {currentNote ?
                        <div className={"px-3 my-4 w-full"}>
                            <div className={"flex justify-end"}>
                                <button data-tip={"Bookmark"} className={"flex items-center hover:text-indigo-500 mr-3"} onClick={bookMarkHandler}>
                                    {note && note.bookmark
                                        ? <FaStar className={"text-yellow-400"}/>
                                        : <FaRegStar/>
                                    }
                                </button>
                                <button data-tip={`${note && note.locked ? "Unlock" : "Lock"}`} className={"flex items-center hover:text-indigo-500"} onClick={lockHandler}>
                                    {note && note.locked
                                        ? <BiLock className={"text-red-600"}/>
                                        : <BiLock/>
                                    }
                                </button>
                            </div>
                        </div>
                        : ""}
                    {currentNote
                        ? <div className={"ml-auto"}><NoteMenu/></div>
                        : null
                    }
                    <ThemeSwitcher/>
                </div>
                <div className={"flex flex-row content-wrapper"}>
                    <div className={`${notelist ? "ml-0" : sidebar ? "-ml-80" : "-ml-80"} transition-all z-10 absolute md:relative w-80 _w-full _h-screen _md:h-full bg-white dark:bg-gray-800 flex-shrink-0 `}>
                        <Notelist/>
                    </div>
                    <div className={"flex-grow h-full_ bg-white dark:bg-gray-900 editor"}>
                        <div className={"w-full bg-indigo-500_ px-2 pt-4"}>
                            <button data-tip={"Toggle document list"}  className={"dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"} onClick={() => dispatch(setNotelistOpen(!notelist))}><BiMenu className={"h-6 w-6"}/>
                            </button>
                        </div>
                        <Content/>
                    </div>
                </div>
            </div>

        </div>


    )
}
