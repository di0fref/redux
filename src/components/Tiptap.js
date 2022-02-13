import React, {useCallback} from 'react'
import {BubbleMenu, EditorContent, useEditor,} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    FaBold,
    FaCode,
    FaHeading,
    FaItalic,
    FaListOl,
    FaListUl,
    FaRulerHorizontal,
    FaStrikethrough
} from "react-icons/fa";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash.debounce";
import {updateNoteBody} from "../features/noteSlice";
import {Placeholder} from "@tiptap/extension-placeholder";
import Code from '@tiptap/extension-code'
import {TaskList} from "@tiptap/extension-task-list";
import {TaskItem} from "@tiptap/extension-task-item";

export default function Tiptap() {

    const currentNote = useSelector((state) => state.currentNote)
    const selectNote = createSelector(
        (state) => state.notes,
        (notes) => Object.values(notes).find(note => note.id == currentNote)
    )
    const note = useSelector(selectNote);
    const dispatch = useDispatch();

    const editor = useEditor({
        onUpdate({editor}) {
            debounced(editor)
        },
        extensions: [
            Code,
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something awesome...',
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose focus:outline-none dark:prose-invert p-4 max-w-[65ch] print:text-black',
            },
        },
        content: JSON.parse(note.text),
        // editable: note.locked,
    })

    const debounced = useCallback(debounce((editor) => {
        dispatch(updateNoteBody({
            text: editor.getJSON(),
            id: note.id
        }))
    }, 1000), [currentNote]);

    return (
        <>
            {editor && <BubbleMenu className="bubble-menu" tippyOptions={{duration: 100}} editor={editor}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <FaBold/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <FaItalic/>
                </button>


                <button data-tip={"Heading 1"}
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
                >
                    <div className={"flex items-center"}>
                        <FaHeading/>
                        1
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
                >
                    <div className={"flex items-center"}>
                        <FaHeading/>
                        2
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                    className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
                >
                    <div className={"flex items-center"}>
                        <FaHeading/>
                        3
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <FaListUl/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <FaListOl/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <FaStrikethrough/>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeblock') ? 'is-active' : ''}
                >
                    <FaCode/>
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <FaRulerHorizontal/>
                </button>
            </BubbleMenu>}

            <EditorContent editor={editor}/>
        </>
    )
}
