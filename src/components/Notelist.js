import {useDispatch, useSelector} from "react-redux";
import {setCurrentNote} from "../features/currentNoteSlice";
import {addNote} from "../features/noteSlice";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {useNavigate, useParams} from "react-router";
import {BiEdit, BiLock, BiMenu, BiSearch, BiTrash} from "react-icons/bi";
import {setSidebarOpen} from "../features/sideSlice";
import {FaSearch, FaStar, FaTimes} from "react-icons/fa";
import {momentConfig, UNTITLED} from "../config/config";
import {createSelector} from 'reselect'
import ReactHtmlParser from 'react-html-parser';
import {toast} from "react-toastify";
import {generateHTML} from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import Strike from '@tiptap/extension-strike'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderList from '@tiptap/extension-ordered-list'
import {CodeBlock} from "@tiptap/extension-code-block";
import Code from '@tiptap/extension-code'
import {HorizontalRule} from "@tiptap/extension-horizontal-rule";
import {TaskList} from "@tiptap/extension-task-list";
import {TaskItem} from "@tiptap/extension-task-item";

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function NoteCard(props) {

    const currentNote = useSelector((state) => state.currentNote)
    const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.currentFolder)
    const navigate = useNavigate()

    let params = useParams();
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        if (params.note_id == props.note.id) {
            console.log(props.note.id)
            dispatch(setCurrentNote(props.note.id))
        }
    }, [params.note_id])

    const strip = (text) => {
        // return text.replace(/(<([^>]+)>)/gi, "");
        return text
    }


    const getIngress = (text) => {

        if (typeof text === "string") {
            let html = generateHTML(JSON.parse(text), [
                Document,
                Paragraph,
                Text,
                Bold,
                ListItem,
                BulletList,
                Italic,
                Heading,
                Strike,
                OrderList,
                CodeBlock,
                Code,
                HorizontalRule,
                TaskList,
                TaskItem
            ])
            return strip(html.trunc(95));
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

    const clickHandle = () => {
        console.log(currentFolder.id)
        switch (currentFolder.id) {
            case "documents":
            case "bookmarks":
            case "trash":
            case 0:
            case "0":
                // dispatch(setCurrentNote(note.id))
                navigate(`/app/docs/${currentFolder.id}/note/${note.id}`)
                break;
            default:
                navigate(`/app/docs/folder/${note.folder_id}/note/${note.id}`)
        }
    }

    return (
        <>
            <Link to={`/app/docs/folder/${note.folder_id}/note/${note.id}`} onClick={
                () => {
                    if (windowSize < 768) dispatch(setSidebarOpen(false));
                }}
                  className={`w-full text-left text-sm block px-6 py-6 border-b dark:border-gray-700/40 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentNote === note.id ? "bg-blue-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}>
                <div className={"flex justify-between items-center mb-1"}>

                    <div className={"font-semibold text-gray-800 dark:text-gray-200 mr-auto"}>
                        {note.name ? note.name : UNTITLED}
                    </div>
                    <div className={"text-xs text-gray-500"}>
                        <Moment calendar={momentConfig}>{note.updated_at}</Moment>
                    </div>
                </div>
                <div>
                    <span className={"break-words text-sm text-gray-500 dark:text-gray-400"}>
                        {ReactHtmlParser(getIngress(note.text))}
                    </span>
                </div>
                <div className={"w-full flex items-center justify-end"}>
                    {note.locked ? <BiLock className={"ml-auto text-red-500 mr-1 h-3 w-3"}/> : ""}
                    {note.bookmark ? <FaStar className={"text-yellow-400 mr-1 h-3 w-3"}/> : ""}
                    {note.deleted ? <BiTrash className={"text-gray-400 mr-1 h-3 w-3"}/> : ""}
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
    const sidebar = useSelector((state) => state.side.sidebar)
    const currentFolder = useSelector((state) => state.currentFolder)
    const navigator = useNavigate()

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
    const allNotes = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).filter(note => note.deleted !== true)
    )

    const bookmarks = useSelector(selectNotesInBookmarks)
    const notesInFolder = useSelector(selectNotesInFolder)
    const trash = useSelector(selectNotesInTrash);
    const all = useSelector(allNotes);

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
            toast.success("Document created")
            navigator(`/app/docs/folder/${currentFolder.id}/note/${result.payload.id}`)
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
                case "documents":
                case "0":
                case 0:
                    all.map((note, key) => {
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
                {/*<div className="relative text-gray-400 focus-within:text-gray-400 ml-2 w-full">*/}
                {/*    <span className="absolute inset-y-0 left-0 flex items-center pl-2">*/}
                {/*        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">*/}
                {/*            <BiSearch/>*/}
                {/*        </button>*/}
                {/*    </span>*/}
                {/*    <input value={term} onChange={(e) => setTerm(e.target.value)} type="search" name="q" className="w-full mr-2 py-2 text-sm dark:text-white text-gray-700 dark:bg-gray-700 rounded-lg pl-10 focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-500" placeholder="Search..." autoComplete="off"/>*/}
                {/*</div>*/}
                {/*<button data-tip={"New document"} className={"mx-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"} onClick={newDocumentHandler}>*/}
                {/*    <BiEdit className={"h-5 w-5"}/>*/}
                {/*</button>*/}
                {/*<button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"}*/}
                {/*        onClick={() => dispatch(setSidebarOpen(!sidebar))}>*/}
                {/*    <BiMenu className={"h-6 w-6"}/>*/}
                {/*</button>*/}
                <button className={`mr-2 block md:hidden ${sidebar ? "block" : "hidden"}`} onClick={() => dispatch(setSidebarOpen(false))}>
                    <FaTimes className={"h-5 w-5 text-gray-400 hover:text-gray-200"}/>
                </button>
            </div>
            <div className={"dark:text-gray-100 py-8 border-r border-gray-200 dark:border-gray-700/40 h-10 text-2xl font-bold text-gray-700 dark:text-gray-400 flex items-center justify-center"}>{currentFolder.name}</div>
            <div className={"overflow-y-auto h-full border-r dark:border-gray-700/40"}>
                {getListType()}
            </div>
        </div>
    )
}
