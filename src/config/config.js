import moment from "moment/moment";
import {MdHorizontalRule} from "react-icons/md";
import {HiArrowDown, HiArrowUp} from "react-icons/hi";
import React from "react";

export const getPrio = (prio) => {
    switch (prio) {
        case "low":
            return <HiArrowDown className={"text-green-500"}/>
        case "normal":
            return <MdHorizontalRule/>
        case "high":
            return <HiArrowUp className={"text-red-500"}/>
        default:
            return "";
    }
}

export const getPrioColor = (prio) => {
    switch (prio) {
        case "low":
            return "bg-green-200 text-green-500"
        case "normal":
            return "bg-gray-100 dark:bg-gray-700"
        case "high":
            return "bg-red-300 text-red-500"
        default:
            return "";
    }
}

export const momentConfig = {
    lastDay: '[Yesterday at] HH:mm',
    sameDay: ' HH:mm',
    nextDay: '[Tomorrow at] HH:mm',
    lastWeek: '[last] dddd [at] HH:mm',
    nextWeek: 'dddd [at] HH:mm',
    sameElse: "MMM DDDo, YYYY",
}

export const _taskMomentConfig = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MMM Do, YYYY'
}

export function conf() {

}

export const taskMomentConfig = (date) => ({
    sameElse: (date) => {
        return moment().year() === moment(date).year() ? "MMM DD" : "MMM DD, YYYY"
    },
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
})

export const apiConfig = {
    url: "http://localhost:8000/api",
    // url: "http://backend.loc/api",
}

export const UNTITLED = "Untitled"
