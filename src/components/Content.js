import {useDispatch, useSelector} from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {useCallback, useEffect, useRef, useState} from "react";
import {updateBookMark, updateLock, updateNoteBody, updateNoteTitle} from "../features/noteSlice";
import {TextareaAutosize} from "@mui/material";
import NoDocumentOpen from "./NoDocumentOpen";
import {BiLock, BiMenu, BiStar} from "react-icons/bi";
import {setOpen} from "../features/sidebarSlice";
import debounce from 'lodash.debounce';
import {FaRegStar, FaStar} from "react-icons/fa";
import {momentConfig} from "../config/config";
import Moment from "react-moment";

export default function Content() {

    const notes = useSelector((state) => state.notes)
    const sidebar = useSelector((state) => state.sidebar)
    const currentNote = useSelector((state) => state.currentNote)
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const note = useSelector((state) => Object.values(state.notes).find(note => note.id === currentNote))

    const debounced = useCallback(debounce(() => {
        dispatch(updateNoteBody({
            text: JSON.stringify(editorRef.current.editor.getContents()),
            id: note.id
        }))
    }, 1000), [currentNote]);

    const bookMarkHandler = () => {
        dispatch(updateBookMark({
            bookmark: note.bookmark ? 0 : 1,
            id: currentNote
        }))
    }

    const lockHandler = () => {
        dispatch(updateLock({
            locked: note.locked ? 0 : 1,
            id: currentNote
        }))
    }
    const changeHandler = (content, delta, source, editor) => {
        if (source === "user") {
            debounced()
        }
    }
    const onBlurHandler = () => {
        dispatch(updateNoteBody({
            text: JSON.stringify(editorRef.current.editor.getContents()),
            id: currentNote
        }))
    }
    const titleChangeHandler = (e) => {
        dispatch(updateNoteTitle({
            name: title,
            id: currentNote
        }))
    }

    useEffect(() => {
        setTitle(note && note.name || "")
    }, [currentNote])

    return (

        <div className={"text-slate-500 flex flex-col"}>
            <div className={"bg-gray-600 h-14 flex items-center justify-between"}>
                <button className={"ml-2"} onClick={() => dispatch(setOpen(!sidebar))}>
                    <BiMenu className={"h-6 w-6 text-gray-200"}/>
                </button>
            </div>
            <div className={"flex justify-center"}>
                <div className={"md:w-160 w-full"}>
                    {currentNote ?
                        <>
                            <div className={"px-3 my-4"}>
                                <div className={"flex"}>
                                    <button className={"flex items-center"} onClick={bookMarkHandler}>
                                        {note && note.bookmark
                                            ? <FaStar className={"text-yellow-400"}/>
                                            : <FaRegStar/>
                                        }
                                        <div className={"ml-1 mr-4 hover:text-sky-500 text-gray-500"}>Bookmark</div>
                                    </button>
                                    <button className={"flex items-center"} onClick={lockHandler}>
                                        {note && note.locked
                                            ? <BiLock className={"text-red-600"}/>
                                            : <BiLock/>
                                        }
                                        <div className={"ml-1 hover:text-sky-500 text-gray-500"}>
                                            {note && note.locked ? "Locked" : "Lock"}
                                        </div>
                                    </button>
                                    <div className={"text-sm ml-auto"}>Updated: <Moment calendar={momentConfig}>{note && note.updated_at}</Moment>
                                    </div>
                                </div>
                            </div>

                            <TextareaAutosize
                                onBlur={titleChangeHandler}
                                maxLength="100"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={"Give your document a title"}
                                value={title}
                                className={"resize-none font-extrabold tracking-tight text-gray-800  bg-transparent px-3 w-full text-5xl  border-0 focus:outline-none focus:ring-0"}
                            />
                            <ReactQuill
                                theme={"bubble"}
                                placeholder="Click here to start writing"
                                value={(note.text) ? JSON.parse(note.text) : ""}
                                ref={editorRef}
                                bounds={".quill"}
                                onBlur={onBlurHandler}
                                onChange={changeHandler}/>
                        </>
                        : <NoDocumentOpen/>}

                </div>
            </div>
        </div>
    )
}
