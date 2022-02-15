import {BiCheckCircle, BiMenu, BiPlus} from "react-icons/bi";
import ThemeSwitcher from "./ThemeSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {addTodo, move, toggleTodoCompleted} from "../features/todoSlice";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {setSidebarOpen} from "../features/sideSlice";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import AddTodoButton from "./AddTodoButton";


export default function TodoList() {

    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const [listId, setListId] = useState(null)
    let params = useParams()
    const [todoName, setTodoName] = useState("");
    const list = useSelector(state => state.todos.find(list => list.id == listId))

    const selectTodosInList = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(list => list.id == listId).map(list => list.todos.filter(todo => status == null ? todo : todo.completed == status))[0]
    )
    const sidebar = useSelector((state) => state.side.sidebar)

    // const todos = useSelector(state => selectTodosInList(state));
    const sections = useSelector(state => state.todos);

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

    // const todosSortedByOrder = useSelector(state => selectTodosInListSortedByOrder(todos, state));

    const toggleStatus = (todo) => {
        dispatch(toggleTodoCompleted(todo))
    }

    useEffect(() => {
        setListId(params.list_id)
        console.log(sections)
    }, [params.list_id])

    const addTask = (e) => {
        if (e.key === 'Enter') {
            if (todoName != "") {
                console.log(listId)
                dispatch(addTodo(
                    {
                        task_list_id: listId,
                        text: todoName,
                        due: "2021-05-05"
                    })).then((result) => {
                    setTodoName("")
                })
            }
        }
    }
    const onSortEnd = ({oldIndex, newIndex, collection, isKeySorting}, e) => {
        dispatch(move({
            oldIndex: oldIndex,
            newIndex:newIndex,
            id: collection
        }))
    };
    return (
        <>
            <div className={"text-slate-500 flex flex-col"}>
                <div className={"print:hidden bg-gray-200 border-b-gray-300/50 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
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
                {/*<div className={"flex items-center gap-x-8 border-b-2_ _border-gray-800 px-10 py-[1.27em] text-sm font-bold"}>*/}
                {/*    <button className={`px-4 py-1 rounded ${status === null ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium`} onClick={() => setStatus(null)}>All</button>*/}
                {/*    <button className={`px-4 py-1 rounded ${status === false ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium`} onClick={() => setStatus(false)}>Active</button>*/}
                {/*    <button className={`px-4 py-1 rounded ${status ? "dark:bg-indigo-500 bg-indigo-500 text-white" : "dark:text-gray-200 text-gray-600"} hover:underline font-medium `} onClick={() => setStatus(true)}>Completed</button>*/}
                {/*</div>*/}

                <div className={"m-0 my-4 p-0 list-none w-full dark:text-gray-200 text-gray-700 border-b"}>
                    <div className={"flex items-center gap-x-4"}>
                        <div className={"px-10 font-bold text-3xl flex-grow"}>Tasks</div>
                        {/*<div className={"flex items-center"}>*/}
                        {/*    <button className={"bg-indigo-500 hover:bg-indigo-700 rounded rounded-3xl px-5 py-2 flex items-center"}>*/}
                        {/*        <span><BiPlus className={"text-white font-bold h-5 w-5"}/></span>*/}
                        {/*        <span className={"text-white text-sm font-medium"}>Add task</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <AddTodoButton/>
                        <div className={"flex items-center pr-10"}>
                            <button className={"bg-black rounded rounded-3xl px-5 py-2 flex items-center"}>
                                <span><BiPlus className={"text-white font-bold h-5 w-5"}/></span>
                                <span className={"text-white text-sm font-medium"}>Add section</span>
                            </button>
                        </div>
                    </div>
                    <div className={"px-10 text-sm text-gray-400 dark:text-gray-400 mb-2"}>{list && list.remaining ? list.remaining + " remaining tasks" : "All task are completed"}</div>

                    {sections && sections.map((section, sectionKey) => {
                        return (
                            <div key={sectionKey}>
                                <button onClick={() => toggleStatus(section)} className={"bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 text-left w-full flex gap-x-4 py-4 px-10 items-center border-t dark:border-gray-800 dark:bg-gray-900"} key={sectionKey}>
                                    <div className={`text-sm w-full font-semibold text-[16px] `}>
                                        {section.name} </div>
                                </button>
                                <SortableList items={section.todos} onSortEnd={onSortEnd} lockAxis={"y"} lockToContainerEdges={true}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}

const SortableItem = SortableElement(({todo}) => {

    const [isHovering, setIsHovering] = useState(false)

    return (
        <div className={"h-16 hover:bg-gray-100"} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className={"flex h-full items-center gap-x-1 border-t pr-9"}>
                <button className={"w-7 ml-2"}>
                    <BiMenu className={`${isHovering?"visible":"hidden"} h-6 w-6`}/>
                </button>
                <button className={"rounded-full hover:bg-gray-200 p-1"} >
                    <BiCheckCircle className={`${todo.completed ? "text-indigo-500" : "text-gray-400"} w-6 h-6`}/>
                </button>
                {todo.order}
                <button className={`${todo.completed ? "text-gray-400" : "text-gray-900"} w-full text-sm text-left`}>{todo.name}</button>
            </div>
        </div>
    )
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((todo, index) => (
                <SortableItem key={`item-${todo.id}`} index={index} todo={todo} collection={todo.task_list_id}/>
            ))}
        </div>
    );
});
