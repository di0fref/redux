import Sidebar from "./Sidebar";
import Notelist from "./Notelist";
import Content from "./Content";

export default function Main() {
    return (
        <div className={"flex h-screen"}>
            <div className={"w-64 h-full bg-gray-100 text-gray-700 flex-shrink-0"}>
                <Sidebar/>
            </div>
            <div className={"w-80 h-full bg-white flex-shrink-0 border-l_ border-r_ _overflow-y-auto"}>
                <Notelist/>
            </div>
            <div className={"flex-grow h-full bg-white flex-shrink-0"}>
                <Content/>
            </div>
        </div>
    )
}
