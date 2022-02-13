import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Login from "./components/Login";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";
import SharedFile from "./components/SharedFile"
import SignUp from "./components/SignUp";
import Todo from "./components/Todo";
import {useDispatch} from "react-redux";
import {fetchAllNotes} from "./features/noteSlice";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getAll} from "./features/todoSlice";


function App() {
    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
            setUser(user)
            localStorage.setItem('expectSignIn', '1')
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });
    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllNotes())
        dispatch(getAll())
    }, [])

    return (
        <>
            <DndProvider backend={HTML5Backend}>

                <ToastContainer
                    hideProgressBar={true}
                    className={""}
                    position="top-center"/>
                <ReactTooltip backgroundColor={"#000"} effect={"solid"} className={"z"}/>
                <Routes>
                    <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                        <Route path={"/app/documents/folder/:folder_id/note/:note_id"} element={<Main/>}/>
                        <Route exact path={"/app/documents/folder/:folder_id"} element={<Main/>}/>
                        <Route exact path={"/app/documents/note/:note_id"} element={<Main/>}/>
                        <Route exact path={"/app/documents/:folder_id"} element={<Main/>}/>
                        <Route exact path={"/app/documents"} element={<Main/>}/>

                        {/*<Route exact path={"/bookmarks/note/:note_id"} element={<Main/>}/>*/}
                        <Route exact path={"/"} element={<Main/>}/>

                        <Route exact path={"/app/tasks"} element={<Todo/>}/>
                        <Route exact path={"/app/tasks/list/:list_id"} element={<Todo/>}/>

                    </Route>
                    <Route exact path={"/login"} element={<Login/>}/>
                    <Route exact path={"/shared/:id"} element={<SharedFile/>}/>
                    <Route exact path={"/signup"} element={<SignUp/>}/>
                </Routes>
            </DndProvider>
        </>
    );
}

export default App;
