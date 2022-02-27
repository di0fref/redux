import {BiCheckCircle, BiMenu} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {move, toggleTodoCompleted} from "../features/todoSlice";
import React, {useEffect, useState} from "react";
import {setSidebarOpen} from "../features/sideSlice";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import AddTodoButton from "./todo/AddTodoButton";
import EditTodoButton from "./todo/EditTodoButton";
import Moment from "react-moment";
import {getPrio, taskMomentConfig} from "../config/config";
import moment from "moment/moment";
import AddSectionButton from "./todo/AddSectionButton";
import EditSectionButton from "./todo/EditSectionButton";
import {useNavigate, useParams} from "react-router-dom";


export default function TodoList() {

    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const sidebar = useSelector((state) => state.side.sidebar)
    const todos = useSelector(state => state.todos.filter(todo => status == null ? todo : todo.completed == status));

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

    const totalTodos = useSelector(state => Object.values(state.todos).filter(todo => todo.type != "section")).length
    const completedTodos = useSelector(state => Object.values(state.todos).filter(todo => todo.completed && todo.type != "section")).length
    const remaining = totalTodos - completedTodos;

    const onSortEnd = ({oldIndex, newIndex, collection, isKeySorting}, e) => {
        dispatch(move({
            oldIndex: oldIndex,
            newIndex: newIndex,
            id: collection
        }))
    };
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
            <div className={"m-auto mb-4 overflow-y-auto editor-wrapper"}>
                <div className={"flex items-center gap-x-8 border-b-2_ _border-gray-800 px-10 py-[1.27em] text-sm font-bold"}>
                    <button className={`px-4 py-1 rounded rounded-3xl ${status === null ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium`} onClick={() => setStatus(null)}>All</button>
                    <button className={`px-4 py-1 rounded rounded-3xl ${status === false ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium`} onClick={() => setStatus(false)}>Active</button>
                    <button className={`px-4 py-1 rounded rounded-3xl ${status ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium `} onClick={() => setStatus(true)}>Completed</button>
                </div>

                <div className={"m-0 my-4 p-0 list-none dark:text-gray-200 text-gray-700 border-b dark:border-b-gray-800"}>

                    <div className={"flex flex-col md:flex-row md:items-center md:justify-between justify-start mb-4"}>
                        <div className={"px-10"}>
                            <div className={"font-bold text-3xl"}>Tasks</div>
                            <div className={"text-sm text-gray-400 dark:text-gray-400"}>{remaining ? remaining + " remaining tasks" : "All task are completed"}</div>

                        </div>

                        <div className={"flex items-center mx-10 mt-4 md:mt-0 gap-x-3"}>

                            <AddTodoButton/>
                            <AddSectionButton/>

                        </div>
                    </div>
                    <SortableList items={todos} onSortEnd={onSortEnd} useDragHandle/>
                </div>
            </div>
        </div>
    )

}


const SortableItem = SortableElement(({todo, index}) => {

    const [isHovering, setIsHovering] = useState(false)
    const dispatch = useDispatch();

    const [showModal, updateShowModal] = useState(false);
    const [showSectionModal, updateSectionShowModal] = useState(false);

    const toggleModal = () => updateShowModal(!showModal);

    const modalShow = () => updateShowModal(true);
    const modalHide = () => {
        console.log("hide")
        updateShowModal(false)
        navigator("/app/tasks")
    };

    const toggleSectionModal = () => updateSectionShowModal(!showSectionModal);
    const params = useParams()
    const navigator = useNavigate()


    const DragHandle = SortableHandle(() => {
        return (
            <button className={"w-7 ml-2"}>
                <BiMenu className={`${isHovering ? "visible" : "hidden"} h-6 w-6`}/>
            </button>
        )
    });

    const toggleStatus = () => {
        dispatch(toggleTodoCompleted(todo))
    }

    const clickHandle = () => {
        navigator("/app/tasks/" + todo.id)
    }

    useEffect(() => {
        if (params.todo_id && params.todo_id === todo.id) {
            modalShow()
        }
    }, [params.todo_id])

    if (todo.type === "section") {
        return (
            <>
                <div onClick={toggleSectionModal} className={"h-14 hover:bg-gray-100 bg-gray-50 dark:bg-gray-800/80 dark:hover:bg-white/5 w-full cursor-pointer"} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <div className={"flex h-full items-center gap-x-2 border-t dark:border-gray-800 pr-9"}>
                        <DragHandle/>
                        <div className={`font-semibold text-base w-full text-sm text-left`}>{todo.name}</div>
                    </div>
                </div>
                <EditSectionButton canShow={showSectionModal} updateModalState={toggleSectionModal} todoId={todo.id}/>
            </>
        )
    }

    return (

        <div className={"hover:bg-gray-100 dark:hover:bg-white/5 w-full"}
             onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        >
            <div className={"flex h-full items-center gap-x-1 border-t dark:border-t-gray-800 pr-9 "}>
                <DragHandle/>
                <button className={"rounded-full hover:bg-gray-200 p-1 dark:hover:bg-gray-700 "} onClick={toggleStatus}>
                    <BiCheckCircle className={`${todo.completed ? "text-indigo-500" : "text-gray-400"} w-6 h-6`}/>
                </button>
                <button onClick={clickHandle} className={`py-5 ${todo.completed ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-300"} w-full text-sm text-left flex items-center`}>
                    <span className={"flex-auto mr-2"}>{todo.name}</span>
                    <span className={"whitespace-nowrap ml-auto text-xs text-gray-400 "}>
                        {moment(todo.due).isValid() ?
                            <Moment calendar={taskMomentConfig(todo.due)}>{todo.due}</Moment> : null}
                    </span>
                    <span data-tip={todo.prio && todo.prio.charAt(0).toUpperCase() + todo.prio.slice(1)} className={"ml-2"}>
                        {getPrio(todo.prio)}
                    </span>
                </button>
            </div>
            <EditTodoButton key={index} canShow={showModal} updateModalState={modalHide} todoId={todo.id}/>
        </div>
    )
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((todo, index) => (
                <SortableItem key={`item-${todo.id}`} index={index} todo={todo}/>
            ))}
        </div>
    );
});
