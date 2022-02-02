import {Link} from "react-router-dom";
import {BiStar, BiTime} from "react-icons/bi";
import {useState} from "react";
import {useSelector} from "react-redux";

export default function Recent() {
    const currentFolder = useSelector((state) => state.currentFolder)

    const [open, setOpen] = useState(false)
    return (
        <Link to={`/folder/recent`} onClick={() => setOpen(!open)} className={`${(currentFolder.id === "recent") ? "bg-gray-800 text-white" : ""} flex items-center rounded hover:bg-gray-800 py-2 w-full px-2 text-menu`}>
            <div><BiTime className={"h-6 w-6"}/></div>
            <div className={"ml-3"}>Recent</div>
        </Link>
    )
}
