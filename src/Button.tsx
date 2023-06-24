import React, {memo} from "react";


export type ButtonPropsType = {
    title: string
    callback: () => void
    className?: string
}

const Button = memo((props: ButtonPropsType) => {

    console.log('Button')

    return (
        <button
            className={props.className}
            onClick={props.callback}>
            {props.title}</button>
    )
})

export default Button