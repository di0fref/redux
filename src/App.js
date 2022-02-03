import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Login from "./components/Login";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";
import SharedFile from "./components/SharedFile"
function App() {
    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            localStorage.setItem('expectSignIn', '1')
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });
    useEffect(() =>{
        ReactTooltip.rebuild()
    },[])
    return (
        <>
            <ToastContainer
                hideProgressBar={true}
                className={""}
                position="top-center"/>
            <ReactTooltip backgroundColor={"#000"} effect={"solid"}/>
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                    <Route path={"/folder/:folder_id/note/:note_id"} element={<Main/>}/>
                    <Route exact path={"/folder/:folder_id"} element={<Main/>}/>
                    <Route exact path={"/note/:note_id"} element={<Main/>}/>
                    <Route exact path={"/:folder_id"} element={<Main/>}/>
                    <Route exact path={"/"} element={<Main/>}/>
                </Route>
                <Route exact path={"/login"} element={<Login/>}/>
                <Route exact path={"/shared/:id"} element={<SharedFile/>}/>

            </Routes>
        </>
    )
        ;
}

export default App;
