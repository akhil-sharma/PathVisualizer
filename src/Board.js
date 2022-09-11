import Square from './Square';
import { useState } from 'react';
import bfsMatrix from './algorithms/bfs'
import { COLORS } from './config';
import { cloneDeep, isEqual } from 'lodash';

const ROWS = 17
const COLS = 17

const EMPTY_MATRIX = new Array(ROWS).fill().map(() => new Array(COLS).fill(COLORS.COLOR_INIT))
const SEARCH_BUTTON_TEXT = {
    true: "SEARCHING...",
    false: "SEARCH"
}

let animate_list = []
let path_list = []

const Board = () => {
    const [squares, setSquares] = useState(cloneDeep(EMPTY_MATRIX));
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [searchState, setSearchState] = useState([false, "SEARCH"]);
    // TODO: Check if path and traversal order can used/modified directly.
    const [path, setPath] = useState([]);
    const [traversalOrder, setTraversalOrder] = useState([[]]);

    function resetState() {
        setStart(null);
        setEnd(null);
        setSquares(cloneDeep(EMPTY_MATRIX));
        setSearchState([false, "SEARCH"]);
    }

    const clickHandler = ([x, y]) => {
        // no modifications allowed while searching.
        if (searchState[0]) {
            return;
        }

        x = parseInt(x);
        y = parseInt(y);

        // toggle the seen status of a cell.
        let grid = [...squares];
        if (!start) {
            setStart([x, y]);
            grid[x][y] = COLORS.COLOR_START;

        } else if (!end) {
            if (isEqual([x, y], start)) {
                return;
            }
            setEnd([x, y]);
            grid[x][y] = COLORS.COLOR_END

        } else {
            //reset start
            grid[start[0]][start[1]] = COLORS.COLOR_INIT;
            setStart(null);

            //reset end
            grid[end[0]][end[1]] = COLORS.COLOR_INIT
            setEnd(null);

            //set the new start
            grid[x][y] = COLORS.COLOR_START
            setStart([x, y]);
        }
        setSquares(grid);
    }

    function beginSearch() {
        const newSearchState = [!searchState[0], SEARCH_BUTTON_TEXT[!searchState[0]]]
        // starting search
        if (newSearchState[0]) {
            if (!start || !end) {
                return;
            }
            setSearchState(newSearchState);
            let { traversal_order, pp } = bfsMatrix(squares, start, end);
            path_list = cloneDeep(pp);
            animate_list = traversal_order;
            animate();
        }
    }
    function animate() {
        animateMatrix().then(console.log("done!"))
    }

    function animateMatrix() {
        return new Promise((resolve, reject) => {
            if (animate_list.length > 0) {
                setSquares(animate_list.shift());
                requestAnimationFrame(() => animateMatrix());
            } else if (path_list.length > 0) {
                setSquares(path_list.shift());
                requestAnimationFrame(() => animateMatrix());
            } else {
                resolve();
            }
        })
    };

    return (
        <div className='boardContainer'>
            <div className='state'>
                <span>START: {start ? `[${start[0]}, ${start[1]}]` : "Select starting point."}</span><br />
                <span>END: {end ? `[${end[0]}, ${end[1]}]` : "Select final point."}</span><br />
                <button onClick={beginSearch}>{searchState[1]}</button><br />
                <button onClick={resetState}>Reset</button><br />
            </div>
            <div className="board">
                {
                    squares.map((rows, rowIdx) =>
                        rows.map((col, colIdx) =>
                        (<Square
                            key={[rowIdx, colIdx]}
                            id={[rowIdx, colIdx]}
                            color={col}
                            clickHandler={clickHandler}
                        />)
                        )
                    )
                }
            </div>
        </div>

    );
}

export default Board;