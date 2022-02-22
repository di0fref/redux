import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {createSelector} from "reselect";
import {setSidebarOpen} from "../features/sideSlice";
import {BiFile, BiFolder, BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {FcFolder} from "react-icons/fc";
import {setCurrentNote} from "../features/currentNoteSlice";
import {FaArrowCircleLeft} from "react-icons/fa";


function Folder({item}) {
    return (
        <Link to={"/app/doc/folder/" + item.id} className={"h-32 w-32 flex flex-col bg-gray-50 shadow dark:bg-gray-800 items-center justify-center rounded rounded-2xl "}>
            <FcFolder className={"h-12 w-12 text-yellow-400_"}/>
            <div className={"font-medium text-gray-600 dark:text-gray-200 text-sm"}>{item.name}</div>
            <div className={"text-xs"}>{item.documents && item.documents.length} files</div>
        </Link>
    )
}

function Document({item}) {
    const dispatch = useDispatch();

    return (
        <Link onClick={() => dispatch(setCurrentNote(item.id))} to={"/app/docs/folder/" + item.folder_id + "/note/" + item.id} className={"h-32 w-32 flex flex-col bg-gray-50 shadow dark:bg-gray-800 items-center justify-center rounded rounded-2xl "}>
            <BiFile className={"h-12 w-12 text-gray-400"}/>
            <div className={"font-medium text-gray-600 dark:text-gray-200 text-sm"}>{item.name}</div>
        </Link>
    )
}

export default function Documents() {

    const params = useParams()

    const selectItemsInFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder.id == params.folder_id).map(folder => folder.items)[0]
    )

    const selectDocumentsInFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder.id == params.folder_id).map(folder => folder.documents)[0]
    )

    const selectDocumentsInRootFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder).map(folder => folder.documents)[0]
    )

    const selectFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder)
    )

    const rootFolder = useSelector(state => selectFolder(state))
    const subFolder = useSelector(state => selectItemsInFolder(state))
    const docs = useSelector(state => selectDocumentsInFolder(state))
    const rootDocs = useSelector(state => selectDocumentsInRootFolder(state))

    const [folder, setFolder] = useState(null)
    const [documents, setDocuments] = useState(null)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.side.sidebar)
    const tree = useSelector(state => state.tree)


    useEffect(() => {
        setFolder(subFolder)
    }, [])

    useEffect(() => {
        if (params.folder_id) {
            setFolder(subFolder)
            setDocuments(docs)
        } else {
            setFolder(rootFolder)
            setDocuments(rootDocs)
        }
    }, [params.folder_id, tree])

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
                <div className={"max-w-[65ch] w-full_ px-12 editor print:w-full print:text-black"}>
                    <div className={"mb-6"}>
                        <div className={"text-3xl font-bold text-gray-600 dark:text-white mb-1"}>Documents</div>
                        <div className={"text-md text-gray-600 dark:text-white"}>6 folder, 56 files</div>
                    </div>

                    <button className={"gap-x-2 mb-4 flex items-center"} onClick={() => navigate(-1)}>
                        <div><FaArrowCircleLeft/></div>
                        <div>Back</div>
                    </button>

                    <div className={"text-base font-medium mb-4 text-gray-600 dark:text-white"}>Folders</div>
                    <div className={"flex flex-wrap gap-4"}>

                        {folder && folder.map((item, index) => {
                            return (
                                !Array.isArray(item) && <Folder item={item} key={index}/>
                            )
                        })}

                    </div>
                    <div className={"text-base font-medium mb-4 text-gray-600 dark:text-white mt-6"}>Documents</div>
                    <div className={"flex flex-wrap gap-4"}>

                        {documents && documents.map((item, index) => {
                            return (
                                <Document item={item} key={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
