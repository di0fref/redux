import {forwardRef, useEffect, useState} from "react";
import {FaChevronDown, FaEdit, FaFilePdf, FaLink, FaShare, FaTimes, FaTrash, FaUserAlt} from "react-icons/fa";
import {Menu} from '@headlessui/react'
import {BiChevronDown, BiLink, BiShare, BiTrash} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote} from "../../features/noteSlice";
import {setCurrentNote} from "../../features/currentNoteSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Modal} from "@mui/material";
import {modalstyleLarge, modalstyleSmall} from "../../config/styles";
import ReactTooltip from "react-tooltip";

function NoteMenu(props) {

    const currentNote = useSelector((state) => state.currentNote)
    const currentFolder = useSelector((state) => state.currentFolder)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [permissionOpen, setPermissionOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
        ReactTooltip.rebuild()
    };
    const handleModalClose = () => {
        setModalOpen(false)
        // setShowError(false)
    };

    const navigator = useNavigate()
    const _action = (e) => {
    }
    const data = [
        {
            title: "Download as PDF",
            icon: <FaFilePdf/>,
            action: () => _action()
        },
        {
            title: "Share document",
            icon: <BiShare/>,
            action: () => handleModalOpen()
        },
        {
            title: "Move to trash",
            icon: <BiTrash/>,
            action: () => {
                dispatch(deleteNote(currentNote))
                dispatch(setCurrentNote(null))
                navigator(`/folder/${currentFolder.id}`)
                toast.success("Document moved to trash")
            }
        },
    ]


    const UpdatePermissionButton = forwardRef(({children}, ref) => (
        <button onClick={() => setPermissionOpen(false)} ref={ref} className={"hover:bg-indigo-600 relative items-center flex justify-center w-full h-10 px-4 py-3 mt-6 font-medium text-white border border-transparent rounded-md group bg-indigo-500"}>
            {children}
        </button>
    ));

    const CustomMenuButton = forwardRef(({children}, ref) => (
        <button onClick={() => setPermissionOpen(!permissionOpen)} ref={ref}>
            {children}
        </button>
    ));

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
                                    <Menu.Item>
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
            <Modal open={modalOpen} onClose={handleModalClose} keepMounted={true}>
                <div style={modalstyleLarge} className={"block rounded rounded- shadow-lg bg-gray-100 dark:bg-gray-700 w-144 text-gray-600 dark:text-gray-200"}>
                    <div className={"bg-white dark:bg-gray-700 rounded rounded-lg"}>
                        <div className={"w-full"}>
                            <input placeholder={"Type email"} type={"email"} autoFocus={true} className={"text-sm w-full rounded-t rounded-t-lg px-3 py-4 focus:outline-0 bg-white dark:bg-gray-500"}/>
                        </div>
                    </div>
                    <div className={"flex items-center p-4 text-sm"}>
                        <div><FaUserAlt/></div>
                        <div className={"ml-4 font-semibold"}>Fredrik Fahlstad</div>
                        <div className={"ml-auto"}>
                            <div className={"mt-3 mb-3 px-4"}>
                                <Menu as="div" className="relative inline-block text-left w-full">
                                    <Menu.Button as={CustomMenuButton}>
                                        <div className={"flex items-center"}>
                                            <div>Menu</div>
                                            <div><BiChevronDown/></div>
                                        </div>
                                    </Menu.Button>
                                    <Menu.Items static={true} className={"bg-white dark:bg-gray-700 z-10 absolute right-0 w-72 mt-2 origin-top-right rounded-md shadow-lg dark:shadow-neutral-900 shadow-gray-600/60"}>
                                        {permissionOpen && (
                                            <Menu.Item>
                                                <div className={"p-4 "}>
                                                    <div className={"mb-6"}>
                                                        <div className={"font-semibold text-sm"}>Role</div>
                                                    </div>
                                                    <div>
                                                        <div className={"flex items-center"}>
                                                            <input type={"radio"} name="role"/>
                                                            <div className={"ml-4"}>Reader</div>
                                                        </div>
                                                        <div className={"flex items-center mt-3"}>
                                                            <input type={"radio"} name="role"/>
                                                            <div className={"ml-4"}>Writer</div>
                                                        </div>
                                                        <div>
                                                            <UpdatePermissionButton>
                                                                <span>Update</span>
                                                            </UpdatePermissionButton>
                                                            <button className={"flex items-center w-full justify-center mt-4"}>
                                                                <span><BiTrash/></span>
                                                                <span className={"ml-2"}>Remove permission</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Menu.Item>
                                        )}
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className={"flex items-center text-sm border-t border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"}>
                        <div className={"w-full p-4 flex items-center justify-end "}>

                            <div></div>
                            <button className={" flex items-center mr-4"} data-tip={"Create a link to a public version of this document"}>
                                <div></div>
                                <div>Publish to web</div>
                            </button>
                            <button className={"flex items-center "}>
                                <div className={"mr-1"}><BiLink/></div>
                                <div>Copy link</div>
                            </button>

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default NoteMenu
