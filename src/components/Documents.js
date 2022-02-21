import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {BsFolder} from "react-icons/bs";
import {useParams} from "react-router";
import {createSelector} from "reselect";
import {setSidebarOpen} from "../features/sideSlice";
import {BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";


function Folder({item}) {
    return (
        <Link to={"/app/doc/folder/" + item.id} className={"h-32 w-32 flex flex-col bg-white shadow dark:bg-gray-800 items-center justify-center rounded rounded-2xl "}>
            <BsFolder className={"h-12 w-12 text-gray-400"}/>
            <div className={"font-semibold text-gray-600 dark:text-gray-200 text-sm"}>{item.name}</div>
            <div className={"text-xs"}>2 files</div>
        </Link>
    )
}

export default function Documents() {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const sidebar = useSelector((state) => state.side.sidebar)
    const tree = useSelector(state => state.tree)
    const [folder, setFolder] = useState([])
    const params = useParams()

    const selectItemsInFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder.id == params.folder_id).map(folder => folder.items)[0]
    )

    const selectFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder)
    )

    const rootFolder = useSelector(state => selectFolder(state))
    const subFolder = useSelector(state => selectItemsInFolder(state))

    useEffect(() => {
        if (params.folder_id) {
            setFolder(subFolder)
        } else {
            setFolder(rootFolder)
        }
    }, [params.folder_id])

    return (
        <>
            <div className={"text-slate-500 dark:text-gray-200 flex flex-col"}>
                <div className={"print:hidden bg-gray-200 border-b-gray-300/50 dark:border-b-gray-800 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
                    <button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"}
                            onClick={() => {
                                dispatch(setSidebarOpen(!sidebar))
                            }}>
                        <BiMenu className={"h-6 w-6"}/>
                    </button>
                    <ThemeSwitcher/>
                </div>
            </div>
            <div className={"flex justify-center p-4 overflow-y-auto editor-wrapper text-slate-500 dark:text-gray-200 "}>
                <div className={"max-w-[65ch]_ w-full px-12 editor print:w-full print:text-black"}>
                    <div className={"mb-6"}>
                        <div className={"text-3xl font-bold text-gray-600 dark:text-white mb-1"}>Documents</div>
                        <div className={"text-md text-gray-600 dark:text-white"}>6 folder, 56 files</div>
                    </div>
                    <div className={"text-base font-medium mb-4 text-gray-600 dark:text-white"}>Folders</div>
                    <div className={"flex flex-wrap gap-4"}>

                        {folder && folder.map((item, index) => {
                            return (
                                <Folder item={item} key={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
