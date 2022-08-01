import React from 'react';
type ButtonPropsType = {
    name: string,
    collback: ()=> void
}
export const Button:React.FC<ButtonPropsType> = (props) => {
    const onClickHandler = ()=>{
        props.collback()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

