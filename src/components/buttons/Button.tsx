import React from 'react';
type ButtonPropsType ={
    callback:()=>void
    title:string
}
export const Button:React.FC<ButtonPropsType> = (props) => {
    const onClickHandler=()=> {
        props.callback()
    }

    return (
        <button onClick={onClickHandler}>{props.title}</button>
    );
};
