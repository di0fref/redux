import {Link} from "react-router-dom";
import {FaFileAlt} from "react-icons/fa";

export default function NoDocumentOpen() {
    return (
        <div className={"flex items-center flex-col"}>
            <div className={"text-xl font-bold mb-2"}>No document is open</div>
            <div className={"flex items-center"}>
                <FaFileAlt className={"mx-2"}/>
                <Link to={"#"}>Create new</Link>
            </div>
        </div>
    )
}
