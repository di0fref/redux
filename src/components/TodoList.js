import {setSidebarOpen} from "../features/sideSlice";
import {BiLock, BiMenu} from "react-icons/bi";
import {FaRegStar, FaStar} from "react-icons/fa";
import NoteMenu from "./menus/noteMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {toggleTodoDone} from "../features/todeSlice";


export default function TodoList() {

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos)
    const selectDoneTodos = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(todo => todo.done == true))

    const done = useSelector(selectDoneTodos);

    const toggleStatus = (todo) => {
        dispatch(toggleTodoDone(todo.id))
    }

    return (
        <>
            <div className={"text-slate-500 flex flex-col "}>
                <div className={"print:hidden bg-gray-200 border-b-gray-300/50 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
                    <button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"}
                            onClick={() => {
                            }}>
                        <BiMenu className={"h-6 w-6"}/>
                    </button>
                    <ThemeSwitcher/>
                </div>
            </div>
            <div className={"m-auto max-w-md w-full overflow-hidden"}>
                <ul className="m-0 my-4 p-0 list-none w-full dark:text-gray-200 text-gray-700">
                    {todos.map(todo => (
                        <li key={todo.id} onClick={() => toggleStatus(todo)} className={`${todo.done ? "border-green-400 dark:text-gray-600 text-gray-400" : "border-orange-400"}  mt-2 py-3 px-4 flex cursor-pointer border-l-[4px] `}>
                            <div className={"transition-all w-full border-2_ hover:translate-x-1"}>{todo.text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
