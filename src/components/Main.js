import Sidebar from "./Sidebar";
import Notelist from "./Notelist";
import Content from "./Content";
import {useSelector} from "react-redux";

export default function Main() {
    const sidebar = useSelector((state) => state.sidebar)

    return (
        <div className={`flex h-screen`}>
            <div className={`flex ${sidebar ? "ml-0" : "-ml-144"} transition-all absolute md:relative z-10 w-full md:w-auto`}>
                <div className={`${sidebar ? "ml-0" : "md:ml-0 -ml-64"} md:w-64 w-1/2 h-screen md:h-full bg-gray-100 text-gray-700 flex-shrink-0 `}>
                    <Sidebar/>
                </div>
                <div className={`${sidebar ? "ml-0" : "md:ml-0 -ml-80"} md:w-80 w-1/2 h-full bg-white flex-shrink-0 `}>
                    <Notelist/>
                </div>
            </div>
            <div className={"flex-grow h-full bg-white "}>
                <Content/>
            </div>
        </div>

    )
}
