import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {BiStar} from "react-icons/bi";

export default function Bookmarks() {
    const currentFolder = useSelector((state) => state.currentFolder)

    const [open, setOpen] = useState(false)
    return (
        <Link to={`/folder/bookmarks`} onClick={() => setOpen(!open)} className={`${(currentFolder.id === "bookmarks") ? "bg-gray-800 text-white" : ""} flex items-center rounded hover:bg-gray-800 py-2 w-full px-2 text-menu`}>
            <div><BiStar className={"h-6 w-6"}/></div>
            <div className={"ml-3"}>Bookmarks</div>
        </Link>
    )
}
