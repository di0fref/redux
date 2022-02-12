import React, {Component, useEffect, useState} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {useParams} from "react-router-dom";
import {BiCheckCircle, BiMenu} from "react-icons/bi";

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

export default function SortableComponent() {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(null)
    const [listId, setListId] = useState(null)
    let params = useParams()

    const getStatus = (_, status) => status;
    const getListId = (_, id) => id;

    const selectTodosInList = createSelector(
        (state) => state.todos,
        getStatus,
        (todos, status) => Object.values(todos).filter(list => list.id == listId).map(list => list.todos).filter(todo => status == null ? todo : todo.done == status)[0])

    const selectSectionsInList = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(list => list.id == params.list_id).map(list => list.sections)[0]
    )

    const selectTodosInSection = createSelector(
        (state) => state.todos,
        (todos) => Object.values(todos).filter(list => list.id == params.list_id).map(list => list.sections)[0]
    )

    const sections = useSelector(state => selectSectionsInList(state))
    const t = useSelector(state => selectTodosInSection(state))


    useEffect(() => {
        setListId(params.list_id)
    }, [params.list_id])

    const [data, setData] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setData(arrayMoveImmutable(data, oldIndex, newIndex));
    };
    return (
    sections && sections.map((section, sectionKey) => {
        return (
            <>
                <div className={"bg-gray-100 dark:bg-gray-800/40 dark:border-gray-700/40 font-semibold py-2 px-7 border-y border-gray-200 py-2"}>{section.name}</div>
                <SortableList items={data} onSortEnd={onSortEnd}/>
                {/*{section.todos.map((todo, todoKey) => {*/}
                {/*    return (*/}
                {/*        <button className={"text-left w-full flex gap-x-4 py-4 px-6 items-center border-b dark:border-gray-800 dark:bg-gray-900"}>*/}
                {/*            <div className={"mb-auto"}><BiMenu className={"w-6 h-6 text-gray-600"}/></div>*/}
                {/*            <div className={"rounded-full mb-auto"}>*/}
                {/*                <BiCheckCircle className={`${todo.completed ? "text-green-500" : "text-gray-400"} w-6 h-6`}/>*/}
                {/*            </div>*/}
                {/*            <div className={"text-sm"}>{todo.text}</div>*/}
                {/*        </button>*/}
                {/*    )*/}
                {/*})}*/}
            </>
        )
    })
)

}
