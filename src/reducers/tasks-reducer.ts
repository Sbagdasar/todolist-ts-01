import {FilterValuesType, TasksStateType, ToDoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListAT = {
    type: "",
    id: string
}

type AddTodoListAT = {
    type: "",
    title: string
}
export type FirstACType = ReturnType<typeof firstAC>
export type SecondACType = ReturnType<typeof secondAC>
export type ActionType = FirstACType | SecondACType

export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch (action.type) {
        case "":
            return state
        case "":
            return state
        default:
            return state
    }

}

export const firstAC = (id: string) => (
    {
        type: "",
    } as const
)

export const secondAC = (title: string) => (
    {
        type: "",
    } as const
)