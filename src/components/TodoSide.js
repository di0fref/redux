import {BiCheckCircle, BiEdit, BiSearch} from "react-icons/bi";
import {setSidebarOpen} from "../features/sideSlice";
import {FaTimes} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";


export default function TodoSide() {
    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.side.sidebar)
    const [term, setTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const todoListsAll = useSelector(state => state.todos)

    const [showCompleted, setShowCompleted] = useState("")

    let params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const show = localStorage.getItem("showCompleted");
        const last = localStorage.getItem("lastList");

        navigate(`/app/todos/list/${last}`);
        console.log(show)
        setShowCompleted(show)
    }, [])

    const clickHandle = (id) => {
        navigate(`/app/todos/list/${id}`);
        localStorage.setItem("lastList", id);
    }

    const toggleCompleted = () => {
        setShowCompleted(showCompleted === "1" ? "0" : "1")
        localStorage.setItem("showCompleted", showCompleted === "1" ? "0" : "1")
    }

    return (
        <div className={"notelist"}>
            <div className="flex items-center justify-between h-14 bg-gray-200 dark:bg-gray-800 bg-gray-200 border-b border-b-gray-300/50  border-b dark:border-gray-700/50">
                <div className="relative text-gray-400 focus-within:text-gray-400 ml-2 w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <BiSearch/>
                        </button>
                    </span>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} type="search" name="q" className="w-full mr-2 py-2 text-sm dark:text-white text-gray-700 dark:bg-gray-700 rounded-lg pl-10 focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-500" placeholder="Search..." autoComplete="off"/>
                </div>
                <button data-tip={"New document"} className={"mx-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"}>
                    <BiEdit className={"h-5 w-5"}/>
                </button>
                <button className={`mr-2 block md:hidden ${sidebar ? "block" : "hidden"}`} onClick={() => dispatch(setSidebarOpen(false))}>
                    <FaTimes className={"h-5 w-5 text-gray-400 hover:text-gray-200"}/>
                </button>
            </div>
            <div className={"py-8 border-r border-gray-200 dark:border-gray-700/40 h-10 text-2xl font-bold text-gray-700 dark:text-gray-400 flex items-center justify-center dark:text-gray-100"}>
                Task lists
            </div>
            <div className={"flex items-center justify-center"}>
                <button className={"dark:text-gray-200 text-gray-600 -font-bold text-sm hover:underline mb-3"} onClick={toggleCompleted}>
                    <span>{showCompleted === "0"? "Hide" : "Show"} completed</span>
                </button>
            </div>
            <div className={"overflow-y-auto h-full border-r border-gray-200 dark:border-gray-700/40"}>

                {todoListsAll.map((list, key) => {
                    return (
                        (showCompleted === "1" && list.remaining === 0) ? "" :
                            <button onClick={() => clickHandle(list.id)} className={`${list.id == params.list_id ? "bg-blue-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}  w-full text-sm block px-6 py-6 border-b dark:border-gray-700/40 hover:bg-gray-50 dark:hover:bg-gray-700`} key={key}>
                                <div className={"flex items-center gap-x-3 "}>
                                    <div>
                                        <BiCheckCircle className={`${list.remaining ? "dark:text-gray-400 text-gray-400" : "text-green-500"}  h-5 w-5`}/>
                                    </div>
                                    <div className={"text-gray-700 dark:text-gray-200 font-bold"}>{list.name} {list.remaining}</div>
                                </div>
                                <div className={"text-left text-gray-400 dark:text-gray-500 ml-8 mt-1"}>{list.remaining ? list.remaining + " remaining tasks" : "Good job, all tasks are completed"} </div>
                            </button>
                    )
                })}
            </div>
        </div>
    )
}
