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
import {BiFolder, BiUser} from "react-icons/bi";

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
                         {`${currentFolder.id === props.item.id ? "bg-gray-200" : ""} flex items-center rounded hover:bg-gray-200 py-1 w-full px-2`}
                     style={{
                         marginLeft: props.depth * 1.3
                     }}>

                    <div className={"w-4 h-4 mr-2 text-gray-500"}><BiFolder className={"text-yellow-500"}/></div>
                    <div className={"text-sm"}>{props.item.name}</div>
                    <button className={"text-gray-500 w-4 h-4 hover:bg-gray-400 hover:text-white rounded flex items-center justify-center ml-auto"} onClick={chevronClicked}>
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

    let params = useParams();
    const currentFolder = useSelector((state) => state.currentFolder)
    const sidebar = useSelector((state) => state.sidebar)

    const [open, setOpen] = useState(true)
    const tree = useSelector((state) => state.tree)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchNotesByFolderId(params.folder_id))
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
            <div className={"bg-gray-700 h-14"}></div>
            <div className={"p-2"}>
                <Link to={`/folder/0`} className={`${(currentFolder.id === 0) ? "bg-gray-200" : ""} flex items-center rounded hover:bg-gray-200 py-1 w-full px-2`}>
                    <div><BiUser className={"h-4 w-4 text-gray-500"}/></div>
                    <div className={"ml-2"}>Documents</div>
                    <div className={"ml-auto"}>
                        <button className={"text-gray-500 w-4 h-4 hover:bg-gray-400 hover:text-white rounded flex items-center justify-center ml-auto"} onClick={chevronClicked}>
                            {open
                                ? <FaChevronDown className={"h-3 w-3 "}/>
                                : <FaChevronRight className={"h-3 w-3 "}/>
                            }
                        </button>
                    </div>
                </Link>
                <div className={`${open ? "block" : "hidden"}`}>
                    {Object.entries(tree).map(([key, item]) => {
                        return (
                            <SidebarItem item={item} key={key} depth={0}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
