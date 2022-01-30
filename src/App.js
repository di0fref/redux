import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            {/*<Route exact path={'/'} element={<PrivateRoute user={user}/>}>*/}
                <Route path={"/folder/:folder_id/note/:note_id"} element={<Main/>}/>
                <Route exact path={"/folder/:folder_id"} element={<Main/>}/>
                <Route exact path={"/note/:note_id"} element={<Main/>}/>
                <Route exact path={"/"} element={<Main/>}/>
            {/*</Route>*/}
            {/*<Route exact path={"/login"} element={<Login/>}/>*/}
        </Routes>
    );
}

export default App;
