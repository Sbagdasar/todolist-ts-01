import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <Button name='+' collback={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    /*const removeTaskHandler = (id:string) => {
                        props.removeTask(id)
                    }*/
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name='X' collback={() => removeTaskHandler(t.id)}/>
                            {/*лишняя перерисовка из-за колбека чтобы не былоо нужно вынести в новую компоненту*/}
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button name='All' collback={()=>changeFilterHandler('all')}/>
            <Button name='Active' collback={()=>changeFilterHandler('active')}/>
            <Button name='Completed' collback={()=>changeFilterHandler('completed')}/>
            {/*<button onClick={() => {
                changeFilterHandler('all')
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilterHandler('active')
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilterHandler('completed')
            }}>
                Completed
            </button>
            */}
        </div>
    </div>
}
