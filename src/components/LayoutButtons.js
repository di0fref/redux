import {setDocView} from "../features/sideSlice";
import {BsLayoutSidebar, BsLayoutThreeColumns} from "react-icons/bs";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function LayoutButtons() {
    const docView = useSelector((state) => state.side.docView)
    const dispatch = useDispatch()

    return (
        <div className={"ml-auto"}>
            <button className={`${docView === "col" ? "bg-white shadow rounded" : ""}`} onClick={() => dispatch(setDocView("col"))}>
                <BsLayoutSidebar className={"p-1 h-7 w-7"}/></button>
            <button className={`${docView === "grid" ? "bg-white shadow rounded" : ""}`} onClick={() => dispatch(setDocView("grid"))}>
                <BsLayoutThreeColumns className={"p-1 h-7 w-7"}/></button>
        </div>
    )
}
