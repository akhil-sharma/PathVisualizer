import { useState } from "react";

export default Square = (props) => {
    const { id, color, clickHandler } = props;
    return (
        <button
            id={id}
            className="square"
            onClick={() => clickHandler(id)}
            style={{ backgroundColor: color }}
        />
    );
}