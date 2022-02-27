import {Fragment, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {useSelector} from "react-redux";
import {FaRegStar, FaSearch, FaStar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function Item({note}) {

    const navigator = useNavigate()
    const clickHandler = () => {
        navigator(`/app/docs/folder/${note.folder_id}/note/${note.id}`)
    }
    return (
        <button className={"flex items-center justify-between w-full"} onClick={clickHandler}>
            <div>{note.name}</div>
            <div>{note.bookmark ? <FaStar className={"text-yellow-400"}/> :
                <FaRegStar className={"text-gray-400"}/>}</div>
        </button>
    )
}

export default function MyCombobox() {
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState('')
    const notes = useSelector(state => state.notes)

    const filteredNotes =
        query === ''
            ? notes
            : notes.filter((note) =>
                note.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className="w-full z-50">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full text-left border-b dark:border-gray-700 cursor-default sm:text-sm overflow-hidden">
                        <div className={"flex items-center"}>
                            <div className={"ml-4"}><FaSearch className={"h-5 w-5 dark:text-gray-500 text-gray-200"}/></div>
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
                            {filteredNotes.length === 0 && query !== '' ? (
                                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredNotes.map((note) => (
                                    <Combobox.Option
                                        key={note.id}
                                        className={({active}) =>
                                            `text-gray-500 dark:text-gray-400 cursor-pointer select-none relative py-4 pl-5 pr-4 border-b border-gray-100 dark:border-gray-700/60 ${
                                                active ? 'bg-gray-100 dark:bg-gray-700/30' : ''
                                            }`
                                        }
                                        value={note}>
                                        {({selected, active}) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}><Item note={note}/>
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}>
                                                        <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
