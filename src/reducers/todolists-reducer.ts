import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST",
    title: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string

}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1();
            const newTodoList: ToDoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
            }
            return [newTodoList, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        default:
            return todoLists
    }

}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => (
    {
        type: "REMOVE-TODOLIST",
        id
    }
)

export const AddTodoListAC = (title: string): AddTodoListAT => (
    {
        type: "ADD-TODOLIST",
        title
    }
)
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => (
    {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    }
)

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT =>
    ({
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    })
