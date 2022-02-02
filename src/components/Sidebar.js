import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchTree} from "../features/treeSlice";
import {fetchNotesByFolderId} from "../features/noteSlice";
import {setCurrentFolder} from "../features/currentFolderSlice";
import {FaChevronDown, FaChevronRight, FaFileAlt, FaFolder, FaRegFolder, FaUser, FaUserAlt} from "react-icons/fa";
import {setCurrentNote} from "../features/currentNoteSlice";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import useUrl from "../hooks/useUrl";
import {BiFile, BiFolder, BiLock, BiUser, BiUserCircle} from "react-icons/bi";
import Bookmarks from "./Bookmarks";
import Usermenu from "./menus/Usermenu";
import Recent from "./Recent";
import Tags from "./Tags";
import {getAuth} from "firebase/auth";
import Trash from "./Trash";
import Shared from "./Shared";

function SidebarItem(props) {

    const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.currentFolder)
    const [open, setOpen] = useState(true)
    const chevronClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <>
            <Link to={`/folder/${props.item.id}`} className={"flex w-full my-1"}>
                <div className=
                         {`${currentFolder.id === props.item.id ? "bg-gray-800 dark:bg-gray-800 text-white" : ""} flex items-center rounded hover:bg-gray-800 py-2 w-full px-2`}
                     style={{
                         marginLeft: props.depth * 1.3
                     }}>

                    <div className={"mr-2 flex items-center"}><BiFolder className={"h-5 w-5"}/></div>
                    <div className={"text-sm font-medium text-menu"}>{props.item.name}</div>
                    <button className={"text-gray-500 w-5 h-5 hover:bg-indigo-500 hover:text-white rounded flex items-center justify-center ml-auto"} onClick={chevronClicked}>
                        {(Object.keys(props.item.items).length)
                            ? open
                                ? <div><FaChevronDown className={"w-3 h-3"}/></div>
                                : <div><FaChevronRight className={"w-3 h-3"}/></div>
                            : ""
                        }
                    </button>
                </div>
            </Link>
            {(props.item.items) ? (
                Object.entries(props.item.items).map(([key, items]) => {
                    return (
                        <div key={key} className={`${open ? "block" : "hidden h-0"} overflow-hidden`}>
                            <SidebarItem item={items} depth={props.depth + 16}/>
                        </div>
                    )
                })
            ) : null}
        </>
    )
}

export default function Sidebar() {
    const auth = getAuth();
    const user = auth.currentUser

    let params = useParams();
    const currentFolder = useSelector((state) => state.currentFolder)
    const sidebar = useSelector((state) => state.sidebar)

    const [open, setOpen] = useState(true)
    const tree = useSelector((state) => state.tree)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentFolder(params.folder_id))
        dispatch(setCurrentNote(null))
    }, [params.folder_id])

    useEffect(() => {
        dispatch(fetchTree())
    }, [])
    const chevronClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <>
            <div className={"flex items-center justify-between w-full h-14"}>
                <div className={"ml-4"}><img className="w-auto h-7 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/></div>
                <div className={"mr-4"}>
                    <Usermenu/>
                </div>
            </div>

            <div className={"h-40 flex flex-col items-center justify-center mt-2_ mb-4"}>
                <div className={""}>
                    <img src={user.photoURL} alt={"Avatar"} className={"rounded rounded-full h-20 w-20"}/>
                </div>
                <div className={"text-sm mt-2"}>{user.displayName}</div>
                <div className={"text-gray-400 text-xs mt-1"}>{user.email}</div>
            </div>
            <div className={"p-2 text-sm"}>
                <div className={"ml-2 mb-2 text-side-indigo font-bold uppercase text-[12px] tracking-wide"}>Filters</div>
                <div className={"mb-2"}><Bookmarks/></div>
                <div className={"mb-2"}><Tags/></div>
                <div className={"mb-2"}><Recent/></div>
                <div className={"ml-2 mt-4 mb-2 text-side-indigo font-bold uppercase text-[12px] tracking-wide"}>My Documents</div>

                <Link to={`/folder/0`} className={`${(currentFolder.id === 0) ? "bg-gray-800 text-white" : ""} flex items-center rounded hover:bg-gray-800 py-2 w-full px-2`}>
                    <div className={""}>
                        <BiFile className={"h-6 w-6"}/>
                    </div>
                    <div className={"ml-3 font-medium text-menu"}>Notebooks</div>
                    <div className={"ml-auto"}>
                        <button className={"text-gray-500 w-5 h-5 hover:bg-indigo-500 hover:text-white rounded flex items-center justify-center ml-auto"} onClick={chevronClicked}>
                            {open
                                ? <FaChevronDown className={"h-3 w-3 "}/>
                                : <FaChevronRight className={"h-3 w-3 "}/>
                            }
                        </button>
                    </div>
                </Link>
                <div className={`${open ? "block" : "hidden"} ml-6`}>
                    {Object.entries(tree).map(([key, item]) => {
                        return (
                            <SidebarItem item={item} key={key} depth={0}/>
                        )
                    })}
                </div>

                <div className={"mt-12"}><Shared/></div>
                <div className={"mt-3"}><Trash/></div>
            </div>
        </>
    )
}
