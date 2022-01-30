import {useDispatch, useSelector} from "react-redux";
import {setCurrentNote} from "../features/currentNoteSlice";
import {addNote, fetchNotesByFolderId, sortNotes} from "../features/noteSlice";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import NoDocumentOpen from "./NoDocumentOpen";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import {useParams} from "react-router";
import useUrl from "../hooks/useUrl";
import {createSelector} from "@reduxjs/toolkit";
import log from "tailwindcss/lib/util/log";

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

function NoteCard(props) {

    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.currentNote)
    let params = useParams();
    useUrl(
        (params) => {
            if (params.note == props.note.id) {
                dispatch(setCurrentNote(props.note))
            }
        },
        [params.note]
    );
    const momentConfig = {
        lastDay: '[Yesterday at] HH:mm',
        sameDay: '[Today at] HH:mm',
        nextDay: '[Tomorrow at] HH:mm',
        lastWeek: '[last] dddd [at] HH:mm',
        nextWeek: 'dddd [at] HH:mm',
        sameElse: "YYYY-MM-DD",
    }

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


    return (
        <>
            <Link to={`/folder/${note.folder_id}/note/${note.id}`}
                  className={`block px-6 pt-3 pb-4 border-b hover:bg-gray-100 ${currentNote.id === note.id ? "bg-gray-100" : "bg-white"}`}>
                <div className={"flex justify-between items-center mb-1"}>
                    <div className={"font-semibold text-gray-800"}>
                        {note.name}
                    </div>
                    <div className={"text-sm text-sky-500"}>
                        <Moment calendar={momentConfig}>{note.updated_at}</Moment>
                    </div>
                </div>
                <div>
                    <span className={"break-words text-sm text-gray-500"}> {getIngress(note.text)}</span>
                </div>
            </Link>
        </>
    )
}

const selectItemsWhoseNamesStartWith = (items, namePrefix) =>
    Object.values(items).filter(item => item.name.toLowerCase().startsWith(namePrefix))

export default function Notelist() {

    const notes = useSelector((state) => state.notes)
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (term !== "") {
            setSearchResults(selectItemsWhoseNamesStartWith(notes, term))
        } else {
            clearResults();
        }
    }, [term]);
    const clearResults = () => setSearchResults([]);

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 500);
        return () => clearTimeout(timer);
    }, [debouncedTerm]);

    return (
        <div className={"h-screen"}>

            <div className={"bg-gray-600 h-14"}>
                {/*<input type={"text"} className={"bg-gray-200 mt-2 w-full p-2"}*/}
                {/*       value={debouncedTerm}*/}
                {/*       onChange={(e) => setDebouncedTerm(e.target.value)}*/}
                {/*/>*/}
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
