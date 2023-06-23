import React from "react";


export type ButtonPropsType = {
    title: 'All' | 'Active' | 'Completed'
    onclick: () => void
    className: string
}

const Button = (props: ButtonPropsType) => {

    return (
        <button
            className={props.className}
            onClick={props.onclick}>
            {props.title}</button>
    )
}

export default Button