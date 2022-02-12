import {BiCheckCircle, BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {addTodo, toggleTodoCompleted} from "../features/todeSlice";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FaHamburger} from "react-icons/fa";
import moment from 'moment';
import {toast} from "react-toastify";


export default function TodoList() {


    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const [listId, setListId] = useState(null)
    let params = useParams()
    const [todoName, setTodoName] = useState("");

    const selectTodosInList = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(list => list.id == listId).map(list => list.todos.filter(todo => status == null ? todo : todo.completed == status))[0]
    )

    const todos = useSelector(state => selectTodosInList(state));

    const selectTodosInListSortedByDue = createSelector(
        (state) => state,
        (todos) => todos,
        (todos) => todos && Object.entries(todos).sort(function (a, b) {

            if (new Date(b[1].due) < new Date(a[1].due))
                return 1;
            else
                return -1

        }).map(el => el[1])
    )

    const todosSortedByDue = useSelector(state => selectTodosInListSortedByDue(todos, state));

    const toggleStatus = (todoId) => {
        dispatch(toggleTodoCompleted({
            todoId: todoId,
            listId: listId
        }))
    }

    useEffect(() => {
        setListId(params.list_id)
    }, [params.list_id])

    const addTask = (e) => {
        if (e.key === 'Enter') {
            if (todoName != "") {
                dispatch(addTodo({listId: listId, text: todoName, due: "2021-05-05"}))
                setTodoName("")
                // toast.success("New task added")
            }
        }
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
            <div className={"m-auto max-w-xl_ w-full w-full overflow-hidden mb-4"}>
                {/*<div className={"flex items-center gap-x-8 border-b-2_ _border-gray-800 p-4"}>*/}
                {/*    <button className={"text-gray-200"} onClick={() => setStatus(null)}>All</button>*/}
                {/*    <button className={"text-orange-400"} onClick={() => setStatus(false)}>Active</button>*/}
                {/*    <button className={"text-green-400 ml-auto"} onClick={() => setStatus(true)}>Completed</button>*/}
                {/*</div>*/}

                <div className={"w-full"}>
                    <div className={"border-b dark:border-gray-800"}>
                        <input
                            onKeyDown={addTask}
                            placeholder={"Type task title and press enter..."}
                            value={todoName}
                            onChange={(e) => setTodoName(e.target.value)}
                            type={"text"}
                            name={"todo-name"}
                            className={"dark:text-white text-gray-700 dark:bg-gray-700 bg-gray-100 w-full py-4 px-6 focus:outline-none _focus:bg-white dark:focus:bg-gray-600"}/>
                    </div>
                </div>
                <div className={"m-0 my-4 p-0 list-none w-full dark:text-gray-200 text-gray-700"}>
                    <div className={"ml-6 font-bold text-3xl  _border-b dark:border-gray-800"}>Tasks</div>
                    {todosSortedByDue && todosSortedByDue.map((todo, todoKey) => {
                        return (
                            <button /*onMouseLeave={() => setHovering(false)} onMouseEnter={() => setHovering(true)}*/ onClick={() => toggleStatus(todo.id)} className={"hover:bg-gray-100 dark:hover:bg-gray-800 text-left w-full flex gap-x-4 py-4 px-6 items-center border-b dark:border-gray-800 dark:bg-gray-900"} key={todoKey}>
                                {/*<div className={"mb-auto w-7"}>{isHovering ?*/}
                                {/*    <BiMenu className={"w-6 h-6 text-gray-600"}/> : ""}*/}
                                {/*</div>*/}
                                <div className={"rounded-full mb-auto"}>
                                    <BiCheckCircle className={`${todo.completed ? "text-green-600" : "text-gray-400/30"} w-6 h-6`}/>
                                </div>
                                <div className={"text-sm w-full"}>{todo.id} - {todo.text} </div>
                                <div className={"text-xs flex-grow flex-shrink-0 mb-auto text-gray-400 dark:text-gray-500 ml-auto font-light"}>
                                    {todo.due}
                                </div>
                            </button>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
