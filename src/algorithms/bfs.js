import { COLORS, DIRECTIONS } from "../config";
import { isEqual } from "lodash";

function getCopy(matrix) {
    let new_matrix = [...matrix];
    for (let i = 0; i < new_matrix.length; i++) {
        new_matrix[i] = [...matrix[i]]
    }
    return new_matrix
}

export default function bfsMatrix(matrix, start, end) {
    const ROWS = matrix.length
    const COLS = matrix[0].length

    const Q = []
    const PARENT = {}
    const SEEN = new Array(ROWS).fill().map(() => new Array(COLS).fill(COLORS.COLOR_INIT))
    const TRAVERSAL_ORDER = []

    // initialize
    Q.push([start[0], start[1]])
    SEEN[start[0]][start[1]] = COLORS.COLOR_START
    SEEN[end[0]][end[1]] = COLORS.COLOR_END
    TRAVERSAL_ORDER.push(getCopy(SEEN))
    PARENT[start] = null

    while (Q.length > 0) {
        let [cx, cy] = Q.shift();

        if (isEqual([cx, cy], end)) {
            TRAVERSAL_ORDER.push(getCopy(SEEN))
            console.log("breaking");
            break;
        }

        for (let i = 0; i < DIRECTIONS.length; i++) {
            let [nx, ny] = [cx + DIRECTIONS[i][0], cy + DIRECTIONS[i][1]]

            if (checkIsValidPoint(matrix, nx, ny) && (SEEN[nx][ny] === COLORS.COLOR_INIT || SEEN[nx][ny] === COLORS.COLOR_END)) {
                Q.push([nx, ny])
                SEEN[nx][ny] = (!isEqual([nx, ny], start) && !isEqual([nx, ny], end)) ? COLORS.COLOR_SEEN : SEEN[nx, ny];
                PARENT[[nx, ny]] = [cx, cy] // cx cy in two
            }
        }

        SEEN[cx][cy] = (!isEqual([cx, cy], start) && !isEqual([cx, cy], end)) ? COLORS.COLOR_EXPLORED : SEEN[cx][cy];
        TRAVERSAL_ORDER.push(getCopy(SEEN))
    }

    let response = {
        traversal_order: TRAVERSAL_ORDER,
        pp: createPath(PARENT, end, SEEN)
    }

    console.log(response)

    return response
}

function createPath(parent, end, seen) {
    p = []
    e = [...end]
    s = getCopy(seen)
    while (e) {
        s[e[0]][e[1]] = 'gold'
        p.push(s)
        e = parent[e]
    }
    return getCopy(p)
}

function checkIsValidPoint(matrix, cx, cy) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    return (cx >= 0 && cy >= 0 && cx < ROWS && cy < COLS);
}