import {BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {toggleTodoDone} from "../features/todeSlice";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export default function TodoList() {


    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const [listId, setListId] = useState(null)

    const getStatus = (_, status) => status;
    const getListId = (_, id) => id;

    const selectTodosInList = createSelector(
        (state) => state.todos,
        getStatus,
        (todos, status) => Object.values(todos)
            .filter(list => list.id == listId)
            .map(list => list.todos
                .filter(todo => status == null ? todo : todo.done == status))[0]
    )

    const todos = useSelector(state => selectTodosInList(state, status));
const l = useSelector(state => state.todos)

    const toggleStatus = (todo) => {
        dispatch(toggleTodoDone(todo.id))
    }

    let params = useParams()

    useEffect(() => {
        setListId(params.list_id)
    }, [params.list_id])

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
            <div className={"m-auto max-w-md w-full overflow-hidden my-4"}>
                <div className={"flex items-center gap-x-8 border-b-2 border-gray-800"}>
                    <button className={"text-gray-200"} onClick={() => setStatus(null)}>All</button>
                    <button className={"text-orange-400"} onClick={() => setStatus(false)}>Active</button>
                    <button className={"text-green-400 ml-auto"} onClick={() => setStatus(true)}>Done</button>
                </div>
                <ul className="m-0 my-4 p-0 list-none w-full dark:text-gray-200 text-gray-700">
                    {todos && todos.map(todo => (
                        <li key={todo.id} onClick={() => toggleStatus(todo)} className={`${todo.done ? "border-green-400 dark:text-gray-600 text-gray-400" : "border-orange-400"}  mt-2 py-3 px-4 flex cursor-pointer border-l-[4px] `}>
                            <div className={"transition-all w-full border-2_ hover:translate-x-1"}>{todo.text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
