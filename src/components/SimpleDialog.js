import {useState} from "react";
import {Dialog, useMediaQuery, useTheme} from "@mui/material";
import {BsExclamationTriangle} from "react-icons/bs";
import { borders } from '@mui/system';

export default function SimpleDialog({canShow, updateModalState, text, title, submitAction}) {

    const handleClose = () => {
        updateModalState();
    };
    
    const handelSubmit = () => {
        updateModalState()
        submitAction()
    }
    
    return (
        <Dialog open={canShow} PaperProps={{
            style:{
                backgroundColor: "transparent"
            }
        }}>
            <div className={"rounded rounded-2xl bg-white dark:text-white dark:bg-gray-800 max-w-[80vw]"}>
                <div className={"flex p-6 flex-col md:flex-row items-center md:items-start"}>
                    <div className={""}>
                        <div className={"flex justify-center items-center w-10 h-10 sm:mr-4 rounded-full text-warn-600 bg-red-100 dark:bg-red-500"}><BsExclamationTriangle className={"w-6 h-6 text-red-500 dark:text-white"}/></div>
                    </div>
                    <div className={"text-center md:text-left mt-4 md:mt-0"}>
                        <h2 className={"font-medium text-lg"}>{title}</h2>
                        <p>{text}</p>
                    </div>
                </div>
                <div className={"flex gap-x-4 justify-end mt-4 bg-gray-100 dark:bg-gray-900/30 py-4 rounded-b-2xl "}>
                    <button onClick={handleClose} className={"dark:text-gray-300 bg-white dark:bg-gray-900/30 py-2 px-4 rounded rounded-3xl ring-1 ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}>Cancel</button>
                    <button onClick={handelSubmit} className={"py-2 px-4 bg-red-500 text-white rounded rounded-3xl hover:bg-red-600 mr-6 "}>Delete</button>
                </div>
            </div>
        </Dialog>
    )

}
