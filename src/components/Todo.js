import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import TodoList from "./TodoList";
import Notelist from "./Notelist";
import TodoSide from "./TodoSide";
import SortableComponent from "./Sort";

export default function Todos() {
    const sidebar = useSelector((state) => state.side.sidebar)

    const dispatch = useDispatch()

    return (
        <div className={`flex h-screen bg-white dark:bg-gray-900_ `}>
            <div className={`print:hidden flex ${sidebar ? "ml-0" : "-ml-144"} transition-all absolute md:relative z-10 w-full md:w-auto`}>
                <div className={`${sidebar ? "ml-0" : "md:ml-0 -ml-72"} md:w-72 w-1/2 h-screen overflow-y-auto md:h-full bg-gray-900 bg-gray-900 text-gray-300 flex-shrink-0 `}>
                    <Sidebar/>
                </div>
                <div className={`${sidebar ? "ml-0" : "md:ml-0 -ml-80"} md:w-80 w-1/2 h-screen md:h-full bg-white dark:bg-gray-800 flex-shrink-0 `}>
                    <TodoSide/>
                </div>
            </div>
            <div className={"flex-grow h-full bg-white dark:bg-gray-900 editor"}>
                {/*<Content/>*/}
                <TodoList/>
{/*<SortableComponent/>*/}
            </div>
        </div>

    )
}
