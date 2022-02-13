import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {BiTrash} from "react-icons/bi";

export default function Trash() {
    const currentFolder = useSelector((state) => state.currentFolder)
    const trash = useSelector((state) => Object.values(state.notes).filter(note => note.deleted === true))

    const [open, setOpen] = useState(false)
    return (
        <Link to={`/app/documents/trash`} onClick={() => setOpen(!open)} className={`sidebar-item ${(currentFolder.id === "trash") ? "bg-gray-800 text-white" : ""} flex items-center rounded  py-2 w-full px-2 text-menu`}>
            <div><BiTrash className={"h-6 w-6"}/></div>
            <div className={"ml-3 flex items-center justify-between w-full"}>
                <div>Trash</div>
                <div className={"text-gray-500"}>({trash.length})</div>
            </div>
        </Link>
    )
}
