import {Link} from "react-router-dom";
import {BiFile} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {addNote} from "../features/noteSlice";
import {useNavigate} from "react-router";
import {setCurrentNote} from "../features/currentNoteSlice";
import {fetchTree} from "../features/treeSlice";

export default function NoDocumentOpen() {
    const currentFolder = useSelector((state) => state.currentFolder)
    const dispatch = useDispatch();
    const navigator = useNavigate()

    const newDocumentHandler = () => {
        dispatch(addNote(currentFolder.id)).then((result) => {
            dispatch(setCurrentNote(result.payload.id))
            dispatch(fetchTree())
            navigator(`/app/docs/folder/${currentFolder.id}/note/${result.payload.id}`)
        })
    }

    return (
        <div className={"flex items-center flex-col"}>
            <div className={"break-words block px-6 pt-3 pb-4 text-center"}>
                <div className={"text-xl font-bold mb-2 text-gray-400 w-full"}>No document is open</div>
                <div className={"flex items-center justify-center"}>
                    <BiFile className={"mx-2"}/>
                    <Link to={"#"} className={"hover:text-indigo-500 text-slate-500 decoration-0"}
                          onClick={newDocumentHandler}>Create new</Link>
                </div>
            </div>
        </div>
    )
}
