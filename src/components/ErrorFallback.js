import {HiExclamation} from "react-icons/hi";
import {FaExclamationCircle} from "react-icons/fa";

export default function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert">
            <div className={"flex items-center justify-center gap-2"}>
                <div className={"text-red-500 "}><FaExclamationCircle className={"h-5 w-5"}/></div>
                <div className={"text-gray-700 dark:text-gray-200"}>Uh, oh - Something went wrong</div>
            </div>
        </div>
    )
}
