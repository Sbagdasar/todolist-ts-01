import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/forms/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {AddBoxOutlined, HighlightOffOutlined,} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, todoListID: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, todoListID: string, title: string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {
    const useStyles = makeStyles(() => ({
        root: {
            '&:hover': {
                color: 'red'
            }
        }
    }));
    const classes = useStyles()
    //classes={{root: classes.root}}
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const changeTaskTitleHandler = (title: string) => {
                props.changeTaskTitle(task.id, props.id, title)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, props.id, e.currentTarget.checked)
            const removeTaskHandler = () => props.removeTask(task.id, props.id)


            return (

                <ListItem key={task.id} className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        onChange={changeTaskStatusHandler}
                        checked={task.isDone}

                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                    <IconButton>
                        <HighlightOffOutlined fontSize={'small'} onClick={removeTaskHandler}/>
                    </IconButton>
                    {/*<button onClick={() => props.removeTask(task.id, props.id)}>x</button>*/}
                </ListItem>
            )
        })
        : <span>TaskList is empty</span>

    // const onClickSetFilterAll = () => props.changeFilter("all")
    // const onClickSetFilterActive = () => props.changeFilter("active")
    // const onClickSetFilterCompleted = () => props.changeFilter("completed")

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.id)
    // const onClickSetFilterCreator = (filter: FilterValuesType) => {
    //     return () => props.changeFilter(filter)
    // }
    //

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTlT = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    return (
        <div>

            <Typography variant={"h5"}>
                <EditableSpan title={props.title} changeTitle={changeTlT}/>
                <IconButton>
                    <HighlightOffOutlined fontSize={'small'} onClick={removeTodoList} classes={{root: classes.root}}/>
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup variant={'contained'} size={'small'} disableElevation>
                    <Button
                        color={props.filter === "all" ? "primary" : "secondary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "primary" : "secondary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "primary" : "secondary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default TodoList;