import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/forms/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = "all" | "active" | "completed"
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'active'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true}, // => t
            {id: v1(), title: "CSS", isDone: true}, // => {...t, isDone}
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "tea", isDone: false},
            {id: v1(), title: "beer", isDone: false},
        ]
    })

    //const todoListTitle = "What to learn"
    /*const [tasks, setTasks] = React.useState<Array<TaskType>>([ // #3345
        {id: v1(), title: "HTML", isDone: true}, // => t
        {id: v1(), title: "CSS", isDone: true}, // => {...t, isDone}
        {id: v1(), title: "JS/TS", isDone: false}, // => t
    ])*/
    //const [filter, setFilter] = React.useState<FilterValuesType>("all")

    const removeTask = (taskID: string, todoListID: string) => {
        //version1
        const copyTasks = {...tasks}
        copyTasks[todoListID] = copyTasks[todoListID].filter(task => task.id !== taskID)
        setTasks(copyTasks)
        //version2
        // --- setTasks({...tasks, [todoListID]:tasks[todoListID].filter(task=>  task.id !== taskID)})
        //
        /*setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks) // ассинхронность!!!*/
    }
    const addTask = (title: string, todoListID: string) => {
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, todoListID: string, isDone: boolean) => { //true
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (taskID: string, todoListID: string, title: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})

    }


    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))

    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1();
        const newTodoList: ToDoListType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoListID]: [], ...tasks})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType>;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(task => task.isDone)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }
        return (
            <Grid item>
                <Paper style={{padding: "20px"}} elevation={3}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{paddingTop: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoListComponents
                    }
                </Grid>
            </Container>


        </div>
    );
}

export default App;
