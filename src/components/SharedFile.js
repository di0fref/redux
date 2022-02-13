import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiConfig, momentConfig} from "../config/config";
import 'react-quill/dist/quill.bubble.css';
import ReactHtmlParser from "react-html-parser";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import Moment from "react-moment";

export default function SharedFile() {

    let params = useParams()
    const [note, setNote] = useState()
    useEffect(() => {
        (async () => {
            const response = await fetch(apiConfig.url + "/api/notes/shared/" + params.id)
                .then(response => response.json())
            setNote(response)
        })();
    }, [params.id])

    const getHtml = (text) => {
        if (typeof text === "string") {
            let json = JSON.parse(text);
            let converter = new QuillDeltaToHtmlConverter(json.ops, {});
            return converter.convert();
        }
        return "..."
    };

    return (
        note?
        <div className={"flex justify-center h-screen p-6"}>
            <div className={"text-gray-700 prose"}>
                <div>Updated: <Moment calendar={momentConfig}>{note.updated_at}</Moment></div>
                <div className={"text-3xl font-bold"}>{note.name}</div>
                {ReactHtmlParser(getHtml(note&&note.text))}
            </div>
        </div>
            :""
    )
}
