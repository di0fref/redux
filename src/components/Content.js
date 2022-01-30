import {useDispatch, useSelector} from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {useEffect, useRef, useState} from "react";
import {updateNoteBody, updateNoteTitle} from "../features/noteSlice";
import {TextareaAutosize} from "@mui/material";
import NoDocumentOpen from "./NoDocumentOpen";

export default function Content() {
    const currentNote = useSelector((state) => state.currentNote)
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const changeHandler = (content, delta, source, editor) => {
        if (source === "user") {
            const timer = setTimeout(() => dispatch(updateNoteBody({
                text: JSON.stringify(editorRef.current.editor.getContents()),
                id: currentNote.id
            })), 1000);
            return () => clearTimeout(timer);
        }
    }
    const titleChangeHandler = (e) => {
        dispatch(updateNoteTitle({
            name: title,
            id: currentNote.id
        }))
    }

    useEffect(() => {
        setTitle(currentNote.name || "")
    }, [currentNote])

    return (

        <div className={"text-slate-500 flex flex-col"}>
            <div className={"bg-gray-600 h-14"}>
                {/*<input type={"text"} className={"bg-gray-200 mt-2 w-full p-2"}*/}
                {/*       value={debouncedTerm}*/}
                {/*       onChange={(e) => setDebouncedTerm(e.target.value)}*/}
                {/*/>*/}
            </div>
            <div className={"flex justify-center"}>
                <div className={"w-160"}>
                {currentNote.id ?
                    <>
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
                            value={currentNote.text ? JSON.parse(currentNote.text) : ""}
                            ref={editorRef}
                            bounds={".quill"}
                            onChange={changeHandler}/>
                    </>
                    : <NoDocumentOpen/>}
                </div>
            </div>
        </div>


    )
}
