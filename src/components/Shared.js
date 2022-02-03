import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {BiShare, BiStar, BiTrash} from "react-icons/bi";

export default function Shared() {
    const currentFolder = useSelector((state) => state.currentFolder)
    return (
        <Link to={`/folder/shared`}  className={`${(currentFolder.id === "shared") ? "bg-gray-800 text-white" : ""} flex items-center rounded hover:bg-gray-800 py-2 w-full px-2 text-menu`}>
            <div><BiShare className={"h-6 w-6"}/></div>
            <div className={"ml-3"}>Shared</div>
        </Link>
    )
}
