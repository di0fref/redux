import {Combobox, Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'
import {FaRegStar, FaSearch, FaStar} from "react-icons/fa";
import {CheckIcon} from "@heroicons/react/solid";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createSelector} from "reselect";
import Moment from "react-moment";
import {momentConfig} from "../config/config";

function Item({item, type}) {
    console.log(item)
    const navigator = useNavigate()
    const clickHandler = () => {
        switch (type) {
            case "note":
                navigator(`/app/docs/folder/${item.folder_id}/note/${item.id}`)
                break;
            case "todo":
                navigator(`/app/tasks/${item.id}`)
                break;
            default: break;
        }

    }
    return (
        <button className={"flex items-center justify-start w-full gap-x-6"} onClick={clickHandler}>
            <div>{item.name}</div>
            <div className={"ml-auto"}><Moment calendar={momentConfig}>{item.updated_at}</Moment></div>
            <div>{item.bookmark ? <FaStar className={"text-yellow-400"}/> :
                <FaRegStar className={"text-gray-400"}/>}</div>
        </button>
    )
}

export default function SearchDialog(props) {
    let [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState('')

    const allNotesSorted = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).filter(note => note).sort(function (a, b) {
            if (new Date(b.updated_at) > new Date(a.updated_at))
                return 1;
            else
                return -1
        })
    )
    const allTodosSorted = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(todo => todo).sort(function (a, b) {
            if (new Date(b.updated_at) > new Date(a.updated_at))
                return 1;
            else
                return -1
        })
    )
    const notes = useSelector(state => allNotesSorted(state))
    const todos = useSelector(state => allTodosSorted(state))

    const filteredNotes =
        query === ''
            ? notes
            : notes.filter((note) =>
                note.name&&note.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const filteredTodos =
        query === ''
            ? todos
            : todos.filter((todo) =>
                todo.name&&todo.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        <>
            <div className="ml-4 bg-white dark:bg-slate-700 rounded relative_ pointer-events-auto w-60 flex-shrink-0">
                <button onClick={openModal} type="button" className=" w-full flex  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-700 dark:hover:ring-slate-500 dark:highlight-white/5 dark:hover:bg-slate-600">

                    Quick search..
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-20 overflow-y-auto"
                    onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div className="inline-block h-100 w-full max-w-3xl _p-6 _my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-md">
                                <div className="mt-2_">

                                    <div className="w-full z-50">
                                        <Combobox onChange={closeModal}>
                                            <div className="relative mt-1">
                                                <div className="relative w-full text-left border-b dark:border-gray-700 cursor-default sm:text-sm overflow-hidden">
                                                    <div className={"flex items-center"}>
                                                        <div className={"ml-4"}>
                                                            <FaSearch className={"h-5 w-5 dark:text-gray-500 text-gray-200"}/>
                                                        </div>
                                                        <Combobox.Input
                                                            className="block
                                                            text-gray-700
                                                            dark:text-gray-300
                                                                w-full
                                                                px-4
                                                                py-4
                                                                text-base
                                                                font-normal
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 dark:focus:text-gray-200 focus:bg-white focus:outline-none dark:bg-gray-800"
                                                            displayValue={(note) => note.name}
                                                            onChange={(event) => setQuery(event.target.value)}
                                                            placeholder={"Type to search..."}
                                                        />
                                                    </div>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setQuery('')}
                                                >
                                                    <Combobox.Options className=" w-full py-1 mt-1 overflow-auto text-base rounded-md max-h-96 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {(filteredTodos.length === 0 && filteredNotes.length === 0) && query !== '' ? (
                                                            <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className={"text-lg py-4 pl-5 font-medium text-gray-600 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700/60"}>Notes</div>
                                                                {filteredNotes.map((note) => (
                                                                    <Combobox.Option
                                                                        key={note.id}
                                                                        className={({active}) =>
                                                                            `text-gray-500 dark:text-gray-400 cursor-pointer select-none relative py-4 pl-5 pr-4 border-b border-gray-100 dark:border-gray-700/60 ${
                                                                                active ? 'bg-gray-100 dark:bg-gray-700/30' : ''}`}
                                                                        value={note}>
                                                                        <span
                                                                            className={`block truncate`}>
                                                                            <Item item={note} type={"note"} closeModal={closeModal}/>
                                                                        </span>
                                                                    </Combobox.Option>
                                                                ))}
                                                                <div className={"text-lg py-4 pl-5 font-medium text-gray-600 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700/60"}>Tasks</div>
                                                                {filteredTodos.map((todo) => (
                                                                    <Combobox.Option
                                                                        key={todo.id}
                                                                        className={({active}) =>
                                                                            `text-gray-500 dark:text-gray-400 cursor-pointer select-none relative py-4 pl-5 pr-4 border-b border-gray-100 dark:border-gray-700/60 ${
                                                                                active ? 'bg-gray-100 dark:bg-gray-700/30' : ''}`}
                                                                        value={todo}>
                                                                        <span
                                                                            className={`block truncate`}>
                                                                            <Item item={todo} type={"todo"} closeModal={closeModal}/>
                                                                        </span>
                                                                    </Combobox.Option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>

                                </div>

                                <div className="mt-4_">


                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
