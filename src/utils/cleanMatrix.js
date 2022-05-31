function findLastIndex(array, predicate) {
    let index = array.length;
    while (index--) {
        if (predicate(array[index])) {
            return index;
        }
    }
    return -1;
}


export const cleanMatrix = (matrix) => {
    const newMatrix = [];

    // get the rows that have at least a 1 / get the minimum start y / get maximum end y

    const params = { rows: [], startJ: Infinity, endJ: -Infinity };

    // get start positions

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];


        const firstOne = row.findIndex(elem => elem !== 0);
        const lastOne = findLastIndex(row, elem => elem !== 0);

        if (firstOne !== -1) {
            params.rows.push(i);
        }
        if (params.startJ > firstOne && firstOne !== -1) {
            params.startJ = firstOne;
        }

        if (params.endJ < lastOne && lastOne !== -1) {
            params.endJ = lastOne;
        }
    }





    // extract the subMatrix



    for (let i = 0; i < matrix.length; i++) {
        if (params.rows.includes(i)) {
            newMatrix.push(matrix[i].slice(params.startJ, params.endJ + 1));
        }
    }

    return newMatrix;

}