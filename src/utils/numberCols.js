export default function getColumnsIndexes(matrix) {
    let num = 0; 
    for (let i = 0; i < matrix[0].length; i++) {
        const column = matrix.map((row) => row[i]);
        if (column.includes(1) || column.includes(11) || column.includes(22) || column.includes(2) || column.includes(3) || column.includes(33) || column.includes(4) || column.includes(44)) {
            num++;
        }
    }
    return num;
}

