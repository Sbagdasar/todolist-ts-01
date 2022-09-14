import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskACType | AddTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case "ADD-TASK":
            let newTask = {id: v1(), title:action.title, isDone: false}
            return {...state, [action.todolistID]:[newTask, ...state[action.todolistID]]}
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistID: string) => (
    {
        type: "ADD-TASK",
        title,
        todolistID
    } as const
)