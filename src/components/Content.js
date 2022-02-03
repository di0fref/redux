import {useDispatch, useSelector} from "react-redux";
import ReactQuill, {Quill} from 'react-quill';
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
import ThemeSwitcher from "./ThemeSwitcher";
import NoteMenu from "./menus/noteMenu";
import ReactTooltip from "react-tooltip";
const Delta = Quill.import('delta')

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
        })).then((r) => {
            ReactTooltip.rebuild()
        })
    }

    const lockHandler = () => {
        dispatch(updateLock({
            locked: note.locked ? 0 : 1,
            id: currentNote
        })).then((r) => {
            ReactTooltip.rebuild()
        })
    }
    const changeHandler = (content, delta, source, editor) => {
        if (source === "user") {
            debounced()
        }
    }
    const titleChangeHandler = (e) => {
        dispatch(updateNoteTitle({
            name: title,
            id: currentNote
        }))
    }

    useEffect(() => {
        setTitle(note && note.name || "")
        ReactTooltip.rebuild()
    }, [currentNote])

    const modules = {
        clipboard: {
            matchers: [
                [Node.ELEMENT_NODE, function (node, delta) {
                    return delta.compose(new Delta().retain(delta.length(),
                        {
                            color: false,
                            background: false,
                            bold: false,
                            strike: false,
                            underline: false
                        }
                    ));
                }
                ]
            ]
        }
    }
    return (

        <div className={"text-slate-500 flex flex-col "}>
            <div className={"bg-gray-200 border-b-gray-300/50 dark:bg-gray-800 h-14 flex items-center justify-between border-b dark:border-gray-700/50"}>
                <button data-tip={"Toggle sidebar"} className={"ml-2 dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-700"} onClick={() => dispatch(setOpen(!sidebar))}>
                    <BiMenu className={"h-6 w-6"}/>
                </button>
                {currentNote ?
                    <div className={"px-3 my-4 w-full"}>
                        <div className={"flex justify-end"}>
                            <button data-tip={"Bookmark"} className={"flex items-center hover:text-indigo-500 mr-3"} onClick={bookMarkHandler}>
                                {note && note.bookmark
                                    ? <FaStar className={"text-yellow-400"}/>
                                    : <FaRegStar/>
                                }
                            </button>
                            <button data-tip={`${note.locked?"Unlock":"Lock"}`} className={"flex items-center hover:text-indigo-500"} onClick={lockHandler}>
                                {note && note.locked
                                    ? <BiLock className={"text-red-600"}/>
                                    : <BiLock/>
                                }
                            </button>
                        </div>
                    </div>
                    : ""}
                {currentNote ? <div className={"ml-auto"}><NoteMenu/></div> : ""}
                <ThemeSwitcher/>
            </div>
            <div className={"flex justify-center p-4 overflow-y-auto editor-wrapper "}>
                <div className={"max-w-[65ch] editor prose"}>
                    {currentNote ?
                        <>
                            <div className={"px-3 my-4"}>
                                <div className={"flex"}>
                                    <div className={"text-sm text-gray-700 dark:text-gray-400"}>Updated: <Moment calendar={momentConfig}>{note && note.updated_at}</Moment>
                                    </div>
                                </div>
                            </div>

                            <TextareaAutosize
                                readOnly={note.locked || note.deleted ? true : false}
                                onBlur={titleChangeHandler}
                                maxLength="100"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={"Give me a title"}
                                value={title}
                                className={"resize-none font-extrabold tracking-tight text-gray-800 dark:text-gray-300  bg-transparent px-3 w-full text-4xl border-0 focus:outline-none focus:ring-0"}
                            />
                            <ReactQuill
                                readOnly={note.locked || note.deleted ? true : false}
                                theme={"bubble"}
                                placeholder="Write something awesome..."
                                value={(note.text) ? JSON.parse(note.text) : ""}
                                ref={editorRef}
                                bounds={".quill"}
                                modules={modules}
                                onChange={changeHandler}/>
                        </>
                        : <div className={"mt-60"}><NoDocumentOpen/></div>}

                </div>
            </div>
        </div>
    )
}
