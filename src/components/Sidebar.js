import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchTree} from "../features/treeSlice";
import {FaChevronDown, FaChevronRight, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import {BiFile, BiFolder} from "react-icons/bi";
import Bookmarks from "./Bookmarks";
import Usermenu from "./menus/Usermenu";
import {getAuth} from "firebase/auth";
import Trash from "./Trash";
import Shared from "./Shared";
import NewFolderButton from "./NewFolderButton";
import Todos from "./Todos";

function SidebarItem(props) {

    // const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.currentFolder)
    const [open, setOpen] = useState(true)

    const chevronClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }

    useEffect(() => {
        // setOpen(props.open)
    }, [props.open])

    return (
        <>
            <Link to={`/app/docs/folder/${props.item.id}`} className={"flex w-full my-1"}>
                <div className=
                         {`sidebar-item ${currentFolder.id === props.item.id ? "bg-gray-800 dark:bg-gray-800 text-white " : ""} flex items-center rounded  py-2 w-full px-2`}
                     style={{
                         marginLeft: props.depth * 0.8
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

    // let params = useParams();
    const currentFolder = useSelector((state) => state.currentFolder)
    // const sidebar = useSelector((state) => state.sidebar)

    const [open, setOpen] = useState(true)
    const tree = useSelector((state) => state.tree)
    const dispatch = useDispatch()

    const [allOpen, setAllOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchTree())
        opelAll()
    }, [])


    const opelAll = () => {
        setAllOpen(true)
        setOpen(true)
    }

    return (
        <div className={"border-r dark:border-r-gray-800 h-screen"}>
            <div className={"flex items-center justify-between w-full h-14"}>
                <div className={"ml-4"}>
                    <img className="w-auto h-7 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                </div>
                <div className={"mr-4"}>
                    <Usermenu/>
                </div>
            </div>

            <div className={"h-40 flex flex-col items-center justify-center mt-2_ mb-4"}>
                <div className={""}>
                    {user.photoURL
                        ? <img src={user.photoURL} alt={"Avatar"} className={"rounded rounded-full h-20 w-20"}/>
                        : <FaUser className={"h-16 w-16 bg-gray-400 rounded p-2"}/>}
                </div>
                <div className={"text-sm mt-2"}>{user.displayName}</div>
                <div className={"text-gray-400 text-xs mt-1"}>{user.email}</div>
            </div>
            <div className={"p-2 text-sm"}>
                <div className={"flex items-center justify-between ml-2 mt-4 mb-3"}>
                    <div className={"text-side-indigo font-'bold uppercase text-[12px] tracking-wide"}>Activities</div>
                    {/*<div className={""}><NewTaskListButton/></div>*/}
                </div>
                <div className={"mb-2"}><Todos/></div>

                {/*<div className={"ml-2 mb-2 text-side-indigo font-bold_ uppercase text-[12px] tracking-wide"}>Filters</div>*/}
                {/*<div className={"mb-2"}><Bookmarks/></div>*/}
                {/*<div className={"mb-2"}><Tags/></div>*/}
                {/*<div className={"mb-2"}><Recent/></div>*/}

                <div className={"flex items-center justify-between ml-2 mt-4 mb-3"}>
                    <div className={"text-side-indigo font-'bold uppercase text-[12px] tracking-wide"}>Documents</div>
                    <div className={""}><NewFolderButton opelAll={opelAll}/></div>
                </div>
                <div className={"mb-2"}><Bookmarks/></div>

                <Link to={`/app/docs`} className={`sidebar-item ${(currentFolder.id === 0) ? "bg-gray-800 text-white" : ""} flex items-center rounded py-2 w-full px-2`}>
                    <div className={""}>
                        <BiFile className={"h-6 w-6"}/>
                    </div>
                    <div className={"ml-3 font-medium text-menu"}>All documents</div>
                    <div className={"ml-auto"}>
                    </div>
                </Link>
                <div className={`${open ? "block" : "hidden"} ml-4`}>
                    {Object.entries(tree).map(([key, item]) => {
                        return (
                            <SidebarItem item={item} key={key} depth={0} open={allOpen}/>
                        )
                    })}
                </div>

                <div className={"mt-12"}><Shared/></div>
                <div className={"mt-3"}><Trash/></div>
            </div>
        </div>
    )
}
