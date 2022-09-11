import ReactDOM from "react-dom";
import { StrictMode } from "react";
import Board from "./Board";

const App = () => {
    return (
        <StrictMode>
            <Board />
        </StrictMode>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));