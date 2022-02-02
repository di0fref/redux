import {useDispatch, useSelector} from "react-redux";
import {setCurrentNote} from "../features/currentNoteSlice";
import {addNote, fetchNotesByFolderId, sortNotes} from "../features/noteSlice";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import {useNavigate, useParams} from "react-router";
import {BiEdit, BiLock, BiSearch} from "react-icons/bi";
import {setOpen} from "../features/sidebarSlice";
import {FaSearch, FaStar, FaTimes} from "react-icons/fa";
import {momentConfig, UNTITLED} from "../config/config";
import {createSelector} from 'reselect'

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function NoteCard(props) {

    const currentNote = useSelector((state) => state.currentNote)
    const dispatch = useDispatch();

    let params = useParams();
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        if (params.note_id == props.note.id) {
            dispatch(setCurrentNote(props.note.id))
        }
    }, [params.note_id])

    const strip = (text) => {
        return text.replace(/(<([^>]+)>)/gi, "");
    }

    const getIngress = (text) => {

        if (typeof text === "string") {
            let json = JSON.parse(text);
            let converter = new QuillDeltaToHtmlConverter(json.ops, {});
            return strip(converter.convert().trunc(95));
        }
        return "..."
    };
    const [note, setNote] = useState([])

    useEffect(() => {
        setNote(props.note)
    }, [props.note])

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    })

    return (
        <>
            <Link to={`/folder/${note.folder_id}/note/${note.id}`} onClick={
                () => {
                    if (windowSize < 768) dispatch(setOpen(false))
                }}
                  className={`text-sm block px-6 pt-3 pb-4 border-b dark:border-gray-700/40 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentNote === note.id ? "bg-blue-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}>
                <div className={"flex justify-between items-center mb-1"}>

                    <div className={"font-semibold text-gray-800 dark:text-gray-400 mr-auto"}>
                        {note.name ? note.name : UNTITLED}
                    </div>
                    <div className={"text-xs text-gray-500"}>
                        <Moment calendar={momentConfig}>{note.updated_at}</Moment>
                    </div>
                </div>
                <div>
                    <span className={"break-words text-sm text-gray-500 dark:text-gray-400"}> {getIngress(note.text)}</span>
                </div>
                <div className={"w-full flex items-center justify-end"}>
                    {note.locked ? <BiLock className={"ml-auto text-gray-400 mr-1"}/> : ""}
                    {note.bookmark ? <FaStar className={"text-yellow-400 mr-1"}/> : ""}
                </div>
            </Link>

        </>
    )
}

const selectItemsWhoseNamesIncludes = (items, namePrefix) =>
    Object.values(items).filter(item => item.name.toLowerCase().includes(namePrefix))


export default function Notelist() {

    const [term, setTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.sidebar)
    const currentFolder = useSelector((state) => state.currentFolder)
    const navigator = useNavigate()
    const notes = useSelector((state) => state.notes)

    const selectNotesInFolder = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).filter(note => (note.folder_id == currentFolder.id && note.deleted !== true))
    )
    const selectNotesInTrash = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).filter(note => note.deleted === true)
    )
    const selectNotesInBookmarks = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).filter(note => note.bookmark === true && note.deleted !== true)
    )
    const selectSearchResults = createSelector(
        (state) => state.notes,
        (state, term) => term,
        (notes) => Object.values(notes).filter(note => note.name.startsWith(term) && note.deleted !== true)
    )
    const bookmarks = useSelector(selectNotesInBookmarks)
    const notesInFolder = useSelector(selectNotesInFolder)
    const trash = useSelector(selectNotesInTrash);

    useEffect(() => {
        if (term !== "") {
            // setSearchResults(selectItemsWhoseNamesIncludes(notes, term))
        } else {
            clearResults();
        }
    }, [term]);

    const clearResults = () => setSearchResults([]);

    const newDocumentHandler = () => {
        dispatch(addNote(currentFolder.id)).then((result) => {
            navigator(`/folder/${currentFolder.id}/note/${result.payload.id}`)
        })
    }

    const getListType = () => {
        let data = []
        if (term) {
            searchResults.map((note, key) => {
                data.push(<NoteCard note={note} key={key}/>)
            })
            if (data.length === 0) {
                data.push(
                    <div key={"no-result"} className={"text-sm font-medium h-20 mt-20 flex items-center justify-center"}>
                        <p><FaSearch className={"h-6 w-6 text-gray-500 dark:text-gray-400/40"}/></p>
                        <p className={"text-gray-500 dark:text-gray-400 ml-2"}>Uh, oh, nothing found.</p>
                    </div>
                )
            }
        } else {
            switch (currentFolder.id) {
                case "bookmarks":
                    bookmarks.map((note, key) => {
                        data.push(<NoteCard note={note} key={key}/>)
                    })
                    break;
                case "trash":
                    trash.map((note, key) => {
                        data.push(<NoteCard note={note} key={key}/>)
                    })
                    break;
                default:
                    notesInFolder.map((note, key) => {
                        data.push(<NoteCard note={note} key={key}/>)
                    })
                    break
            }
        }
        return data;
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
                <button className={"mx-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"} onClick={newDocumentHandler}>
                    <BiEdit className={"h-5 w-5"}/>
                </button>
                <button className={`mr-2 block md:hidden ${sidebar ? "block" : "hidden"}`} onClick={() => dispatch(setOpen(false))}>
                    <FaTimes className={"h-5 w-5 text-gray-400 hover:text-gray-200"}/>
                </button>
            </div>
            <div className={"overflow-y-auto h-full border-l border-r dark:border-gray-700/40"}>

                {getListType()}

            </div>
        </div>
    )
}
