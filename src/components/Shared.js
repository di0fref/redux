import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {BiShare} from "react-icons/bi";

export default function Shared() {
    const currentFolder = useSelector((state) => state.currentFolder)
    return (
        <Link to={`/app/docs/shared`}  className={`sidebar-item ${(currentFolder.id === "shared") ? "bg-gray-800 text-white" : ""} flex items-center rounded py-2 w-full px-2`}>
            <div><BiShare className={"h-6 w-6"}/></div>
            <div className={"ml-3"}>Shared</div>
        </Link>
    )
}
