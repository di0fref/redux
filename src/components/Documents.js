import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {createSelector} from "reselect";
import {setSidebarOpen} from "../features/sideSlice";
import {BiFile, BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {FcFolder} from "react-icons/fc";
import {setCurrentNote} from "../features/currentNoteSlice";
import {setCurrentFolder} from "../features/currentFolderSlice";
import Moment from "react-moment";
import {momentConfig} from "../config/config";


function Folder({item}) {
    const dispatch = useDispatch();

    return (
        <Link onClick={() => dispatch(setCurrentFolder(item.id))} to={"/app/doc/folder/" + item.id} className={"my-1 h-32 w-32 flex flex-col bg-white shadow dark:bg-gray-800 items-center justify-center rounded rounded-2xl "}>
            <FcFolder className={"h-12 w-12 text-yellow-400_"}/>
            <div className={"font-medium text-gray-600 dark:text-gray-200 text-sm"}>{item.name}</div>
            <div className={"text-xs mt-1"}>{item.documents && item.documents.length} files</div>
        </Link>
    )
}

function Document({item}) {
    const dispatch = useDispatch();

    return (
        <Link data-tip={""} onClick={() => dispatch(setCurrentNote(item.id))} to={"/app/docs/folder/" + item.folder_id + "/note/" + item.id} className={"my-1 h-32 w-32 flex flex-col bg-gray-50 shadow dark:bg-gray-800 items-center justify-center rounded rounded-2xl "}>
            <BiFile className={"h-12 w-12 text-gray-400"}/>
            <div className={"font-medium text-gray-600 dark:text-gray-200 text-sm"}>{item.name}</div>
            <div className={"text-xs mt-1"}><Moment calendar={momentConfig}>{item.updated_at}</Moment></div>
        </Link>
    )
}

export default function Documents() {

    const params = useParams()
    const currentFolder = useSelector((state) => state.currentFolder)

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
        (tree) => tree.documents
    )

    const selectRootFolder = createSelector(
        (state) => state.tree,
        (tree) => Object.values(tree).filter(folder => folder)
    )

    const rootFolder = useSelector(state => selectRootFolder(state))
    const subFolder = useSelector(state => selectItemsInFolder(state))

    const docs = useSelector(state => selectDocumentsInFolder(state))
    const rootDocs = useSelector(state => selectDocumentsInRootFolder(state))

    const [breadCrumb, setBreadCrumb] = useState(["Documents"]);

    const [folder, setFolder] = useState(null)
    const [documents, setDocuments] = useState(null)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.side.sidebar)
    const tree = useSelector(state => state.tree)

    const getPath = (obj, id, paths = []) => {
        if (obj.id == id) return [{name: obj.name, id: obj.id}];
        if (obj.items && obj.items.length) {
            paths.push({name: obj.name, id: obj.id});
            let found = false;
            obj.items.forEach(child => {
                const temPaths = getPath(child, id);
                if (temPaths) {
                    paths = paths.concat(temPaths);
                    found = true;
                }
            });
            !found && paths.pop();
            return paths;
        }
        return null;
    };

    const bread = (item) => {
        let link = (item.id === 0) ? "/app/doc" : "/app/doc/folder/" + item.id

        return <Link to={link} onClick={() => dispatch(setCurrentFolder(item.id))}>
            <span className={"text-blue-500 hover:underline"}>{item.name}</span>
        </Link>
    }

    useEffect(() => {

        if (params.folder_id) {
            setFolder(subFolder)
            setDocuments(docs)

            setBreadCrumb(getPath({
                // name: "Documents",
                // id: 0,
                items: Object.values(tree)
            }, params.folder_id))

        } else {
            setFolder(rootFolder)
            setDocuments(rootDocs)
            // setBreadCrumb([{name: "Documents", id: 0}])
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
            <div className={"overflow-y-auto editor-wrapper dark:text-gray-200  "}>
                <div className={"w-full print:w-full print:text-black bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"}>
                    <div className={"mb-4 px-12 pt-6 flex justify-between"}>
                        <div className={" text-gray-600 dark:text-white mb-1"}>
                            <p className={"text-3xl font-bold mb-2"}>{currentFolder.name}</p>
                            <p className={""}>{breadCrumb && breadCrumb.map(item => bread(item)).reduce((prev, curr) => [prev, ' / ', curr])}</p>
                        </div>
                    </div>
                </div>

                <div className={"px-12 mt-8"}>
                    {folder && folder.length ?
                        <>
                            <div className={"text-base font-medium mb-4 text-gray-600 dark:text-white"}>Folders</div>
                            <div className={"flex flex-wrap gap-4"}>
                                {folder.map((item, index) => {
                                    return (
                                        !Array.isArray(item) && <Folder item={item} key={index}/>
                                    )
                                })}
                            </div>
                        </> : null}

                    {documents && documents.length ?
                        <>
                            <div className={"text-base font-medium mb-4 text-gray-600 dark:text-white mt-6"}>Documents</div>
                            <div className={"flex flex-wrap gap-4"}>
                                {documents && documents.map((item, index) => {
                                    return (
                                        <Document item={item} key={index}/>
                                    )
                                })}
                            </div>
                        </> : null}
                </div>



            </div>
        </>
    )
}
