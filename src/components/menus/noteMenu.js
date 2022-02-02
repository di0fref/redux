import {useEffect, useState} from "react";
import {FaChevronDown, FaEdit, FaFilePdf, FaShare, FaTrash} from "react-icons/fa";
import {Menu} from '@headlessui/react'
import {BiShare, BiTrash} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote} from "../../features/noteSlice";
import {setCurrentNote} from "../../features/currentNoteSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function NoteMenu(props) {

    const dispatch = useDispatch();
    const currentNote = useSelector((state) => state.currentNote)
    const currentFolder = useSelector((state) => state.currentFolder)

    const navigator = useNavigate()
    const _action = (e) => {}
    const data = [
        {
            title: "Download as PDF",
            icon: <FaFilePdf/>,
            action: () => _action()
        },
        {
            title: "Share document",
            icon: <BiShare/>,
            action: () => _action()
        },
        {
            title: "Move to trash",
            icon: <BiTrash/>,
            action: () => {
                // dispatch(deleteNote(currentNote))
                // dispatch(setCurrentNote(null))
                // navigator(`/folder/${currentFolder.id}`)
                toast.success("Document moved to trash")
            }
        },
    ]

    return (
        <>
            <div className={"mt-3 mb-3 px-4"}>
                <Menu as="div" className="relative inline-block text-left w-full">
                    <Menu.Button
                        className={"inline-flex justify-start items-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none "}>
                        <div>Options</div>
                        <FaChevronDown
                            className="ml-2 -mr-1 text-violet-200 hover:text-violet-100  w-3 h-3"
                            aria-hidden="true"/>
                    </Menu.Button>
                    <Menu.Items className={"z-10 dark:highlight-white_ bg-white text-slate-800 dark:bg-slate-700 absolute right-0 _md:left-72 w-72 mt-2 origin-top-right divide-y_ _divide-gray-100 rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                        {data.map((item, index) => {
                            return (
                                <div className="py-1" key={index}>
                                    <Menu.Item >
                                        {({active}) => (
                                            <div
                                                onClick={item.action}
                                                className={`${
                                                    active ? 'dark:bg-slate-600 dark:text-gray-200 text-slate-800 bg-gray-200' : 'dark:text-gray-200 text-slate-800'
                                                } group flex items-center w-full px-2 py-2 text-sm cursor-pointer`}>
                                                <span className={"ml-3 mr-4 text-gray-600 dark:text-gray-200"}>{item.icon}</span>
                                                <span>{item.title}</span>
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            )
                        })}
                    </Menu.Items>
                </Menu>
            </div>
        </>
    )
}

export default NoteMenu
