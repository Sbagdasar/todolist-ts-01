import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBoxOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem:(title:string)=>void
}
export const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onKeyDownAddItem = (e: { key: string }) => e.key === "Enter" && onClickAddItem()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                // className={error ? "error" : ""}
                helperText={error && <div style={{color: "hotpink"}}>Title is required!</div>}
                error={error}
                label={'Title'}
            />
            <IconButton size={"small"}>
                <AddBoxOutlined onClick={onClickAddItem} fontSize={"large"}/>
            </IconButton>
            {/*<button onClick={onClickAddItem}>+</button>*/}
            {/*{error && <div style={{color: "hotpink"}}>Title is required!</div>}*/}
        </div>
    );
};

