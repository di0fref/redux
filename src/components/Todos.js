import {Link} from "react-router-dom";
import {BiCheck, BiCheckCircle, BiListPlus, BiStar, BiTime} from "react-icons/bi";
import {useState} from "react";
import {useSelector} from "react-redux";

export default function Todos() {
    const currentFolder = useSelector((state) => state.currentFolder)

    const [open, setOpen] = useState(false)
    return (
        <Link to={`/app/todos`} onClick={() => setOpen(!open)} className={`sidebar-item ${(currentFolder.id === "todos") ? "bg-gray-800 text-white" : ""} flex items-center rounded py-2 w-full px-2`}>
            <div><BiCheckCircle className={"h-6 w-6"}/></div>
            <div className={"ml-3"}>Tasks</div>
            <div className={"ml-auto"}><BiListPlus className={"text-gray-400 h-7 w-7 hover:text-white p-1 flex items-center "}/></div>
        </Link>
    )
}
