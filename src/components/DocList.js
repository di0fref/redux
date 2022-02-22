import ThemeSwitcher from "./ThemeSwitcher";
import {BiMenu} from "react-icons/bi";
import {setSidebarOpen} from "../features/sideSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaFolder, FaRegFolder} from "react-icons/fa";

export default function DocList() {

    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.side.sidebar)
    const tree = useSelector(state => state.tree)
    return (
        <div>
            <div className={"text-slate-500 flex flex-col"}>
                <div className={"print:hidden bg-gray-200 border-b-gray-300/50 dark:border-b-gray-800 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
                    <button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"}
                            onClick={() => {
                                dispatch(setSidebarOpen(!sidebar))
                            }}>
                        <BiMenu className={"h-6 w-6"}/>
                    </button>
                    <ThemeSwitcher/>
                </div>
            </div>
            <div className={"m-auto w-full overflow-hidden mb-4"}>
                {tree.map((item, index) => {
                    return (
                        <>
                            <div className={"flex items-center border-b gap-x-4 py-3"}>
                                <div className={"ml-4"}><FaRegFolder className={"h-8 w-8"}/></div>
                                <div className={"w-full"}>
                                    <div>{item.name}</div>
                                </div>
                                <div className={"text-sm whitespace-nowrap"}>2 files</div>
                                <div className={"whitespace-nowrap mr-4 text-sm"}>Updated at 2021-01-01</div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}