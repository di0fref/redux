import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Login from "./components/Login";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    return (
        <>
            <ToastContainer
                hideProgressBar={true}
                className={""}
                position="top-center"/>
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                    <Route path={"/folder/:folder_id/note/:note_id"} element={<Main/>}/>
                    <Route exact path={"/folder/:folder_id"} element={<Main/>}/>
                    <Route exact path={"/note/:note_id"} element={<Main/>}/>
                    <Route exact path={"/"} element={<Main/>}/>
                </Route>
                <Route exact path={"/login"} element={<Login/>}/>
            </Routes>
        </>
    )
        ;
}

export default App;
