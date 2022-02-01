import {useDispatch, useSelector} from "react-redux";
import {setCurrentNote} from "../features/currentNoteSlice";
import {addNote, fetchNotesByFolderId, sortNotes} from "../features/noteSlice";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import NoDocumentOpen from "./NoDocumentOpen";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import {useNavigate, useParams} from "react-router";
import {BiEdit, BiLock, BiSearch} from "react-icons/bi";
import {setOpen} from "../features/sidebarSlice";
import {FaStar, FaTimes} from "react-icons/fa";
import {momentConfig} from "../config/config";

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
                () => {if(windowSize < 768) dispatch(setOpen(false))}}
                  className={`block px-6 pt-3 pb-4 border-b hover:bg-blue-50 ${currentNote === note.id ? "bg-blue-50" : "bg-white"}`}>
                <div className={"flex justify-between items-center mb-1"}>
                    {note.bookmark?<FaStar className={"text-yellow-400 mr-1"}/>:""}
                    <div className={"font-semibold text-gray-800 mr-auto"}>
                         {note.name}
                    </div>
                    <div className={"text-xs text-sky-500"}>
                        <Moment calendar={momentConfig}>{note.updated_at}</Moment>
                    </div>
                </div>
                <div>
                    <span className={"break-words text-sm text-gray-500"}> {getIngress(note.text)}</span>
                </div>
                <div className={"w-full"}>{note.locked?<BiLock className={"ml-auto text-gray-400"}/>:""}</div>
            </Link>
        </>
    )
}

const selectItemsWhoseNamesStartWith = (items, namePrefix) =>
    Object.values(items).filter(item => item.text.toLowerCase().includes(namePrefix))

export default function Notelist() {

    const notes = useSelector((state) => state.notes)
    const [term, setTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.sidebar)
    const currentFolder = useSelector((state) => state.currentFolder)
    const navigator = useNavigate()

    useEffect(() => {
        if (term !== "") {
            setSearchResults(selectItemsWhoseNamesStartWith(notes, term))
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
    return (
        <div className={"h-screen"}>
            <div className="flex items-center justify-between h-14 bg-gray-600">

                <div className="relative text-gray-400 focus-within:text-gray-400 ml-2 w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <BiSearch/>
                        </button>
                    </span>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} type="search" name="q" className="w-full mr-2 py-2 text-sm text-white bg-gray-800 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autoComplete="off"/>
                </div>
                <button className={"mx-2 text-gray-400 hover:text-gray-200"} onClick={newDocumentHandler}>
                    <BiEdit className={"h-5 w-5"}/>
                </button>
                <button className={`mr-2 block md:hidden ${sidebar?"block":"hidden"}`} onClick={() => dispatch(setOpen(false))}>
                    <FaTimes className={"h-5 w-5 text-gray-400 hover:text-gray-200"}/>
                </button>
            </div>
            <div className={"overflow-y-auto h-full border-l border-r"}>
                {notes.length ?
                    notes.map((note, key) => {
                        return (
                            <NoteCard note={note} key={key}/>
                        )
                    })
                    : <NoDocumentOpen/>}
            </div>
        </div>
    )
}
